/**
 * The built-in food table.
 *
 * Everything is per 100 g so the log can store one number — grams — and derive
 * the rest. `serving` is the portion a person actually thinks in ("1 medium",
 * "1 cup"), which is what the log form offers; grams stay underneath.
 *
 * Values are rounded reference figures for common preparations, close enough to
 * steer a decision and not precise enough to argue with. `sodium` is mg; every
 * other figure is grams except `kcal`.
 */

export const FOODS = [
  // Protein
  { id: 'chicken-breast', name: 'Chicken breast, cooked', group: 'Protein', kcal: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0, sodium: 74, serving: { label: '1 breast', grams: 120 } },
  { id: 'salmon', name: 'Salmon, cooked', group: 'Protein', kcal: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, sugar: 0, sodium: 61, serving: { label: '1 fillet', grams: 140 } },
  { id: 'tuna-canned', name: 'Tuna, canned in water', group: 'Protein', kcal: 116, protein: 26, carbs: 0, fat: 0.8, fiber: 0, sugar: 0, sodium: 247, serving: { label: '1 can', grams: 142 } },
  { id: 'ground-beef-90', name: 'Ground beef, 90% lean', group: 'Protein', kcal: 176, protein: 20, carbs: 0, fat: 10, fiber: 0, sugar: 0, sodium: 66, serving: { label: '1 patty', grams: 113 } },
  { id: 'eggs', name: 'Egg, whole', group: 'Protein', kcal: 143, protein: 13, carbs: 0.7, fat: 9.5, fiber: 0, sugar: 0.4, sodium: 142, serving: { label: '1 large', grams: 50 } },
  { id: 'egg-whites', name: 'Egg whites', group: 'Protein', kcal: 52, protein: 11, carbs: 0.7, fat: 0.2, fiber: 0, sugar: 0.7, sodium: 166, serving: { label: '1 cup', grams: 243 } },
  { id: 'tofu-firm', name: 'Tofu, firm', group: 'Protein', kcal: 144, protein: 17, carbs: 2.8, fat: 8.7, fiber: 2.3, sugar: 0.6, sodium: 14, serving: { label: '1/2 block', grams: 126 } },
  { id: 'tempeh', name: 'Tempeh', group: 'Protein', kcal: 192, protein: 20, carbs: 7.6, fat: 11, fiber: 0, sugar: 0, sodium: 9, serving: { label: '1 serving', grams: 84 } },
  { id: 'shrimp', name: 'Shrimp, cooked', group: 'Protein', kcal: 99, protein: 24, carbs: 0.2, fat: 0.3, fiber: 0, sugar: 0, sodium: 111, serving: { label: '1 cup', grams: 145 } },
  { id: 'turkey-breast', name: 'Turkey breast, roasted', group: 'Protein', kcal: 135, protein: 30, carbs: 0, fat: 1, fiber: 0, sugar: 0, sodium: 1015, serving: { label: '3 slices', grams: 84 } },

  // Dairy
  { id: 'greek-yogurt', name: 'Greek yogurt, plain nonfat', group: 'Dairy', kcal: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0, sugar: 3.2, sodium: 36, serving: { label: '1 cup', grams: 245 } },
  { id: 'cottage-cheese', name: 'Cottage cheese, 2%', group: 'Dairy', kcal: 84, protein: 11, carbs: 4.3, fat: 2.3, fiber: 0, sugar: 4.1, sodium: 321, serving: { label: '1 cup', grams: 226 } },
  { id: 'milk-2', name: 'Milk, 2%', group: 'Dairy', kcal: 50, protein: 3.3, carbs: 4.8, fat: 2, fiber: 0, sugar: 5, sodium: 47, serving: { label: '1 cup', grams: 244 } },
  { id: 'cheddar', name: 'Cheddar cheese', group: 'Dairy', kcal: 403, protein: 25, carbs: 1.3, fat: 33, fiber: 0, sugar: 0.5, sodium: 621, serving: { label: '1 slice', grams: 28 } },
  { id: 'mozzarella', name: 'Mozzarella, part skim', group: 'Dairy', kcal: 254, protein: 24, carbs: 2.8, fat: 16, fiber: 0, sugar: 1.2, sodium: 619, serving: { label: '1 oz', grams: 28 } },

  // Grains & starch
  { id: 'oats', name: 'Oats, dry', group: 'Grains', kcal: 389, protein: 17, carbs: 66, fat: 6.9, fiber: 11, sugar: 0, sodium: 2, serving: { label: '1/2 cup', grams: 40 } },
  { id: 'rice-brown', name: 'Brown rice, cooked', group: 'Grains', kcal: 123, protein: 2.7, carbs: 26, fat: 1, fiber: 1.6, sugar: 0.2, sodium: 4, serving: { label: '1 cup', grams: 195 } },
  { id: 'rice-white', name: 'White rice, cooked', group: 'Grains', kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, sugar: 0.1, sodium: 1, serving: { label: '1 cup', grams: 186 } },
  { id: 'quinoa', name: 'Quinoa, cooked', group: 'Grains', kcal: 120, protein: 4.4, carbs: 21, fat: 1.9, fiber: 2.8, sugar: 0.9, sodium: 7, serving: { label: '1 cup', grams: 185 } },
  { id: 'pasta-wheat', name: 'Whole wheat pasta, cooked', group: 'Grains', kcal: 124, protein: 5.3, carbs: 27, fat: 0.5, fiber: 3.9, sugar: 0.6, sodium: 4, serving: { label: '1 cup', grams: 140 } },
  { id: 'bread-whole', name: 'Whole wheat bread', group: 'Grains', kcal: 247, protein: 13, carbs: 41, fat: 3.4, fiber: 7, sugar: 6, sodium: 450, serving: { label: '1 slice', grams: 32 } },
  { id: 'bagel', name: 'Bagel, plain', group: 'Grains', kcal: 250, protein: 10, carbs: 49, fat: 1.5, fiber: 2.1, sugar: 5.2, sodium: 439, serving: { label: '1 bagel', grams: 98 } },
  { id: 'tortilla-flour', name: 'Flour tortilla', group: 'Grains', kcal: 306, protein: 8.2, carbs: 51, fat: 7.5, fiber: 3.1, sugar: 2.7, sodium: 630, serving: { label: '1 tortilla', grams: 45 } },
  { id: 'potato', name: 'Potato, baked', group: 'Grains', kcal: 93, protein: 2.5, carbs: 21, fat: 0.1, fiber: 2.2, sugar: 1.2, sodium: 10, serving: { label: '1 medium', grams: 173 } },
  { id: 'sweet-potato', name: 'Sweet potato, baked', group: 'Grains', kcal: 90, protein: 2, carbs: 21, fat: 0.2, fiber: 3.3, sugar: 6.5, sodium: 36, serving: { label: '1 medium', grams: 151 } },

  // Legumes
  { id: 'black-beans', name: 'Black beans, cooked', group: 'Legumes', kcal: 132, protein: 8.9, carbs: 24, fat: 0.5, fiber: 8.7, sugar: 0.3, sodium: 2, serving: { label: '1 cup', grams: 172 } },
  { id: 'chickpeas', name: 'Chickpeas, cooked', group: 'Legumes', kcal: 164, protein: 8.9, carbs: 27, fat: 2.6, fiber: 7.6, sugar: 4.8, sodium: 7, serving: { label: '1 cup', grams: 164 } },
  { id: 'lentils', name: 'Lentils, cooked', group: 'Legumes', kcal: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 7.9, sugar: 1.8, sodium: 2, serving: { label: '1 cup', grams: 198 } },
  { id: 'edamame', name: 'Edamame, shelled', group: 'Legumes', kcal: 121, protein: 12, carbs: 8.9, fat: 5.2, fiber: 5.2, sugar: 2.2, sodium: 6, serving: { label: '1 cup', grams: 155 } },

  // Vegetables
  { id: 'broccoli', name: 'Broccoli, steamed', group: 'Vegetables', kcal: 35, protein: 2.4, carbs: 7.2, fat: 0.4, fiber: 3.3, sugar: 1.4, sodium: 41, serving: { label: '1 cup', grams: 156 } },
  { id: 'spinach', name: 'Spinach, raw', group: 'Vegetables', kcal: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, sugar: 0.4, sodium: 79, serving: { label: '2 cups', grams: 60 } },
  { id: 'kale', name: 'Kale, raw', group: 'Vegetables', kcal: 49, protein: 4.3, carbs: 8.8, fat: 0.9, fiber: 3.6, sugar: 2.3, sodium: 38, serving: { label: '1 cup', grams: 67 } },
  { id: 'carrots', name: 'Carrots, raw', group: 'Vegetables', kcal: 41, protein: 0.9, carbs: 9.6, fat: 0.2, fiber: 2.8, sugar: 4.7, sodium: 69, serving: { label: '1 medium', grams: 61 } },
  { id: 'bell-pepper', name: 'Bell pepper, red', group: 'Vegetables', kcal: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, sugar: 4.2, sodium: 4, serving: { label: '1 medium', grams: 119 } },
  { id: 'tomato', name: 'Tomato', group: 'Vegetables', kcal: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, sugar: 2.6, sodium: 5, serving: { label: '1 medium', grams: 123 } },
  { id: 'brussels', name: 'Brussels sprouts, roasted', group: 'Vegetables', kcal: 43, protein: 3.4, carbs: 9, fat: 0.3, fiber: 3.8, sugar: 2.2, sodium: 25, serving: { label: '1 cup', grams: 156 } },
  { id: 'cauliflower', name: 'Cauliflower', group: 'Vegetables', kcal: 25, protein: 1.9, carbs: 5, fat: 0.3, fiber: 2, sugar: 1.9, sodium: 30, serving: { label: '1 cup', grams: 107 } },
  { id: 'avocado', name: 'Avocado', group: 'Vegetables', kcal: 160, protein: 2, carbs: 8.5, fat: 15, fiber: 6.7, sugar: 0.7, sodium: 7, serving: { label: '1/2 medium', grams: 68 } },

  // Fruit
  { id: 'banana', name: 'Banana', group: 'Fruit', kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, sugar: 12, sodium: 1, serving: { label: '1 medium', grams: 118 } },
  { id: 'apple', name: 'Apple', group: 'Fruit', kcal: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, sugar: 10, sodium: 1, serving: { label: '1 medium', grams: 182 } },
  { id: 'blueberries', name: 'Blueberries', group: 'Fruit', kcal: 57, protein: 0.7, carbs: 14, fat: 0.3, fiber: 2.4, sugar: 10, sodium: 1, serving: { label: '1 cup', grams: 148 } },
  { id: 'strawberries', name: 'Strawberries', group: 'Fruit', kcal: 32, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2, sugar: 4.9, sodium: 1, serving: { label: '1 cup', grams: 152 } },
  { id: 'orange', name: 'Orange', group: 'Fruit', kcal: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4, sugar: 9.4, sodium: 0, serving: { label: '1 medium', grams: 131 } },
  { id: 'grapes', name: 'Grapes', group: 'Fruit', kcal: 69, protein: 0.7, carbs: 18, fat: 0.2, fiber: 0.9, sugar: 16, sodium: 2, serving: { label: '1 cup', grams: 151 } },

  // Fats & nuts
  { id: 'almonds', name: 'Almonds', group: 'Fats & Nuts', kcal: 579, protein: 21, carbs: 22, fat: 50, fiber: 13, sugar: 4.4, sodium: 1, serving: { label: '1 oz', grams: 28 } },
  { id: 'peanut-butter', name: 'Peanut butter', group: 'Fats & Nuts', kcal: 588, protein: 25, carbs: 20, fat: 50, fiber: 6, sugar: 9, sodium: 459, serving: { label: '2 tbsp', grams: 32 } },
  { id: 'walnuts', name: 'Walnuts', group: 'Fats & Nuts', kcal: 654, protein: 15, carbs: 14, fat: 65, fiber: 6.7, sugar: 2.6, sodium: 2, serving: { label: '1 oz', grams: 28 } },
  { id: 'olive-oil', name: 'Olive oil', group: 'Fats & Nuts', kcal: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, sugar: 0, sodium: 2, serving: { label: '1 tbsp', grams: 14 } },
  { id: 'chia', name: 'Chia seeds', group: 'Fats & Nuts', kcal: 486, protein: 17, carbs: 42, fat: 31, fiber: 34, sugar: 0, sodium: 16, serving: { label: '1 tbsp', grams: 12 } },

  // Prepared & packaged — the entries that make the recommendations earn their keep
  { id: 'pizza-cheese', name: 'Pizza, cheese', group: 'Prepared', kcal: 266, protein: 11, carbs: 33, fat: 10, fiber: 2.3, sugar: 3.6, sodium: 598, serving: { label: '1 slice', grams: 107 } },
  { id: 'burger-fastfood', name: 'Cheeseburger, fast food', group: 'Prepared', kcal: 274, protein: 14, carbs: 27, fat: 13, fiber: 1.5, sugar: 6, sodium: 519, serving: { label: '1 burger', grams: 154 } },
  { id: 'fries', name: 'French fries', group: 'Prepared', kcal: 312, protein: 3.4, carbs: 41, fat: 15, fiber: 3.8, sugar: 0.3, sodium: 210, serving: { label: 'medium', grams: 117 } },
  { id: 'burrito', name: 'Chicken burrito', group: 'Prepared', kcal: 206, protein: 11, carbs: 25, fat: 7, fiber: 2.5, sugar: 1.5, sodium: 470, serving: { label: '1 burrito', grams: 320 } },
  { id: 'protein-bar', name: 'Protein bar', group: 'Prepared', kcal: 350, protein: 30, carbs: 38, fat: 10, fiber: 8, sugar: 4, sodium: 250, serving: { label: '1 bar', grams: 60 } },
  { id: 'ice-cream', name: 'Ice cream, vanilla', group: 'Prepared', kcal: 207, protein: 3.5, carbs: 24, fat: 11, fiber: 0.7, sugar: 21, sodium: 80, serving: { label: '1/2 cup', grams: 66 } },
  { id: 'chips', name: 'Potato chips', group: 'Prepared', kcal: 536, protein: 7, carbs: 53, fat: 34, fiber: 4.4, sugar: 0.3, sodium: 525, serving: { label: '1 oz', grams: 28 } },
  { id: 'soda', name: 'Cola', group: 'Prepared', kcal: 41, protein: 0, carbs: 11, fat: 0, fiber: 0, sugar: 10, sodium: 4, serving: { label: '1 can', grams: 355 } },
  { id: 'beer', name: 'Beer, regular', group: 'Prepared', kcal: 43, protein: 0.5, carbs: 3.6, fat: 0, fiber: 0, sugar: 0, sodium: 4, serving: { label: '1 bottle', grams: 356 } },
  { id: 'latte', name: 'Latte, whole milk', group: 'Prepared', kcal: 63, protein: 3.2, carbs: 5, fat: 3.4, fiber: 0, sugar: 5, sodium: 45, serving: { label: 'grande', grams: 470 } },
];

