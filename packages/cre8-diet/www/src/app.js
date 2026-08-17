/**
 * UI wiring.
 *
 * The panels are built from cre8 components; this file owns state, rendering,
 * and events. Two conventions worth knowing before editing:
 *
 *  - cre8 components take simple values as attributes and structured ones as
 *    properties. `cre8-chart` data and `cre8-select` items are objects, so they
 *    are assigned in JS after the element exists — writing them as attributes
 *    would stringify to "[object Object]" and render nothing, with no error.
 *  - The Today panel's form is built once and left alone. Re-rendering it on
 *    every keystroke would drop focus mid-search, so only the parts that
 *    actually change (suggestions, totals, entry list) are redrawn.
 */

import { getFood, nutritionFor, searchFoods } from './foods.js';
import {
  DEFAULT_GOALS,
  MEALS,
  dayKey,
  loadState,
  macroTargets,
  makeEntry,
  saveState,
} from './store.js';
import { summarize, totals } from './analytics.js';
import { recommend } from './recommendations.js';
import { sampleFortnight } from './sample-data.js';

const WINDOW_DAYS = 14;

let state = loadState();
/** The food chosen in the log form, if any. */
let picked = null;

const $ = (id) => document.getElementById(id);
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const round = (n) => Math.round(n);

/**
 * Read a design token at runtime.
 *
 * Chart.js paints to a canvas, so it cannot resolve `var(--app-macro-carbs)`
 * the way CSS does — the value has to be handed over as a literal. Reading it
 * back from the theme rather than repeating the hex here is what keeps the
 * chart palette identical to the macro bars, and what makes dark mode work at
 * all.
 */
const token = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** A card heading with the brand dot. Structural markup, not a component. */
const cardTitle = (text) => `<div class="card-title"><span class="dot"></span>${esc(text)}</div>`;

function persist() {
  if (!saveState(state)) {
    console.warn('cre8-diet: could not write to localStorage; changes are in memory only');
  }
}

/* -------------------------------------------------------------------------- */
/* Today                                                                      */
/* -------------------------------------------------------------------------- */

function todayEntries() {
  const today = dayKey();
  return state.entries.filter((e) => e.day === today);
}

function ringSvg(consumed, goal) {
  const r = 52;
  const circumference = 2 * Math.PI * r;
  const ratio = goal > 0 ? Math.min(consumed / goal, 1) : 0;
  const over = consumed > goal;
  // An SVG gradient cannot be expressed as a CSS custom property, so the stops
  // read the theme's ring tokens through `var()` on stop-color instead. Over
  // goal, the ramp swaps to amber/red rather than just changing one stroke —
  // the whole arc should change character, not pick up a warning tint.
  return `
    <div class="ring">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="var(${over ? '--app-ring-over-from' : '--app-ring-from'})"/>
            <stop offset="100%" stop-color="var(${over ? '--app-ring-over-to' : '--app-ring-to'})"/>
          </linearGradient>
        </defs>
        <circle class="ring-track" cx="60" cy="60" r="${r}"></circle>
        <circle class="ring-value" cx="60" cy="60" r="${r}" stroke="url(#ringGrad)"
                stroke-dasharray="${(ratio * circumference).toFixed(1)} ${circumference.toFixed(1)}"></circle>
      </svg>
      <div class="ring-label">
        <strong>${round(consumed)}</strong>
        <span>of ${goal} kcal</span>
      </div>
    </div>`;
}

function macroBar(label, key, value, target) {
  const ratio = target > 0 ? Math.min(value / target, 1) : 0;
  return `
    <div class="macro-row">
      <div class="macro-head">
        <span class="macro-name">
          <span class="macro-swatch" style="background:var(--app-macro-${key})"></span>${label}
        </span>
        <span class="macro-value">${round(value)} / ${target}g</span>
      </div>
      <div class="macro-track">
        <div class="macro-fill ${key}" style="width:${(ratio * 100).toFixed(1)}%"></div>
      </div>
    </div>`;
}

function renderSummary() {
  const entries = todayEntries();
  const t = totals(entries);
  const targets = macroTargets(state.goals);
  $('summary').innerHTML = `
    <div class="summary">
      ${ringSvg(t.kcal, state.goals.kcal)}
      <div class="macros">
        ${macroBar('Protein', 'protein', t.protein, targets.protein)}
        ${macroBar('Carbs', 'carbs', t.carbs, targets.carbs)}
        ${macroBar('Fat', 'fat', t.fat, targets.fat)}
      </div>
    </div>`;
}

