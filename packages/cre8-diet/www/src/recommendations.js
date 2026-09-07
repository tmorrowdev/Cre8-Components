/**
 * The recommendation engine.
 *
 * Deterministic rules over the summary from analytics.js — no model, no
 * network. That is a feature rather than a limitation here: every card the user
 * sees can state the number that triggered it, which is what makes advice about
 * their own eating checkable instead of oracular. It also keeps the app
 * shippable without a privacy disclosure or a server bill.
 *
 * Each rule returns `null` when it has nothing to say. Rules must stay silent
 * on thin data: `MIN_DAYS` guards the whole set, because a confident claim
 * drawn from two logged days teaches the user to ignore the tab.
 */

import { FOODS, getFood } from './foods.js';

/** Below this many logged days in the window, the engine only asks for more data. */
const MIN_DAYS = 3;

const SEVERITY_ORDER = { high: 0, medium: 1, low: 2, positive: 3 };

/** Highest-density sources of a nutrient, as concrete suggestions. */
function bestSourcesOf(nutrient, count = 3, exclude = []) {
  return FOODS.filter((f) => !exclude.includes(f.id) && f[nutrient] > 0)
    // Per-calorie rather than per-100g: olive oil is not a protein source just
    // because a rule asked for density.
    .sort((a, b) => b[nutrient] / b.kcal - a[nutrient] / a.kcal)
    .slice(0, count)
    .map((f) => f.name);
}

const round = (n) => Math.round(n);
const pct = (n) => `${Math.round(n * 100)}%`;

/**
 * Every rule is `(summary) => Recommendation | null`.
 *
 * @typedef {{
 *   id: string, severity: 'high'|'medium'|'low'|'positive',
 *   title: string, detail: string, evidence: string, suggestions?: string[]
 * }} Recommendation
 */
