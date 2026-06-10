# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Cypress E2E testing boilerplate built around the Page Component Object Model (PCOM). There is no application under test in this repo — it provides the framework (base component classes, page class, config utilities) that downstream projects extend. CommonJS modules throughout (`require`/`module.exports`).

## Commands

```bash
npm install                              # setup

# Run all device modes (mobile, tablet, desktop) sequentially via npm-run-all
npm run test:e2e                         # alias for test:e2e:dev:main:default

# Single device mode
npm run test:e2e:dev:main:default:desktop

# Arbitrary configuration (the npm scripts are just presets of this)
npx cypress run --env site=main,env=dev,locale=default,mode=desktop

# Run a single spec
npx cypress run --env site=main,env=dev,locale=default,mode=desktop --spec cypress/e2e/path/to/spec.cy.js

# Interactive mode
npx cypress open --env site=main,env=dev,locale=default,mode=desktop
```

Script naming pattern: `test:e2e:<env>:<site>:<locale>:<device>`. There is no linter or unit test suite.

## Configuration flow

`cypress.config.js` → `setupNodeEvents` composes everything from `--env` variables:

1. `getSiteConfig()` (`cypress/support/utils/siteConfigUtils.js`) — applies defaults (`site=main`, `env=dev`, `locale=default`, `retries=0`, `loadTimeout=60000`, `commandTimeout=4000`) and derives `baseUrl`, timeouts, and retries.
2. `getBaseURL()` (`cypress/support/utils/urlUtils.js`) — maps `site`/`env` to a base URL via a hardcoded `urlMask` object, embedding basic-auth `username`/`password` for non-prod envs. `env=sandbox` bypasses the mask and reads `url` directly from env vars. **Adding a new site or environment means editing `urlMask` here.**
3. `setViewPort()` (`cypress/support/utils/deviceUtils.js`) — sets viewport from `mode` (mobile 360×800, tablet 768×1024, desktop 1920×1080, default desktop). Tests can branch on device with `isMobile()`/`isTablet()`/`isDesktop()`.

Environment variable lookup (`cypress/support/utils/envUtils.js`) is hierarchical, most specific wins: `env.site.locale.variable` → `env.site.variable` → `env.variable` → `variable`. E.g. `dev.main.en.username` overrides `username`. Variables come from `cypress.env.json`, `CYPRESS_*` system vars, or `--env` CLI args. `@cypress/grep` is registered for test tagging.

## PCOM architecture

Two class trees under `cypress/support/`:

- **Components** (`components/base/`) encapsulate UI elements. Inheritance chain: `BasicComponent` → `InteractiveComponent` → `TypeableComponent` → `Input` → `Checkbox`/`Radio`/`Select` (→ `MultiSelect`). `Button` and `Form` extend `InteractiveComponent`; `TextArea` extends `TypeableComponent`; `Image`, `Label`, `Link`, `List`, `ListItem`, `Modal` extend `BasicComponent`. `Group.js` is a **mixin**, not a class: `class MyGroup extends Group(BasicComponent)`.
- **Pages** (`pages/base/BasicPage.js`) hold a `Map` of components (`addComponent` also flattens in nested components). Constructor is `new Page(path)` — `path` may contain `:token` placeholders substituted via `open({params})`; per-env/locale paths are resolved by the caller when instantiating the page. Navigation (`open`, `reload`, `goBack/goForward`, `scrollToTop/Bottom`) and assertions (`verifyPageIsOpened`, `shouldHavePath`, `shouldHaveTitle/ContainTitle`, `shouldHaveQueryParam`) all return `this`.

Component conventions:
- Constructor is `new Component(uid, options)` where `options` is a selector string, a callback returning a Cypress chainable, or `{selector, text, callback}`. Resolution priority in `get()`: callback → selector → text (`cy.contains`).
- All action/assertion methods return `this` for chaining, not Cypress chainables.
- Components can nest via `addNestedComponent(component)`.

Wiring: `cypress/support/e2e.js` (the support file) loads grep, `cypress-wait-until`, then `pages.js`. The intended pattern is to instantiate components in `components.js` and pages in `pages.js`, attaching them to `Cypress.components` / `Cypress.pages` so specs access them globally (e.g. `Cypress.pages.toDoPage.open()`). Both files are currently empty placeholders in this boilerplate; project-specific components go in `components/custom/` (or similar) extending the base classes.

Note: `cypress/support/test.js` is a scratch/example file referencing `components/cypress/` and `pages/cypress/` paths that don't exist; it is not loaded by `e2e.js`.