function renderSuggestions(query) {
  const box = $('suggestions');
  const matches = searchFoods(query);
  if (!matches.length) {
    box.innerHTML = '';
    return;
  }
  box.innerHTML = matches
    .map(
      (f) =>
        `<cre8-button variant="tertiary" size="sm" neutral data-pick="${f.id}" text="${esc(f.name)}"></cre8-button>`
    )
    .join('');
}

function renderPicked() {
  const box = $('picked');
  if (!picked) {
    box.innerHTML = '<p class="empty">Search for a food to log it.</p>';
    return;
  }
  const per = nutritionFor(picked.id, picked.serving.grams);
  box.innerHTML = `
    <cre8-inline-alert status="info">
      <strong>${esc(picked.name)}</strong> — ${picked.serving.label} (${picked.serving.grams}g)
      is ${round(per.kcal)} kcal, ${round(per.protein)}g protein
    </cre8-inline-alert>`;
}

function renderEntries() {
  const entries = todayEntries();
  const box = $('entries');
  if (!entries.length) {
    box.innerHTML = '<p class="empty">Nothing logged yet today.</p>';
    return;
  }
  box.innerHTML = MEALS.map((meal) => {
    const inMeal = entries.filter((e) => e.meal === meal);
    if (!inMeal.length) return '';
    const mealKcal = totals(inMeal).kcal;
    return `
      <div class="meal-group">
        <div class="meal-title"><span>${meal}</span><span class="meal-kcal">${round(mealKcal)} kcal</span></div>
        ${inMeal
          .map((e) => {
            const food = getFood(e.foodId);
            const n = nutritionFor(e.foodId, e.grams);
            return `
              <div class="entry">
                <div>
                  <div class="entry-name">${esc(food ? food.name : 'Unknown food')}</div>
                  <div class="entry-sub">${round(e.grams)}g · ${round(n.protein)}p ${round(n.carbs)}c ${round(n.fat)}f</div>
                </div>
                <div class="entry-kcal">${round(n.kcal)}<span class="unit">kcal</span></div>
                <button class="icon-btn" type="button" data-remove="${e.id}"
                        aria-label="Remove ${esc(food ? food.name : 'entry')}">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
                </button>
              </div>`;
          })
          .join('')}
      </div>`;
  }).join('');
}

function buildTodayPanel() {
  $('panel-today').innerHTML = `
    <cre8-card>
      <div id="summary"></div>
    </cre8-card>

    <cre8-card>
      <div slot="header">${cardTitle('Log a food')}</div>
      <div class="log-form">
        <cre8-field id="search" label="Search foods" placeholder="chicken, oats, banana…"></cre8-field>
        <div class="suggestions" id="suggestions"></div>
        <div id="picked"></div>
        <div class="log-form-row">
          <cre8-field id="grams" label="Amount (g)" type="number" min="0" value="100"></cre8-field>
          <cre8-select id="meal" label="Meal"></cre8-select>
        </div>
        <cre8-button id="add" text="Add to log"></cre8-button>
      </div>
    </cre8-card>

    <cre8-card>
      <div slot="header">${cardTitle("Today's log")}</div>
      <div id="entries"></div>
    </cre8-card>`;

  // Structured value, so it is a property assignment rather than an attribute.
  // `value` is set explicitly rather than trusting `selected` on an option:
  // the component reflects the marked option into the rendered <option>, but
  // its own `value` stays empty until something changes, and the add handler
  // reads `value`.
  $('meal').items = MEALS.map((m) => ({ label: m, value: m }));
  $('meal').value = defaultMeal();

  $('search').addEventListener('input', (event) => {
    renderSuggestions(event.target.value ?? '');
  });

  $('suggestions').addEventListener('click', (event) => {
    const button = event.target.closest('[data-pick]');
    if (!button) return;
    picked = getFood(button.dataset.pick);
    if (picked) $('grams').value = String(picked.serving.grams);
    renderPicked();
  });

  $('add').addEventListener('click', () => {
    if (!picked) return;
    const grams = Number($('grams').value);
    if (!Number.isFinite(grams) || grams <= 0) return;
    state.entries.push(
      makeEntry({ foodId: picked.id, grams, meal: $('meal').value || defaultMeal() })
    );
    persist();
    picked = null;
    $('search').value = '';
    $('suggestions').innerHTML = '';
    renderPicked();
    renderAll();
  });

  $('entries').addEventListener('click', (event) => {
    const button = event.target.closest('[data-remove]');
    if (!button) return;
    state.entries = state.entries.filter((e) => e.id !== button.dataset.remove);
    persist();
    renderAll();
  });

  renderPicked();
}

