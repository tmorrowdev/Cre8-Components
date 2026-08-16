/**
 * A fortnight of plausible entries, so a fresh install can show the analytics
 * and the rules doing something instead of four empty screens.
 *
 * Deterministic by design — a seeded generator rather than `Math.random` — so a
 * screenshot, a test assertion, and a bug report all describe the same data.
 * Its shape is not neutral: it deliberately skips two days and eats later on
 * weekends, because a sample that trips no rules would demo an Insights tab
 * with nothing on it.
 */

import { recentDays } from './analytics.js';
import { makeEntry } from './store.js';

const BREAKFASTS = ['oats', 'greek-yogurt', 'eggs', 'banana', 'bagel'];
const LUNCHES = ['chicken-breast', 'burrito', 'lentils', 'tuna-canned', 'quinoa'];
const DINNERS = ['salmon', 'pizza-cheese', 'ground-beef-90', 'tofu-firm', 'pasta-wheat'];
const SIDES = ['broccoli', 'rice-brown', 'sweet-potato', 'spinach', 'avocado'];
const SNACKS = ['almonds', 'protein-bar', 'apple', 'ice-cream', 'chips'];

export function sampleFortnight(today = new Date()) {
  let seed = 20260816;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const pick = (ids) => ids[Math.floor(rand() * ids.length)];

  const out = [];
  recentDays(14, today).forEach((day, index) => {
    // Two missed days, so the consistency rule has something real to find.
    if (index === 3 || index === 9) return;
    const weekend = [0, 6].includes(new Date(`${day}T12:00:00`).getDay());
    const add = (foodId, grams, meal, hour) =>
      out.push(makeEntry({ foodId, grams: Math.round(grams), meal, day, hour }));

    if (index % 3 !== 0) add(pick(BREAKFASTS), 90 + rand() * 150, 'Breakfast', 8);
    add(pick(LUNCHES), 190 + rand() * 190, 'Lunch', 13);
    add(pick(SIDES), 140 + rand() * 130, 'Lunch', 13);
    add(pick(DINNERS), 210 + rand() * 210, 'Dinner', weekend ? 21 : 19);
    add(pick(SIDES), 160 + rand() * 140, 'Dinner', weekend ? 21 : 19);
    add(pick(SNACKS), 45 + rand() * 75, 'Snack', weekend ? 22 : 16);
    if (weekend) add(pick(SNACKS), 60 + rand() * 90, 'Snack', 22);
  });
  return out;
}