/** The nutrient keys that scale linearly with portion size. */
export const NUTRIENTS = ['kcal', 'protein', 'carbs', 'fat', 'fiber', 'sugar', 'sodium'];

const BY_ID = new Map(FOODS.map((f) => [f.id, f]));

export function getFood(id) {
  return BY_ID.get(id) ?? null;
}

/**
 * Nutrition for `grams` of a food. Returns zeros for an unknown id rather than
 * throwing: a log entry can outlive an edit to the table, and a day's totals
 * silently losing one row beats the whole screen failing to render.
 */
export function nutritionFor(foodId, grams) {
  const food = BY_ID.get(foodId);
  const out = {};
  for (const key of NUTRIENTS) out[key] = food ? (food[key] * grams) / 100 : 0;
  return out;
}

/**
 * Ranked substring search over name and group.
 *
 * A prefix match on the name outranks a match in the middle, which outranks a
 * group match — so typing "chi" offers chicken before chickpeas before the rest
 * of Protein, instead of table order.
 */
export function searchFoods(query, limit = 8) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored = [];
  for (const food of FOODS) {
    const name = food.name.toLowerCase();
    const at = name.indexOf(q);
    let score = null;
    if (at === 0) score = 0;
    else if (at > 0) score = 1 + at / 100;
    else if (food.group.toLowerCase().includes(q)) score = 50;
    if (score !== null) scored.push({ food, score });
  }
  return scored.sort((a, b) => a.score - b.score).slice(0, limit).map((s) => s.food);
}