/** The meal a person is most likely logging, by the clock. */
function defaultMeal() {
  const h = new Date().getHours();
  if (h < 11) return 'Breakfast';
  if (h < 15) return 'Lunch';
  if (h < 21) return 'Dinner';
  return 'Snack';
}

/* -------------------------------------------------------------------------- */
/* Analytics                                                                  */
/* -------------------------------------------------------------------------- */

function renderAnalytics() {
  const s = summarize(state.entries, state.goals, WINDOW_DAYS);
  const series = s.series;
  const shortDay = (d) => d.slice(5).replace('-', '/');

  $('panel-analytics').innerHTML = `
    <cre8-card>
      <div class="stat-grid">
        <div class="stat">
          <div class="stat-value">${round(s.avg.kcal)}</div>
          <div class="stat-label">avg kcal / logged day</div>
        </div>
        <div class="stat">
          <div class="stat-value">${round(s.avg.protein)}g</div>
          <div class="stat-label">avg protein</div>
        </div>
        <div class="stat">
          <div class="stat-value">${s.loggedDays}/${s.window}</div>
          <div class="stat-label">days logged</div>
        </div>
        <div class="stat">
          <div class="stat-value">${s.onTargetDays}</div>
          <div class="stat-label">days within 10% of goal</div>
        </div>
      </div>
    </cre8-card>

    <cre8-card>
      <div slot="header">${cardTitle('Calories vs goal')}</div>
      <div class="chart-wrap">
        <cre8-chart id="chart-trend" type="line" height="220" aria-label="Daily calories against goal"></cre8-chart>
      </div>
    </cre8-card>

    <cre8-card>
      <div slot="header">${cardTitle('Where calories come from')}</div>
      <div class="chart-wrap">
        <cre8-chart id="chart-macros" type="doughnut" height="220" legend-position="bottom"
                    aria-label="Share of calories by macronutrient"></cre8-chart>
      </div>
    </cre8-card>

    <cre8-card>
      <div slot="header">${cardTitle('Biggest contributors')}</div>
      <div id="contributors"></div>
    </cre8-card>`;

  // `maintain-aspect-ratio` defaults to true and is a boolean attribute, so
  // markup cannot turn it off — `="false"` still reads as present. Without
  // this the canvas keeps its own ratio and leaves dead space inside the card.
  for (const id of ['chart-trend', 'chart-macros']) $(id).maintainAspectRatio = false;

  $('chart-trend').data = {
    labels: series.map((d) => shortDay(d.day)),
    datasets: [
      {
        label: 'Calories',
        // null rather than 0 on unlogged days: Chart.js draws a gap, which is
        // the truth. A zero would read as a day of not eating.
        data: series.map((d) => (d.logged ? round(d.kcal) : null)),
        borderColor: token('--app-macro-protein'),
        backgroundColor: token('--app-chart-fill'),
        borderWidth: 3,
        fill: true,
        tension: 0.35,
        spanGaps: false,
        pointBackgroundColor: token('--cre8-color-bg-default'),
        pointBorderWidth: 2,
        pointRadius: 3.5,
      },
      {
        label: 'Goal',
        data: series.map(() => state.goals.kcal),
        borderColor: token('--cre8-color-content-disabled'),
        borderDash: [5, 4],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
    ],
  };
  // Gridlines and tick labels are read from the token layer too, or the chart
  // keeps Chart.js's own greys and stops matching the card it sits in.
  const grid = token('--cre8-color-border-default');
  const tick = token('--cre8-color-content-subtle');
  $('chart-trend').options = {
    scales: {
      y: { beginAtZero: true, grid: { color: grid }, ticks: { color: tick } },
      x: { grid: { display: false }, ticks: { color: tick } },
    },
    plugins: { legend: { display: true, position: 'bottom', labels: { color: tick, usePointStyle: true } } },
  };

  const macroKcal = [s.avg.protein * 4, s.avg.carbs * 4, s.avg.fat * 9].map(round);
  $('chart-macros').data = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: macroKcal,
        backgroundColor: [
          token('--app-macro-protein'),
          token('--app-macro-carbs'),
          token('--app-macro-fat'),
        ],
        borderColor: token('--cre8-color-bg-default'),
        borderWidth: 3,
      },
    ],
  };
  $('chart-macros').options = {
    cutout: '62%',
    plugins: { legend: { position: 'bottom', labels: { color: tick, usePointStyle: true } } },
  };

  const contributors = s.topContributors;
  $('contributors').innerHTML = contributors.length
    ? contributors
        .map(
          (c, i) => `
          <div class="entry contributor">
            <span class="rank">${i + 1}</span>
            <div>
              <div class="entry-name">${esc(c.food.name)}</div>
              <div class="entry-sub">${c.count} ${c.count === 1 ? 'entry' : 'entries'} · ${c.food.group}</div>
            </div>
            <div class="entry-kcal">${round(c.kcal)} kcal</div>
          </div>`
        )
        .join('')
    : '<p class="empty">Log a few days to see which foods drive your intake.</p>';
}

