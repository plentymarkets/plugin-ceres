# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Ceres / **plentyShop LTS** — the official default template plugin for PlentyONE (plentymarkets) online stores. It is *not* a standalone app: it is a PHP plugin that runs inside the PlentyONE core (a Laravel-based host) and depends on the [IO](https://github.com/plentymarkets/plugin-io) plugin (`require.IO` in [plugin.json](plugin.json)). PHP code cannot be run or tested locally — only the frontend assets build locally.

**Ceres is the presentation layer only.** There is no `Controllers/`, `Routes/`, or `Middlewares/` directory — routing, controllers and webshop services live in the sibling IO plugin. Ceres owns templates, contexts, widgets, config and assets. Twig helpers you'll see in templates but can't find here (`getPartial()`, `component()`, `trans()`, `services.*`) come from IO.

There is no Composer autoload: the plugin runtime maps `Ceres\Foo\Bar` → `src/Foo/Bar.php`, so directory names and namespace segments must match exactly. Never `new` a class — always `pluginApp(X::class)`.

Two languages, one plugin:
- **PHP** in [src/](src/) — service provider, contexts, ShopBuilder widgets, config, Twig extensions. Namespace root `Ceres\` maps to `src/`.
- **JS/SCSS/Twig** in [resources/](resources/) — Vue 2 + Vuex frontend (16 non-namespaced store modules, flat mutation names), SCSS, Twig views.

The global `App` object (shop config, `isSSR`, `publicPath`, currency pattern) is injected from Twig as JSON and read as an implicit global throughout the JS — it is not imported anywhere.

## Commands

Node 14 is required for the webpack 4 / node-sass-era build toolchain — newer Node versions fail (e.g. OpenSSL/webpack errors) or produce different lint parsing behavior. Run `nvm use 14` before any of the commands below.

```bash
nvm use 14                # switch to Node 14 before running any command below
npm install               # newer Node often fails on old webpack 4 + node-sass-era deps
npm run build             # full build: prod then dev bundles (prebuild runs bundleSass)
npm run build:js          # JS only (scripts + client + server, dev and prod)
npm run build:sass        # SCSS only
npm start                 # webpack --watch
npm run lint              # lint:js (eslint resources/js/src) + lint:sass (stylelint resources/scss)
npm test                  # runs test:monetaryFormatter only
npm run test:e2e          # cypress run (needs a live shop; baseUrl in cypress.json)
npm run test:e2e:dev      # cypress open
npm run compareTranslations   # diffs translation .properties files across locales
```

Run a single Cypress spec:
```bash
npx cypress run --browser electron --spec testing/cypress/integration/checkout/prices.spec.js
```

There is **no PHP test suite and no PHP linter** configured. `npm test` covers exactly one file ([tools/testMonetaryFormatter.js](tools/testMonetaryFormatter.js) against [MonetaryFormatter.js](resources/js/src/app/helper/MonetaryFormatter.js)) — don't assume `npm test` validates your change.

## Build output is committed

Generated assets are tracked in git: [resources/js/dist/](resources/js/dist/) (~450 files) and [resources/css/](resources/css/) `.css`/`.min.css`/bundled `.scss`. They are marked `merge=ours linguist-generated=true` in [.gitattributes](.gitattributes) so merges keep the local build rather than conflicting; `.gitignore` also lists them, but the tracked copies persist regardless.

Consequences:
- After changing JS or SCSS you must run the build and commit the dist output, or the change won't reach the shop. Recent commits do exactly this (e.g. "chore: add build files").
- CI on `stable` ([automatic_build_stable.yml](.github/workflows/automatic_build_stable.yml)) rebuilds and auto-commits "Automatic build", so dist churn on `stable` is expected noise.
- `plugin.json`, `config.json`, `package.json` are gitignored-but-tracked too; edits to them need `git add -f` if git ignores them in your working copy.

## Webpack: five configs, one plugin

[webpack.config.js](webpack.config.js) exports an array of five configs from [tools/webpack/](tools/webpack/). Everything outputs to `resources/js/dist/`; `--env.prod` toggles `.min` suffix and minification.

| config-name | entry | output | purpose |
|---|---|---|---|
| `scripts` | [base.js](resources/js/src/base.js), [checkout.js](resources/js/src/checkout.js) | `ceres-base.js`, `ceres-checkout.js` | non-SSR page bundles |
| `client` | [entry-client.js](resources/js/src/entry-client.js) | `ceres-client.js` | SSR client hydration |
| `server` | [entry-server.js](resources/js/src/entry-server.js) | `ceres-server.js` (commonjs2, single chunk) | SSR server render |
| `styles` | [resources/scss/](resources/scss/) `base/checkout/icons/shopbuilder.scss` | `resources/css/ceres-*.css` | SCSS → CSS |
| (custom) | `lightbox.min.js` | copied as-is | vendored lightbox |

Only the `scripts` config runs `eslint-loader`, so `client`/`server` bundles are not lint-gated by the build — use `npm run lint`. The `scripts` and `client` configs route chunk URLs through `window.__loadPluginChunk` ([PageDesign.twig:236](resources/views/PageDesign/PageDesign.twig#L236)), which appends `?v={{ buildHash }}` for cache busting. The custom (lightbox) config has no `name` and so cannot be targeted via `--config-name` — it only runs on a full `webpack` invocation, not `npm run build:js`.

**`ceres-base` vs `ceres-checkout`** is a real split, not a naming quirk: each PHP Context declares `public $assetName` ([GlobalContext.php:145](src/Contexts/GlobalContext.php#L145) defaults to `ceres-checkout`; [SingleItemContext.php:60](src/Contexts/SingleItemContext.php#L60) uses `ceres-base`), and [PageDesign.twig](resources/views/PageDesign/PageDesign.twig) branches on `assetName` to decide which bundle and extra markup to emit.

`checkout.js` begins with `import "./base"`, so **`ceres-checkout` is a superset of `ceres-base`** — registering a component in `base.js` makes it available on checkout/my-account pages too; the reverse is not true. `checkout.js` adds only the checkout/my-account-specific components.

### Both `.min` and non-min builds are required

[PageDesign.twig:249-259](resources/views/PageDesign/PageDesign.twig#L249-L259) picks `minSuffix = '.min'` unless `ceresConfig.log.performanceLevel == 'development'`. Both variants are loaded at runtime depending on shop config, which is why `npm run build` is `build:prod && build:dev` — shipping only one leaves shops on the other setting with a 404.

### bundleSass: for the ShopBuilder style editor

`prebuild` runs [tools/bundleSass.js](tools/bundleSass.js), which does **not** compile CSS. It walks the `@import` tree (resolving `~pkg` → `node_modules/pkg`) and inlines it into single flattened files `resources/css/ceres-*.scss`. [Head.twig:92](resources/views/PageDesign/Partials/Head.twig#L92) emits `data-sass-root` / `data-sass-original` pointing at them **only in ShopBuilder**, where the live style editor recompiles SCSS in the browser — so the flattened output must contain zero unresolvable `@import`s.

Adding a new partial means adding it to the relevant `_*.scss` index (e.g. [_widgets.scss](resources/scss/ceres/widgets/_widgets.scss)) or it is silently absent from both CSS and the bundled SCSS.

## PHP architecture

### Bootstrap: one service provider

[src/Providers/TemplateServiceProvider.php](src/Providers/TemplateServiceProvider.php) is the single entry point (declared as `serviceProvider` in plugin.json). Its `boot()` does everything:

1. Registers the setup assistant (`ShopWizard`).
2. Registers **every** ShopBuilder widget by iterating [WidgetCollection::all()](src/Widgets/WidgetCollection.php).
3. Registers the `Ceres::ALREADY_PAID` payment method.
4. Adds `Twig_Extension_StringLoader` plus the four Twig extensions from [src/Extensions/](src/Extensions/).
5. Maps `ResultFieldTemplate` constants to the JSON files in [resources/views/ResultFields/](resources/views/ResultFields/) — these declare which item/variation fields the search returns.
6. Listens to IO events (`IO.tpl.*`, `IO.ctx.*`, `IO.init.templates`) via the private `listenToIO()` helper, which registers both `IO.x` and `IO.intl.x` at priority 100.
7. `registerConfigValues()` pushes selected `CeresConfig` values into core's `TemplateConfigRepositoryContract` so core modules can read them, and `registerConsents()` declares the six cookie-consent groups (`necessary`, `tracking`, `payment`, `marketing`, `media`, `convenience`).

### Template key → view + context

The `$templateKeyToViewMap` static array ([TemplateServiceProvider.php:66-104](src/Providers/TemplateServiceProvider.php#L66-L104)) is the routing table of the whole shop: `'tpl.item' => ['Item.SingleItemWrapper', SingleItemContext::class]`. `setTemplateAndContext()` resolves the key, prefixes the view with `Ceres::`, and sets the Context class. Keys ending `.category` are auto-selected when the route is backed by a CMS category. **Adding a new page type means adding an entry here** plus the Twig view plus a Context.

### Contexts

A Context ([src/Contexts/](src/Contexts/)) is the view-model handed to Twig: its **public properties literally become the Twig globals** (IO reflects over the object via `ArrayHelper::toArray`). `init($params)` pulls services via `pluginApp()`. `GlobalContext` implements IO's `ContextInterface` and is the base all others extend; override `init()` calling `parent::init($params)` first. So `{{ ceresConfig... }}`, `{{ categories }}`, `{{ isShopBuilder }}` are all public props on the resolved context.

Note [src/Contexts/ItemListContext.php](src/Contexts/ItemListContext.php) is a **trait**, not a context — a mixin carrying item-list state (paging, sorting, facets) into `CategoryItemContext`, `ItemSearchContext` and `TagSearchContext`. Also, the service provider imports `Ceres\Contexts\ContactContext`, which does not exist — a harmless dead import, not a file you need to find.

### ShopBuilder widgets — the main extension point

Adding a widget touches ~6 places. `WishListWidget` is a compact reference implementation of all of them:

1. **PHP class** in `src/Widgets/<Category>/` extending [BaseWidget](src/Widgets/Helper/BaseWidget.php), e.g. [src/Widgets/Item/WishListWidget.php](src/Widgets/Item/WishListWidget.php). It sets `protected $template = "Ceres::Widgets.Item.WishListWidget"`, returns metadata from `getData()` via `WidgetDataFactory::make("Ceres::<Name>")` (label, preview image, `withType()` from [WidgetTypes](src/Widgets/Helper/WidgetTypes.php), `withCategory()` from [WidgetCategories](src/Widgets/Helper/WidgetCategories.php), position, `withSearchKeyWords()`), and declares settings from `getSettings()` via `WidgetSettingsFactory`. The widget class name must match its Twig filename.
2. **Register in [WidgetCollection.php](src/Widgets/WidgetCollection.php)** — both the `use` import and the array entry. Missing this means the widget never appears.
3. **Twig template** in `resources/views/Widgets/<Category>/` ([WishListWidget.twig](resources/views/Widgets/Item/WishListWidget.twig)), importing `Ceres::Widgets.Helper.WidgetHelper` for the standard `getInlineSpacings`/`getSpacingClasses` treatment.
4. **Translations** in `resources/lang/de/Widget.properties` and `resources/lang/en/Widget.properties` for every label/tooltip key (`Widget.properties` exists only in de and en — see locale table below).
5. **SCSS** partial ([Item/_wish-list-widget.scss](resources/scss/ceres/widgets/Item/_wish-list-widget.scss)) plus an `@import` in the parent index.
6. Optionally add it to a **Preset** in [src/Widgets/Presets/](src/Widgets/Presets/) so new shops get it by default (`WishListWidget` is in `DefaultSingleItemPreset`, `ItemSetPreset` and `WishListPreset`) — note the changelog then needs a "TODO: regenerate ShopBuilder content" entry.

`WidgetTypes` constants encode *where* a widget may be dropped; [shopBuilder.json](shopBuilder.json) `allowedTypes` maps dropzone → permitted types.

Two gotchas:
- **`Ceres\Widgets\Helper\Factories\WidgetSettingsFactory` is marked `@deprecated since 5.0.23`** in favour of the core `Plenty\Modules\ShopBuilder\Factories\WidgetSettingsFactory`, and merely proxies to it. But 98 of 99 widgets still use the deprecated Ceres one — it is the de facto convention. Follow the surrounding code rather than the tag unless you're deliberately migrating.
- **`BaseWidget::renderTemplate()` swallows Twig exceptions**, logging `twig_render_exception` and returning `""`. A broken widget template renders as *nothing*, not an error — check the plugin log before assuming your widget wasn't registered.

Settings values are **responsive**: they arrive as `{mobile, tablet, desktop}`, which is why Twig reads `widget.settings.<key>.mobile` everywhere.

### Vue components in Twig

**There is no component index — every global component is registered twice.** [base.js](resources/js/src/base.js) (non-SSR bundle, ~73 registrations) and the `beforeCreate()` export in [app.js](resources/js/src/app.js) (SSR path, ~73 registrations) hold parallel lists. Adding a component means editing **both**, and `checkout.js` too if it is checkout-only. The lists have already drifted — some components are async `() => import(...)` in one file and eager in the other — so copy the neighbouring style rather than assuming.

Widgets render Twig that emits custom elements (`<wish-list :item-details-data="...">`). Three distinct Twig↔Vue patterns coexist:

1. **SFC + slots** (current) — template lives in the `.vue` file; Twig writes the element and fills slots. [AttributeWidget.twig](resources/views/Widgets/Item/AttributeWidget.twig) puts ShopBuilder-preview markup into `<variation-select>`'s fallback `<slot>`.
2. **Twig-provided x-template** (legacy) — a `Components/*.twig` file holds `<script type="x/template" id="vue-...">` and the JS component declares `props: { template: { default: "#vue-..." } }`; `template.mixin.js` copies the prop into `$options.template`. Emitted via `{{ component("Ceres::...") }}`, which queues it for the `IncludeComponents` macro rather than rendering inline.
3. **Template override** — `templateOverride` prop or a `<script data-component="tag">` element, picked up by [mount.js](resources/js/src/mount.js), which overrides `Vue.component`/`$mount` so theme plugins can swap templates.

**Vue delimiters are `${ }`, not `{{ }}`** ([store/index.js:38](resources/js/src/app/store/index.js#L38) sets `Vue.options.delimiters`). This is what lets Twig `{{ ... }}` and Vue interpolation coexist in one file — don't "fix" a `${ }` to `{{ }}` in a template.

Data reaching a widget's Twig via `item.documents[0].data` (e.g. `ItemImageWidget.twig` reading `itemData.images`, `ItemManufacturerWidget` reading `item.manufacturer.*`) must be listed in the matching `resources/views/ResultFields/*.fields.json` — adding a field to a template without adding it there yields empty values.

### TwigBuilder: generating Twig at runtime

[resources/views/Widgets/Helper/TwigBuilder.twig](resources/views/Widgets/Helper/TwigBuilder.twig) is a macro library (imported as `{% import "Widgets/Helper/TwigBuilder.twig" as Twig %}`) for composing *literal Twig source as a string* and re-rendering it, so a widget can emit `{% if %}`/`{% set %}`/`{{ ... }}` whose condition or arguments aren't known until the template runs — e.g. deciding at runtime which `LayoutContainer` to show. Key macros: `Twig.print(output)`, `Twig.do(statement)`, `Twig.call(method, args)`, `Twig.set`/`Twig.setEscaped`, `Twig.if`/`Twig.elseif`/`Twig.else`/`Twig.endif`, `Twig.for`/`Twig.endfor`, `Twig.trans`, `Twig.include`, `Twig.import`, `Twig.component`. Example ([BasketTotalsWidget.twig](resources/views/Widgets/Basket/BasketTotalsWidget.twig)):
```twig
{{ Twig.set("currentTemplate", Twig.call("services.template.getCurrentTemplate")) }}
{{ Twig.if("currentTemplate == 'tpl.checkout'") }}
    {{ Twig.print(Twig.call("LayoutContainer.show", ["Ceres::Checkout.BeforeBasketTotals"])) }}
```

### Config

Two halves that must stay in sync:
- [config.json](config.json) declares the admin UI form fields, keyed by tab (`Config.GlobalTab`, …) with `type`, `label` (a `Config.*` translation key) and `options.defaultValue`.
- [src/Config/Ceres*Config.php](src/Config/) classes extend `PluginConfig`, declare a typed public property per setting, and read it in `load()` via `getTextValue('global.favicon', '')` etc. [CeresConfig.php](src/Config/CeresConfig.php) aggregates them all and is a container singleton.

A new setting needs the field in `config.json`, the property + `load()` line in the right `Ceres*Config` class, and `Config.properties` translations (de + en). Note config keys are historically snake_case while properties are camelCase, and the mapping is manual.

Other PHP dirs: [src/Containers/](src/Containers/) (thin `call(Twig $twig, $arg)` classes rendering a view — registered as `dataProviders` in plugin.json), [src/Extensions/](src/Extensions/) (Twig functions/filters — notably `TwigItemDataField`, the ShopBuilder dynamic-placeholder engine), [src/Helper/](src/Helper/) (stateless utilities incl. `LayoutContainer`, `BuildHash`), [src/Migrations/](src/Migrations/) + `runOnBuild` in plugin.json, [src/Hooks/](src/Hooks/) (plugin lifecycle events), [src/Wizard/ShopWizard/](src/Wizard/ShopWizard/) (the setup assistant — the largest self-contained subsystem), [src/ShopBuilder/](src/ShopBuilder/), [src/Builders/](src/Builders/), [src/Methods/](src/Methods/) (payment methods).

Note "container" means two different things: the `dataProviders` classes in `src/Containers/`, and the ~108 **layout container** extension-point keys other plugins hook into (see Conventions).

## Conventions

- Twig views are referenced as `Ceres::<DotPath>` (dots for separators, no `.twig`) mapping to `resources/views/<SlashPath>.twig`.
- Page templates do **not** extend PageDesign by path — they use `{% extends getPartial('page-design') %}`. The alias is registered on the `IO.init.templates` event in the service provider, so other plugins override the layout by re-pointing the alias rather than editing the file. Same for `head`, `header`, `footer`, `page-metadata`.
- `LayoutContainer.show("Ceres::<Container>")` ([PageDesign/Macros/LayoutContainer.twig](resources/views/PageDesign/Macros/LayoutContainer.twig)) is the extension point other plugins hook into; the ~108 container keys are declared in [plugin.json](plugin.json). Under the hood [src/Helper/LayoutContainer.php:41](src/Helper/LayoutContainer.php#L41) fires the event `<Plugin>.LayoutContainer.<Container>` and collects listener output — so these keys are public API for third-party themes and renaming one is a breaking change.
- **Three registries must stay in sync.** A PHP class alone is never enough: widgets also need [WidgetCollection.php](src/Widgets/WidgetCollection.php); data providers, layout containers and migrations need [plugin.json](plugin.json) (`dataProviders`, `containers`, `runOnBuild`); presets, data-field providers and widget categories need [shopBuilder.json](shopBuilder.json).
- Translations are `.properties` files under `resources/lang/<locale>/<Group>.properties`, referenced as `Ceres::<Group>.<key>`. Coverage is **uneven** — check which files exist before adding keys:
  - `de`, `en`: all seven groups (Config, Homepage, MultilingualismConfig, Page, Template, Widget, Wizard)
  - `fr`, `nl`, `pl`: only Homepage, MultilingualismConfig, Template

  So admin-facing strings (`Config.*`, `Widget.*`, `Wizard.*`) are de/en only, while shop-facing `Template.*` is translated into all five. Only `Template` is pushed to the client (via `Translations.add("Ceres","Template")`); the rest are backend-only.
- `npm run compareTranslations` treats **`de` as the source of truth** and compares key presence only, never values. It is not wired into CI and does **not** currently pass — it reports every `Config`/`Widget`/`Wizard`/`Page` key as missing from fr/nl/pl by design. Read its output selectively; don't try to make it clean.
- ESLint is `google` config with heavy overrides ([.eslintrc.json](.eslintrc.json)): **Allman brace style**, 4-space indent, double quotes, no trailing commas, `object-curly-spacing: always`, min identifier length 2 (except `$`, `i`, `j`, `k`), comments on their own line above code.
- Stylelint is `stylelint-config-twbs-bootstrap` with `border-radius`, `transition` and `calc()` **blacklisted** ([.stylelintrc](.stylelintrc)) — use the project's mixins/variables instead.
- Deprecations are annotated `@deprecated since X. Will be removed in 6.0.0.` rather than deleted — the LTS promise forbids breaking changes in 5.0.x, and this plugin is public API for third-party themes. Preserve this pattern; do not remove deprecated members. Corollary: a `@deprecated` tag does not mean unused — check call sites before migrating off something.
- Classes are suffixed by role: `*Widget`, `*Context`, `*Preset`, `*Config`, `*Container`, `*DataFieldProvider`, `*SettingFactory`, `*Step`, `*Builder`; migrations are `Migration_YYYY_MM_DD_NNN_Description` or `*Migration_0_0_1`.
- Bootstrap 4.4 and jQuery are in play alongside Vue; jQuery is exposed globally via `expose-loader`.

## Contribution workflow

Per [contributionGuide.md](contributionGuide.md) and the [PR template](.github/PULL_REQUEST_TEMPLATE.md):
- PRs target the **`stable`** branch. Branch names: `fix/...` for bug fixes, `feature/...` for features.
- Every user-facing change gets an entry under `## unreleased` in [meta/documents/changelog_en.md](meta/documents/changelog_en.md) (and `changelog_de.md`), under `### Added` / `### Fixed` / `### TODO`. Widget or preset changes normally require a `### TODO` note telling shop owners to hit **Regenerate Content** in ShopBuilder.
- SCSS changes must be accounted for in the separate "plentyShop LTS Modern" theme.
- `plugin.json` `version` and `package.json` `version` are bumped per release (currently 5.0.81 / 5.0.76 — they drift; plugin.json is authoritative for the plugin).