export const RULES = [
  function proteinGap(s) {
    const gap = s.targets.protein - s.avg.protein;
    if (gap < s.targets.protein * 0.1) return null;
    return {
      id: 'protein-gap',
      severity: gap > s.targets.protein * 0.25 ? 'high' : 'medium',
      title: 'Protein is running below target',
      detail:
        `You are averaging ${round(gap)}g under. Protein is the macro most likely to ` +
        'protect lean mass while calories are restricted, and the one people undershoot first.',
      evidence: `${round(s.avg.protein)}g/day average vs a ${s.targets.protein}g target`,
      suggestions: bestSourcesOf('protein'),
    };
  },

  function calorieTrend(s) {
    const delta = s.avg.kcal - s.goals.kcal;
    if (Math.abs(delta) < s.goals.kcal * 0.08) return null;
    const over = delta > 0;
    // ~7,700 kcal per kg of body mass is the standard planning figure. It is a
    // projection of the current average, not a prediction about the user.
    const kgPerWeek = (delta * 7) / 7700;
    const wanted =
      (over && s.goals.weightGoal === 'gain') || (!over && s.goals.weightGoal === 'lose');
    return {
      id: 'calorie-trend',
      severity: wanted ? 'positive' : Math.abs(delta) > s.goals.kcal * 0.2 ? 'high' : 'medium',
      title: over ? 'Running above your calorie target' : 'Running below your calorie target',
      detail:
        `Held at this average, that is about ${Math.abs(kgPerWeek).toFixed(2)} kg ` +
        `${over ? 'gained' : 'lost'} per week. Your stated goal is to ${s.goals.weightGoal} weight` +
        `${wanted ? ', so this is pointed the right way.' : ', which this works against.'}`,
      evidence: `${round(s.avg.kcal)} kcal/day average vs a ${s.goals.kcal} target`,
    };
  },

  function fiberLow(s) {
    if (s.avg.fiber >= s.goals.fiber * 0.8) return null;
    return {
      id: 'fiber-low',
      severity: s.avg.fiber < s.goals.fiber * 0.5 ? 'medium' : 'low',
      title: 'Fiber is low',
      detail:
        'Fiber is the intake most consistently associated with satiety at a given calorie ' +
        'level, so a shortfall here tends to show up later as hunger rather than as a number.',
      evidence: `${round(s.avg.fiber)}g/day average vs a ${s.goals.fiber}g target`,
      suggestions: bestSourcesOf('fiber'),
    };
  },

  function sugarHigh(s) {
    if (s.avg.sugar <= s.goals.sugar) return null;
    return {
      id: 'sugar-high',
      severity: s.avg.sugar > s.goals.sugar * 1.5 ? 'medium' : 'low',
      title: 'Sugar is above your limit',
      detail:
        'Worth separating whole-food sugar from added sugar before acting — fruit and ' +
        'yogurt land in this number alongside dessert.',
      evidence: `${round(s.avg.sugar)}g/day average vs a ${s.goals.sugar}g limit`,
    };
  },

  function sodiumHigh(s) {
    if (s.avg.sodium <= s.goals.sodium) return null;
    return {
      id: 'sodium-high',
      severity: s.avg.sodium > s.goals.sodium * 1.4 ? 'medium' : 'low',
      title: 'Sodium is above your limit',
      detail: 'Packaged and restaurant items carry most of this; cooked-from-raw days rarely do.',
      evidence: `${round(s.avg.sodium)}mg/day average vs a ${s.goals.sodium}mg limit`,
    };
  },

  function lateEating(s) {
    if (s.lateShare < 0.3) return null;
    return {
      id: 'late-eating',
      severity: s.lateShare > 0.45 ? 'medium' : 'low',
      title: 'A large share of intake lands late',
      detail:
        `${pct(s.lateShare)} of your calories are logged at 8pm or later. Total intake still ` +
        'drives weight, but a back-loaded day is a common reason mornings feel unhungry, ' +
        'which then pushes the next day later still.',
      evidence: `${pct(s.lateShare)} of calories after 8pm over ${s.loggedDays} logged days`,
    };
  },

  function breakfastSkipping(s) {
    const share = s.breakfastDays / s.loggedDays;
    if (share > 0.5) return null;
    return {
      id: 'breakfast-skipping',
      severity: 'low',
      title: 'Breakfast is usually missing',
      detail:
        'Not a problem on its own — skipping is a valid way to spend calories elsewhere. ' +
        'It is worth a look only because it often travels with the late-eating pattern.',
      evidence: `breakfast logged on ${s.breakfastDays} of ${s.loggedDays} days`,
    };
  },

  function weekendDrift(s) {
    if (!s.weekdayKcal || !s.weekendKcal) return null;
    const drift = (s.weekendKcal - s.weekdayKcal) / s.weekdayKcal;
    if (drift < 0.15) return null;
    return {
      id: 'weekend-drift',
      severity: drift > 0.3 ? 'medium' : 'low',
      title: 'Weekends run well above weekdays',
      detail:
        `Weekend days average ${pct(drift)} more than weekdays. Two such days can cancel ` +
        'five disciplined ones, which is why a week can average high while no single day felt off.',
      evidence: `${round(s.weekendKcal)} kcal weekend vs ${round(s.weekdayKcal)} kcal weekday`,
    };
  },

  function macroSkew(s) {
    const fatKcal = s.avg.fat * 9;
    if (!s.avg.kcal) return null;
    const share = fatKcal / s.avg.kcal;
    const target = s.goals.fatPct / 100;
    if (share <= target + 0.1) return null;
    return {
      id: 'macro-skew',
      severity: 'low',
      title: 'Fat is crowding out the other macros',
      detail:
        'Not harmful in itself, but fat is the densest macro, so a skew here is the usual ' +
        'mechanism behind hitting a calorie ceiling before feeling full.',
      evidence: `${pct(share)} of calories from fat vs a ${s.goals.fatPct}% target`,
    };
  },

  function topContributor(s) {
    const top = s.topContributors[0];
    if (!top) return null;
    const totalKcal = s.avg.kcal * s.loggedDays;
    const share = totalKcal ? top.kcal / totalKcal : 0;
    if (share < 0.15) return null;
    return {
      id: 'top-contributor',
      severity: 'low',
      title: `${top.food.name} is a large share of your intake`,
      detail:
        'Single items above roughly a sixth of total calories are the highest-leverage place ' +
        'to change a number, because one substitution moves the whole average.',
      evidence: `${pct(share)} of logged calories across ${top.count} entries`,
    };
  },

  function consistency(s) {
    const share = s.loggedDays / s.window;
    if (share >= 0.7) return null;
    return {
      id: 'consistency',
      severity: 'medium',
      title: 'Gaps in the log are limiting what this can tell you',
      detail:
        'Averages here cover logged days only, so missed days do not drag them down — they ' +
        'just make every number on this screen less representative than it looks.',
      evidence: `${s.loggedDays} of the last ${s.window} days logged`,
    };
  },

  function onTrack(s) {
    if (s.onTargetDays < s.loggedDays * 0.6 || s.loggedDays < 5) return null;
    return {
      id: 'on-track',
      severity: 'positive',
      title: 'Calorie targets are holding',
      detail: 'Most logged days landed within 10% of goal, which is the hard part.',
      evidence: `${s.onTargetDays} of ${s.loggedDays} logged days within 10% of ${s.goals.kcal} kcal`,
    };
  },

  function streak(s) {
    if (s.streak < 5) return null;
    return {
      id: 'streak',
      severity: 'positive',
      title: `${s.streak}-day logging streak`,
      detail: 'Consistency in the log is what makes everything else on this screen mean something.',
      evidence: `${s.streak} consecutive days with at least one entry`,
    };
  },
];

/**
 * Run every rule, most urgent first.
 *
 * Under `MIN_DAYS` the engine deliberately returns a single "keep logging" card
 * instead of its usual output — the rules would all fire or all stay quiet on
 * noise, and either is worse than saying nothing.
 */
export function recommend(summary) {
  if (summary.loggedDays < MIN_DAYS) {
    return [
      {
        id: 'need-data',
        severity: 'low',
        title: 'Not enough logged days yet',
        detail:
          `Recommendations start after ${MIN_DAYS} logged days. Until then any pattern here ` +
          'would be noise dressed up as a finding.',
        evidence: `${summary.loggedDays} of ${MIN_DAYS} days logged`,
      },
    ];
  }
  return RULES.map((rule) => rule(summary))
    .filter(Boolean)
    .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
}

/** Map a severity onto the statuses cre8-inline-alert actually accepts. */
export function alertStatus(severity) {
  return { high: 'warning', medium: 'attention', low: 'info', positive: 'success' }[severity] ?? 'info';
}

export { MIN_DAYS, bestSourcesOf, getFood };
