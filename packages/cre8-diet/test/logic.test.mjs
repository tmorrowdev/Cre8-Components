/**
 * Tests for the parts that compute rather than render.
 *
 *   node test/logic.test.mjs
 *
 * The nutrition maths, the day-boundary handling, and the rule thresholds are
 * where a wrong answer is invisible — a chart still draws, a card still
 * appears, and the number on it is simply false. The DOM layer is checked by
 * looking at it; this is checked here.
 */

import { averageOf, dailySeries, lateShare, recentDays, summarize, totals } from '../www/src/analytics.js';
import { getFood, nutritionFor, searchFoods } from '../www/src/foods.js';
import { DEFAULT_GOALS, dayKey, macroTargets, makeEntry } from '../www/src/store.js';
import { MIN_DAYS, recommend } from '../www/src/recommendations.js';
import { sampleFortnight } from '../www/src/sample-data.js';

let passed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ok  ${name}`);
  } catch (error) {
    failures.push({ name, error });
    console.log(`  FAIL  ${name}\n        ${error.message}`);
  }
}

function assert(cond, message) {
  if (!cond) throw new Error(message ?? 'assertion failed');
}

function assertClose(actual, expected, tolerance, message) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`${message ?? 'not close'}: got ${actual}, expected ~${expected}`);
  }
}

const has = (recs, id) => recs.some((r) => r.id === id);

/* Nutrition ---------------------------------------------------------------- */

test('nutrition scales linearly from the per-100g table', () => {
  const chicken = getFood('chicken-breast');
  const n = nutritionFor('chicken-breast', 200);
  assertClose(n.kcal, chicken.kcal * 2, 0.001, 'kcal');
  assertClose(n.protein, chicken.protein * 2, 0.001, 'protein');
});

test('an unknown food contributes zero rather than throwing', () => {
  // A log entry can outlive an edit to the food table. Losing one row beats
  // the day's totals failing to compute at all.
  const n = nutritionFor('food-that-was-deleted', 100);
  assert(n.kcal === 0 && n.protein === 0);
});

test('search ranks a name prefix above a mid-name match', () => {
  const names = searchFoods('chi').map((f) => f.id);
  assert(names.includes('chicken-breast'), 'chicken should match "chi"');
  assert(
    names.indexOf('chicken-breast') < names.indexOf('chickpeas') || !names.includes('chickpeas'),
    'prefix match should outrank later ones'
  );
});

test('search on an empty query returns nothing rather than everything', () => {
  assert(searchFoods('   ').length === 0);
});

/* Days and totals ---------------------------------------------------------- */

test('dayKey uses local time, not UTC', () => {
  // 11pm on the 15th is the 15th, whatever the offset. toISOString would
  // report the 16th anywhere west of Greenwich.
  const late = new Date(2026, 7, 15, 23, 30);
  assert(dayKey(late) === '2026-08-15', `got ${dayKey(late)}`);
});

test('recentDays ends today and runs oldest first', () => {
  const days = recentDays(3, new Date(2026, 7, 16));
  assert(JSON.stringify(days) === JSON.stringify(['2026-08-14', '2026-08-15', '2026-08-16']));
});

test('totals sum every entry', () => {
  const entries = [
    makeEntry({ foodId: 'eggs', grams: 100, meal: 'Breakfast' }),
    makeEntry({ foodId: 'oats', grams: 100, meal: 'Breakfast' }),
  ];
  const t = totals(entries);
  assertClose(t.kcal, getFood('eggs').kcal + getFood('oats').kcal, 0.001);
});

test('an unlogged day is not a zero-calorie day', () => {
  const today = new Date(2026, 7, 16);
  const entries = [makeEntry({ foodId: 'oats', grams: 100, meal: 'Breakfast', day: '2026-08-16' })];
  const series = dailySeries(entries, recentDays(3, today));
  assert(series.filter((d) => d.logged).length === 1, 'only one day logged');
  // The average must be over logged days only — otherwise every gap in the log
  // reads as adherence.
  assertClose(averageOf(series, 'kcal'), getFood('oats').kcal, 0.001, 'average');
});

test('lateShare measures calories, not entry count', () => {
  const entries = [
    // One big early meal and one small late one: counting entries would say
    // 50% late, calories say much less.
    makeEntry({ foodId: 'pizza-cheese', grams: 400, meal: 'Dinner', day: '2026-08-16', hour: 18 }),
    makeEntry({ foodId: 'apple', grams: 100, meal: 'Snack', day: '2026-08-16', hour: 22 }),
  ];
  const series = dailySeries(entries, ['2026-08-16']);
  assert(lateShare(series) < 0.15, `got ${lateShare(series)}`);
});

/* Goals -------------------------------------------------------------------- */

test('macro targets follow 4/4/9 kcal per gram', () => {
  const t = macroTargets({ ...DEFAULT_GOALS, kcal: 2000, proteinPct: 30, carbsPct: 40, fatPct: 30 });
  assert(t.protein === 150, `protein ${t.protein}`);
  assert(t.carbs === 200, `carbs ${t.carbs}`);
  assert(t.fat === 67, `fat ${t.fat}`);
});

/* Rules -------------------------------------------------------------------- */

test('thin data produces one honest card, not a full reading', () => {
  const entries = [makeEntry({ foodId: 'oats', grams: 100, meal: 'Breakfast' })];
  const recs = recommend(summarize(entries, DEFAULT_GOALS));
  assert(recs.length === 1 && recs[0].id === 'need-data', JSON.stringify(recs.map((r) => r.id)));
});

test('a protein shortfall is found and named', () => {
  const today = new Date();
  const entries = [];
  // MIN_DAYS of almost pure carbohydrate.
  for (let i = 0; i < MIN_DAYS + 1; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    entries.push(makeEntry({ foodId: 'rice-white', grams: 900, meal: 'Lunch', day: dayKey(d), hour: 13 }));
  }
  const recs = recommend(summarize(entries, DEFAULT_GOALS));
  assert(has(recs, 'protein-gap'), JSON.stringify(recs.map((r) => r.id)));
  const rec = recs.find((r) => r.id === 'protein-gap');
  assert(rec.suggestions?.length > 0, 'a shortfall should come with somewhere to get it');
  assert(/\d/.test(rec.evidence), 'every card must carry the number that triggered it');
});

test('hitting the calorie goal is reported as progress, not as a problem', () => {
  const today = new Date();
  const entries = [];
  for (let i = 0; i < 8; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const day = dayKey(d);
    // ~2200 kcal split across foods that also satisfy the macro rules.
    entries.push(makeEntry({ foodId: 'chicken-breast', grams: 400, meal: 'Lunch', day, hour: 13 }));
    entries.push(makeEntry({ foodId: 'rice-brown', grams: 600, meal: 'Lunch', day, hour: 13 }));
    entries.push(makeEntry({ foodId: 'broccoli', grams: 400, meal: 'Dinner', day, hour: 19 }));
    entries.push(makeEntry({ foodId: 'lentils', grams: 500, meal: 'Dinner', day, hour: 19 }));
  }
  const recs = recommend(summarize(entries, DEFAULT_GOALS));
  assert(!has(recs, 'calorie-trend'), 'on-target calories should not raise a trend card');
  assert(has(recs, 'on-track') || has(recs, 'streak'), JSON.stringify(recs.map((r) => r.id)));
});

test('a surplus is framed by the stated weight goal, not judged on its own', () => {
  const today = new Date();
  const entries = [];
  for (let i = 0; i < 6; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    // ~2950 kcal/day against a 2200 target — a surplus big enough to be a
    // trend rather than a rounding error.
    entries.push(makeEntry({ foodId: 'pizza-cheese', grams: 800, meal: 'Dinner', day: dayKey(d), hour: 19 }));
    entries.push(makeEntry({ foodId: 'chicken-breast', grams: 500, meal: 'Lunch', day: dayKey(d), hour: 13 }));
  }
  const gaining = recommend(summarize(entries, { ...DEFAULT_GOALS, weightGoal: 'gain' }));
  const losing = recommend(summarize(entries, { ...DEFAULT_GOALS, weightGoal: 'lose' }));
  const g = gaining.find((r) => r.id === 'calorie-trend');
  const l = losing.find((r) => r.id === 'calorie-trend');
  assert(g && l, 'both should raise the trend card');
  assert(g.severity === 'positive', `gaining should read as positive, got ${g.severity}`);
  assert(l.severity !== 'positive', `losing should not, got ${l.severity}`);
});

test('every rule that fires cites evidence', () => {
  const recs = recommend(summarize(sampleFortnight(), DEFAULT_GOALS));
  assert(recs.length > 1, 'the sample data should trip several rules');
  for (const r of recs) {
    assert(r.evidence && /\d/.test(r.evidence), `${r.id} has no numeric evidence`);
    assert(r.title && r.detail, `${r.id} is missing text`);
  }
});

test('the sample fortnight skips days on purpose, so consistency has work to do', () => {
  const s = summarize(sampleFortnight(), DEFAULT_GOALS);
  assert(s.loggedDays === 12, `expected 12 logged days, got ${s.loggedDays}`);
  assert(s.window === 14);
});

test('recommendations come back most urgent first', () => {
  const order = { high: 0, medium: 1, low: 2, positive: 3 };
  const recs = recommend(summarize(sampleFortnight(), DEFAULT_GOALS));
  for (let i = 1; i < recs.length; i++) {
    assert(
      order[recs[i - 1].severity] <= order[recs[i].severity],
      `${recs[i - 1].id} (${recs[i - 1].severity}) before ${recs[i].id} (${recs[i].severity})`
    );
  }
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