/* -------------------------------------------------------------------------- */
/* Insights                                                                   */
/* -------------------------------------------------------------------------- */

function renderInsights() {
  const s = summarize(state.entries, state.goals, WINDOW_DAYS);
  const recs = recommend(s);
  const LABEL = { high: 'Act on this', medium: 'Worth a look', low: 'FYI', positive: 'Going well' };

  // Plain elements rather than cre8-inline-alert. Five saturated alert panels
  // stacked in a column is noise, and severity ranking is the whole point of
  // this screen — a coloured spine ranks, a coloured panel just shouts. Every
  // colour still comes from the cre8 token layer via the .rec-card rules.
  $('panel-insights').innerHTML = `
    ${recs
      .map(
        (r) => `
      <div class="rec-card ${r.severity}">
        <div class="rec-head">
          <span class="rec-title">${esc(r.title)}</span>
          <span class="rec-chip">${LABEL[r.severity] ?? 'Note'}</span>
        </div>
        <div class="rec-detail">${esc(r.detail)}</div>
        <div class="rec-evidence">${esc(r.evidence)}</div>
        ${
          r.suggestions?.length
            ? `<div class="rec-suggestions">${r.suggestions
                .map((x) => `<span class="pill">${esc(x)}</span>`)
                .join('')}</div>`
            : ''
        }
      </div>`
      )
      .join('')}
    <cre8-card>
      <p class="disclaimer">
        These are rules, not a model and not a clinician. Each card shows the number that
        triggered it so you can check the reasoning — and disagree with it. Nothing here
        accounts for medical conditions, medication, pregnancy, or training load. Talk to a
        doctor or a dietitian before making changes that matter.
      </p>
    </cre8-card>`;
}

/* -------------------------------------------------------------------------- */
/* Goals                                                                      */
/* -------------------------------------------------------------------------- */

function renderGoals() {
  const g = state.goals;
  const targets = macroTargets(g);

  $('panel-goals').innerHTML = `
    <cre8-card>
      <div slot="header">${cardTitle('Daily targets')}</div>
      <div class="log-form">
        <cre8-field id="goal-kcal" label="Calories" type="number" min="0" value="${g.kcal}"></cre8-field>
        <div class="log-form-row">
          <cre8-field id="goal-protein" label="Protein %" type="number" min="0" max="100" value="${g.proteinPct}"></cre8-field>
          <cre8-field id="goal-carbs" label="Carbs %" type="number" min="0" max="100" value="${g.carbsPct}"></cre8-field>
        </div>
        <div class="log-form-row">
          <cre8-field id="goal-fat" label="Fat %" type="number" min="0" max="100" value="${g.fatPct}"></cre8-field>
          <cre8-select id="goal-weight" label="Weight goal"></cre8-select>
        </div>
        <div class="log-form-row">
          <cre8-field id="goal-fiber" label="Fiber (g)" type="number" min="0" value="${g.fiber}"></cre8-field>
          <cre8-field id="goal-sodium" label="Sodium limit (mg)" type="number" min="0" value="${g.sodium}"></cre8-field>
        </div>
        <cre8-field id="goal-sugar" label="Sugar limit (g)" type="number" min="0" value="${g.sugar}"></cre8-field>
        <div id="goal-error"></div>
        <div class="actions">
          <cre8-button id="goal-save" text="Save targets"></cre8-button>
          <cre8-button id="goal-reset" variant="secondary" neutral text="Reset to defaults"></cre8-button>
        </div>
        <p class="disclaimer">
          Current split works out to ${targets.protein}g protein, ${targets.carbs}g carbs,
          ${targets.fat}g fat.
        </p>
      </div>
    </cre8-card>

    <cre8-card>
      <div slot="header">${cardTitle('Data')}</div>
      <div class="log-form">
        <p class="disclaimer">
          Everything stays on this device. There is no account, no sync, and nothing leaves
          the app — which is also why deleting it deletes your log.
        </p>
        <div class="actions">
          <cre8-button id="seed" variant="secondary" neutral text="Load sample fortnight"></cre8-button>
          <cre8-danger-button id="clear" text="Delete all data"></cre8-danger-button>
        </div>
      </div>
    </cre8-card>`;

  $('goal-weight').items = ['lose', 'maintain', 'gain'].map((v) => ({
    label: v[0].toUpperCase() + v.slice(1),
    value: v,
  }));
  $('goal-weight').value = g.weightGoal;

  $('goal-save').addEventListener('click', () => {
    const num = (id) => Number($(id).value);
    const next = {
      kcal: num('goal-kcal'),
      proteinPct: num('goal-protein'),
      carbsPct: num('goal-carbs'),
      fatPct: num('goal-fat'),
      fiber: num('goal-fiber'),
      sodium: num('goal-sodium'),
      sugar: num('goal-sugar'),
      weightGoal: $('goal-weight').value || g.weightGoal,
    };
    const split = next.proteinPct + next.carbsPct + next.fatPct;
    // Rejected rather than silently normalised: a split that does not sum to
    // 100 makes every macro target on the Today screen quietly wrong.
    if (Math.abs(split - 100) > 0.5) {
      $('goal-error').innerHTML =
        `<cre8-inline-alert status="error" full-width>Macro percentages add up to ${round(split)}%. They need to total 100%.</cre8-inline-alert>`;
      return;
    }
    if (!Number.isFinite(next.kcal) || next.kcal <= 0) {
      $('goal-error').innerHTML =
        '<cre8-inline-alert status="error" full-width>Calorie target must be greater than zero.</cre8-inline-alert>';
      return;
    }
    state.goals = next;
    persist();
    renderAll();
  });

  $('goal-reset').addEventListener('click', () => {
    state.goals = { ...DEFAULT_GOALS };
    persist();
    renderAll();
  });

  $('seed').addEventListener('click', () => {
    state.entries = state.entries.concat(sampleFortnight());
    persist();
    renderAll();
  });

  $('clear').addEventListener('click', () => {
    if (!confirm('Delete every logged entry and reset your targets?')) return;
    state = { goals: { ...DEFAULT_GOALS }, entries: [] };
    persist();
    renderAll();
  });
}

