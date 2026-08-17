# Cre8 Diet

A nutrition tracker built entirely from `@tmorrow/cre8-wc`, packaged for iOS
with Capacitor. Four screens: log what you ate, see what that adds up to, read
what the numbers imply, set what you are aiming at.

```sh
pnpm install
pnpm --filter @tmorrow/cre8-diet dev      # http://localhost:4310
```

Open the Goals tab and press **Load sample fortnight** to see the analytics and
rules working against realistic data.

## What it does

**Today** — a calorie ring and macro bars against your targets, a search-driven
log form, and the day's entries grouped by meal. Portions are stored in grams;
the search offers the serving a person actually thinks in ("1 medium", "1 cup").

**Trends** — 14-day calories against goal, the macro split, biggest calorie
contributors, and four headline stats. Unlogged days are drawn as gaps rather
than zeroes, because a day you did not log is not a day you did not eat.

**Insights** — rule-based recommendations, each stating the number that
triggered it.

**Goals** — calorie target, macro split, fiber/sodium/sugar limits, weight
direction. The macro split is rejected unless it totals 100%, since a split that
does not makes every target on the Today screen quietly wrong.

## The recommendations

There is no model here and no network call. `www/src/recommendations.js` is a
list of pure functions over a summary of your log, each returning a card or
staying silent. The design constraints that matter:

- **Every card cites its evidence.** "140g/day average vs a 165g target", not
  "you should eat more protein". Advice about your own eating should be
  checkable, and arguable.
- **Nothing speaks below three logged days.** On thinner data every rule either
  fires or stays quiet on noise, and a confident claim drawn from two days
  teaches you to ignore the tab.
- **Direction is read from your stated goal.** A calorie surplus is reported as
  progress if you said you are gaining, and as a problem if you said you are
  losing. The same number, framed by what you asked for.

They are heuristics, not medicine — the app says so on the tab, and nothing here
accounts for medical conditions, medication, pregnancy, or training load.

## Shipping to the App Store

The UI is web components, so the route to the App Store is a Capacitor wrapper
around a WKWebView. Everything the page loads is bundled locally — no CDN, no
fonts over the wire, no API — which is both an offline requirement and the
difference between an app and a thin client at review time.

```sh
pnpm --filter @tmorrow/cre8-diet ios:add    # once, generates ios/
pnpm --filter @tmorrow/cre8-diet ios:sync   # after any change to www/
pnpm --filter @tmorrow/cre8-diet ios:open   # opens Xcode
```

`ios:add` and everything after it need **macOS with Xcode and CocoaPods** — they
cannot run on Linux or in CI without a Mac runner. Signing, the icon set, the
launch screen, and the App Store listing are all done in Xcode; `capacitor.config.json`
carries the bundle id (`dev.tmorrow.cre8diet`) and the display name.

Two things are already handled for the webview: `viewport-fit=cover` plus
`env(safe-area-inset-*)` padding keeps content clear of the notch and the home
indicator, and `limitsNavigationsToAppBoundDomains` keeps the webview from
navigating anywhere outside the bundle.

Because the log never leaves the device, the App Privacy questionnaire is
"Data Not Collected" and no privacy policy URL is required for data handling.

## Theme

`www/theme/cre8-vivid.css` is a **cre8 brand theme** — a token override layer
loaded after the base brand sheet. It redefines `--cre8-*` values rather than
restyling components, so every cre8 element on the page follows it without a
single component-level rule, and re-theming the app means editing one file.

Three things it changes, and why:

- **A status ramp that carries meaning.** The stock a2ui brand maps success to
  cyan and error to pink. Neither hue means what it says, and the two sit close
  enough that an alert's status has to be read rather than seen. This goes back
  to green good / red bad / amber caution, with violet for attention so no two
  statuses share a hue.
- **One gradient, used as identity.** Indigo → cyan on the hero, the calorie
  ring, the stat numerals and the rank chips. Flat `#3B82F6` on white is
  perfectly correct and completely forgettable; a nutrition app has to make
  progress feel like something.
- **One hue per macro, everywhere.** Protein indigo, carbs cyan, fat amber —
  identical in the macro bars, the doughnut, and the trend line. Success moved
  off cyan precisely because cyan now means "carbs", and one hue cannot mean two
  things on the same screen.

Dark mode is a second pass over the same token names, so nothing in `styles.css`
or `app.js` branches on the mode. Chart.js paints to a canvas and cannot resolve
`var()`, so `app.js` reads the tokens back with `getComputedStyle` — which is
what keeps the charts matching the bars in both modes.

To use it in another cre8 app, copy the file and load it after the brand sheet.
To make it available to every cre8 app, promote it to
`packages/cre8-wc/design-tokens/brands/cre8-vivid/`; it is deliberately a single
file with no app-specific selectors so that move is a copy.

**cre8 components supply the primitives; the layout around them is structural
HTML.** The hero, the ring, the macro bars, the severity-spined insight cards
and the ranked contributor rows are plain markup styled with cre8 tokens —
`cre8-card`, `cre8-field`, `cre8-select`, `cre8-button`, `cre8-tabs` and
`cre8-chart` do the rest. Built only from components, the app reads as a
component gallery; built only from markup, it stops being cre8.

## Layout

```
www/
  index.html          app shell — header, tabs, four empty panels
  styles.css          layout only; every colour resolves to a token
  theme/cre8-vivid.css  the brand theme — cre8 token overrides + app tokens
  src/foods.js        food table, per 100g, with ranked search
  src/store.js        goals, entries, localStorage, local-date handling
  src/analytics.js    aggregations — pure functions of (entries, goals)
  src/recommendations.js  the rules
  src/sample-data.js  deterministic fortnight for demos and tests
  src/app.js          rendering and events
  vendor/             cre8-wc runtime + tokens (generated, gitignored)
```

```sh
pnpm --filter @tmorrow/cre8-diet test
```

The tests cover the parts where a wrong answer is invisible — nutrition maths,
the local-date boundary, averaging over logged days only, and the rule
thresholds. A chart still draws and a card still appears when those are wrong;
the number on it is simply false.

## Two cre8 traps this ran into

Both cost real time, and neither produces an error:

1. **`slots.default` in the catalog means the *unnamed* slot.** Writing
   `slot="default"` in HTML routes content to a slot that does not exist, and
   the component renders empty.
2. **Structured props must be assigned after the element upgrades.** Setting
   `.items` or `.data` on an element whose definition has not loaded writes an
   own property that shadows the accessor Lit is about to install — the value is
   invisible from then on. `src/app.js` awaits `customElements.whenDefined()`
   before its first render for exactly this reason.
