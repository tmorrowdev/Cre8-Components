/**
 * State and persistence.
 *
 * Everything lives on the device. There is no account and no server, which is
 * a deliberate choice for a food log: it removes the privacy surface entirely, and
 * it is the difference between an App Store submission that needs a privacy
 * policy plus a data-collection disclosure and one that declares "no data
 * collected".
 */

const KEY = 'cre8-diet/v1';

export const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

/**
 * Defaults sized for a moderately active adult. Every one is editable on the
 * Goals tab — they exist so a first-run app can draw a complete dashboard
 * rather than a wall of zeroes and setup prompts.
 */
export const DEFAULT_GOALS = {
  kcal: 2200,
  proteinPct: 30,
  carbsPct: 40,
  fatPct: 30,
  fiber: 30,
  sodium: 2300,
  sugar: 50,
  weightGoal: 'maintain', // 'lose' | 'maintain' | 'gain'
};

/** Grams of each macro implied by a calorie target and a percentage split. */
export function macroTargets(goals) {
  return {
    protein: Math.round((goals.kcal * (goals.proteinPct / 100)) / 4),
    carbs: Math.round((goals.kcal * (goals.carbsPct / 100)) / 4),
    fat: Math.round((goals.kcal * (goals.fatPct / 100)) / 9),
  };
}

/** Local calendar date as YYYY-MM-DD. Never use toISOString here — it is UTC,
 *  and a 9pm entry in a western timezone would land on tomorrow. */
export function dayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function emptyState() {
  return { goals: { ...DEFAULT_GOALS }, entries: [] };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw);
    return {
      // Spread over the defaults so a goal added in a later version is present
      // on a store written by an earlier one.
      goals: { ...DEFAULT_GOALS, ...(parsed.goals ?? {}) },
      entries: Array.isArray(parsed.entries) ? parsed.entries : [],
    };
  } catch {
    // A corrupt store must not brick the app. Starting fresh loses the log;
    // refusing to boot loses the log *and* the app.
    return emptyState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    // Quota, or Safari private browsing, where setItem throws.
    return false;
  }
}

let counter = 0;
function entryId() {
  return `e${Date.now().toString(36)}${(counter++).toString(36)}`;
}

/**
 * @param {{foodId: string, grams: number, meal: string, day?: string, hour?: number}} input
 */
export function makeEntry(input) {
  const now = new Date();
  return {
    id: entryId(),
    foodId: input.foodId,
    grams: Math.max(0, Number(input.grams) || 0),
    meal: MEALS.includes(input.meal) ? input.meal : 'Snack',
    day: input.day ?? dayKey(now),
    // Kept separately from `day` because the late-eating rule needs the clock
    // and nothing else does.
    hour: input.hour ?? now.getHours(),
  };
}