/* -------------------------------------------------------------------------- */

function renderHeader() {
  $('hero-date').textContent = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const s = summarize(state.entries, state.goals, WINDOW_DAYS);
  $('hero-streak-text').textContent = `${s.streak} day${s.streak === 1 ? '' : 's'}`;

  const consumed = totals(todayEntries()).kcal;
  const remaining = state.goals.kcal - consumed;
  $('hero-kcal').textContent = round(consumed);
  // Past the goal, "over" is the number that matters — counting up toward a
  // target already missed tells the reader nothing they can act on.
  $('hero-kcal-sub').textContent =
    remaining >= 0
      ? `of ${state.goals.kcal} kcal · ${round(remaining)} left`
      : `${round(-remaining)} kcal over goal`;
  const ratio = state.goals.kcal > 0 ? Math.min(consumed / state.goals.kcal, 1) : 0;
  $('hero-meter').style.width = `${(ratio * 100).toFixed(1)}%`;
}

function renderAll() {
  renderHeader();
  renderSummary();
  renderEntries();
  renderAnalytics();
  renderInsights();
  renderGoals();
}

/**
 * Nothing renders until the components we assign properties to are defined.
 *
 * The bundle is a module, so it resolves after this script starts. Setting
 * `.items` or `.data` on an element that has not upgraded yet writes an own
 * property that shadows the accessor Lit is about to install — the value is
 * then invisible to the component forever, and the failure is silent: an empty
 * select and a chart with no series, no error anywhere. Elements created after
 * a definition exists upgrade synchronously, so waiting once here is enough for
 * every later re-render too.
 */
const PANELS = ['panel-today', 'panel-analytics', 'panel-insights', 'panel-goals'];

/**
 * Show one destination.
 *
 * `cre8-tabs` used to own this; a bottom bar is navigation for the whole app
 * rather than a control on one screen, so it reports the selection and the app
 * decides what that means. Scroll resets on every switch, which is what a
 * native tab bar does — arriving at a screen halfway down is disorienting.
 */
function showPanel(index) {
  PANELS.forEach((id, i) => {
    $(id).hidden = i !== index;
  });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

async function start() {
  await Promise.all(
    ['cre8-select', 'cre8-chart', 'cre8-tab-bar', 'cre8-tab-bar-item'].map((tag) =>
      customElements.whenDefined(tag)
    )
  );
  buildTodayPanel();
  renderAll();

  $('tab-bar').addEventListener('tab-bar-select', (event) => {
    showPanel(event.detail.index);
  });
  showPanel(0);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
