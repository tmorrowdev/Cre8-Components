/**
 * Aggregations over the log.
 *
 * Pure functions of (entries, goals) — no DOM, no storage. That is what lets
 * test/logic.test.mjs check the numbers without a browser, and it is why the
 * recommendation rules can be written against a summary object instead of
 * re-walking the log each time.
 */

import { NUTRIENTS, getFood, nutritionFor } from './foods.js';
import { dayKey, macroTargets } from './store.js';

function zeroTotals() {
  const out = {};
  for (const key of NUTRIENTS) out[key] = 0;
  return out;
}

function addInto(target, source) {
  for (const key of NUTRIENTS) target[key] += source[key];
  return target;
}

/** Totals for one array of entries. */
export function totals(entries) {
  return entries.reduce((acc, e) => addInto(acc, nutritionFor(e.foodId, e.grams)), zeroTotals());
}

/** The last `n` calendar days ending today, oldest first. */
export function recentDays(n, today = new Date()) {
  const days = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(dayKey(d));
  }
  return days;
}

export function entriesByDay(entries) {
  const map = new Map();
  for (const e of entries) {
    if (!map.has(e.day)) map.set(e.day, []);
    map.get(e.day).push(e);
  }
  return map;
}

/**
 * Per-day totals across a window.
 *
 * Days with no entries are included with zero totals and `logged: false`. The
 * distinction matters: an unlogged day is not a zero-calorie day, and averaging
 * it in would make every gap look like adherence.
 */
export function dailySeries(entries, days) {
  const byDay = entriesByDay(entries);
  return days.map((day) => {
    const dayEntries = byDay.get(day) ?? [];
    return { day, logged: dayEntries.length > 0, entries: dayEntries, ...totals(dayEntries) };
  });
}

/** Mean of a nutrient over logged days only. Returns 0 when nothing is logged. */
export function averageOf(series, key) {
  const logged = series.filter((d) => d.logged);
  if (!logged.length) return 0;
  return logged.reduce((sum, d) => sum + d[key], 0) / logged.length;
}

/** Consecutive logged days ending today (or yesterday, if today is still empty). */
export function loggingStreak(entries, today = new Date()) {
  const byDay = entriesByDay(entries);
  let streak = 0;
  const cursor = new Date(today);
  // A day that has not happened yet should not break a streak, so an empty
  // today is skipped rather than counted as a miss.
  if (!byDay.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (byDay.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Share of calories eaten at or after `hour`, across the window. */
export function lateShare(series, hour = 20) {
  let late = 0;
  let all = 0;
  for (const day of series) {
    for (const e of day.entries) {
      const kcal = nutritionFor(e.foodId, e.grams).kcal;
      all += kcal;
      if (e.hour >= hour) late += kcal;
    }
  }
  return all > 0 ? late / all : 0;
}

/** Calories by meal across the window, for the meal-distribution chart. */
export function byMeal(series) {
  const out = new Map();
  for (const day of series) {
    for (const e of day.entries) {
      out.set(e.meal, (out.get(e.meal) ?? 0) + nutritionFor(e.foodId, e.grams).kcal);
    }
  }
  return out;
}

/** The foods contributing the most calories, ranked. */
export function topContributors(series, limit = 5) {
  const out = new Map();
  for (const day of series) {
    for (const e of day.entries) {
      const kcal = nutritionFor(e.foodId, e.grams).kcal;
      const prev = out.get(e.foodId) ?? { kcal: 0, count: 0 };
      out.set(e.foodId, { kcal: prev.kcal + kcal, count: prev.count + 1 });
    }
  }
  return [...out.entries()]
    .map(([foodId, v]) => ({ food: getFood(foodId), ...v }))
    .filter((r) => r.food)
    .sort((a, b) => b.kcal - a.kcal)
    .slice(0, limit);
}

/**
 * Everything the Insights tab reasons about, computed once.
 *
 * `window` is the number of days looked at; `loggedDays` is how many of them
 * actually have entries, and every average below is over those. A summary built
 * from two logged days is not wrong, but it is thin — `loggedDays` is what the
 * rules use to decide whether to speak at all.
 */
export function summarize(entries, goals, windowDays = 14, today = new Date()) {
  const days = recentDays(windowDays, today);
  const series = dailySeries(entries, days);
  const logged = series.filter((d) => d.logged);
  const targets = macroTargets(goals);

  const avg = {};
  for (const key of NUTRIENTS) avg[key] = averageOf(series, key);

  const weekday = logged.filter((d) => ![0, 6].includes(new Date(`${d.day}T12:00:00`).getDay()));
  const weekend = logged.filter((d) => [0, 6].includes(new Date(`${d.day}T12:00:00`).getDay()));
  const mean = (arr) => (arr.length ? arr.reduce((s, d) => s + d.kcal, 0) / arr.length : 0);

  return {
    window: windowDays,
    days,
    series,
    loggedDays: logged.length,
    avg,
    targets,
    goals,
    streak: loggingStreak(entries, today),
    lateShare: lateShare(series),
    weekdayKcal: mean(weekday),
    weekendKcal: mean(weekend),
    // Days within 10% of the calorie goal. Tighter than that and normal
    // variation reads as failure; looser and the number stops meaning anything.
    onTargetDays: logged.filter((d) => Math.abs(d.kcal - goals.kcal) <= goals.kcal * 0.1).length,
    breakfastDays: logged.filter((d) => d.entries.some((e) => e.meal === 'Breakfast')).length,
    topContributors: topContributors(series),
  };
}
