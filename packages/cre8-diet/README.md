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

## Layout

```
www/
  index.html          app shell — header, tabs, four empty panels
  styles.css          layout only; every colour resolves to a --cre8-* token
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
