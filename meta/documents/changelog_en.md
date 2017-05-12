# Release Notes for Ceres

## v1.2.2 (2017-05-11)

### Added

- Item images are sorted by the position. The [position of the image](https://www.plentymarkets.co.uk/manual/item/managing-items/#14-8) can be set in the plentymarkets back end. 

### Fixed

- In some systems, the grouping settings for main and child variations were ignored. This error was fixed.
- An error regarding the breadcrumbs occurred in the browser console. This error was fixed.
- In some cases, notifications and messages weren't displayed correctly. This error was fixed.
- The images in the shopping cart preview are now displayed correctly.
- Suggested search results created by the auto-complete feature are now taking into account the grouping of variations.

### Known issues

- Due to a sporadically occurring error, addresses cannot be edited at the moment.
- The federal state (German: Bundesland) is not saved correctly for the address.
- No shipping country is selected by default. When creating an address, input fields will only be displayed after selecting a shipping country.


## v1.2.1 (2017-05-08)

### Added

- A new template container has been added allowing you to override the complete CSS of Ceres (Template: Override style).


### Changed

- The top navigation bar has been reworked to improve performance and SEO.
- The side navigation bar has been reworked to improve performance and SEO.
- The breadcrumbs have been reworked to improve performance and SEO.
- The categories have been further optimised for search engines now containing valid information about the pagination.

### Fixed

- The store company logo is clickable again.
- The order and payment statuses are displayed correctly in the order summary.
- The list of filters is displayed correctly.
- Categories are displayed correctly in the default order.
- The navigation bar is displayed correctly for categories with only one sub-category.

## v1.2.0 (2017-04-28)

### Added

- Breadcrumbs added in the single item view.
- Microdata scheme added.
- OG tags added for Social Media, IMessage etc.
- Alternative texts added for images.

### Fixed

- Item availabilities will be displayed correctly after changing the variation.
- Contents displayed on static pages will not be larger than the actual page.
- Item names are displayed again in the shopping cart.
- Filter names are displayed again.
- The auto-complete feature in the search has been fixed.
- Registrations with an email address for which an account already exists are no longer possible.

## v1.1.3 (2017-04-25)

### Fixed

- Item availabilities fixed.

## v1.1.3 (2017-04-25)

### Fixed

- Item availabilities fixed.

## v1.1.2 (2017-04-24)

### Added

- A back-to-top button was added.
- A list for **last seen items** was added and can be displayed in the online store by linking the list with a template container.
- In the settings in the **Item view** tab, **Show variations by type** allows you to only display the sub-variations of a main variation.

### Fixed

- For every client (store), the categories will be displayed properly.
- In the mobile view, categories will also be displayed correctly in the left navigation bar.
- The settings for the image carousel of the category view will now be correctly read.
- An error occurred when loading categories in different languages. This error was fixed.
- Item data will now also be loaded in different languages.
- The **technical details** of an item will be loaded correctly.
- The item name (name 1 to 3) selected in the settings will now be used correctly.
- In the item URL, the category will now also be displayed correctly.
- A bug was fixed on the shopping cart page that resulted in items not being displayed.
- The styling of the **Change password** page was updated to fit the style of Ceres.
- A bug was fixed that resulted in the header of the online store being bigger than usually.
- An error occurred when using the setting **Grouping items by main variation**. This has been fixed.
- Smaller performance issues were fixed.

## v1.1.1 (2017-04-13)

### Fixed

- The `AfterBasketChanged` event is no longer triggered when loading a page. 
- The `AfterBasketChanged` event will only be triggered once when the shopping cart is updated.

## v1.1.0 (2017-04-12)

### Added

- The main category in the navigation bar will now forward to the respective category view.
- A category tree has been added. This tree can be displayed in the online store optionally. The setting can be found in the configuration in the **Header** tab.
- Multiple loading animations have been added for the category view. The setting can be found in the configuration in the **Item view** tab.

### Changed

- The performance of the categories has been improved.
- The styling of the categories has been updated.
- The categories will now be reloaded in the category view without reloading the entire page.
- The pagination has been updated. In the settings in the **Pagination and sorting** tab, you can now select the rows and columns of the category view. The pagination values will be calculated and displayed automatically. 

## v1.0.5 (2017-04-07)

### Added

- Added different sources for the company logo.

## v1.0.4 (2017-04-06)

### Added

- Loading of files from CloudFront in **Productive** mode.
- No caching of files in **stage** mode. For further information, refer to our [forum](https://forum.plentymarkets.com/t/ladezeiten-verbessert-und-workflow-optimiert/48990).

### Fixed

- Company logo path fixed.

## v1.0.3 (2017-03-24)

### Added

- Filters in the search and in the category view
- Template container **Script.Loader**, to load events and JS
- Old Google rankings will be preserved by mapping of existing Callisto 3.5 URLs to the new **Ceres** URL structure (Canonical Tags)

### Changed

- New Image Carousel for category view (configurable)
- New Image Carousel for single item view

### Fixed

- The **AddToBasketOverlay** overlay now displays the correct preview images for variations
- The correct preview images for variations are now displayed in the shopping cart and shopping cart preview
- When adding an item to the shopping cart, the correct data will be sent after switching from the category view to the single item view
- Cross selling links saved for an item won't cause an internal error anymore
- An error in the template containers of the order overview has been fixed

## v1.0.2 (2017-02-23)

### Fixed

- Fixed an error that no pictures were visible in a category

## v1.0.1 (2017-02-22)

### Changed

- Changed route to default homepage in `HomepageContent.json`.
- The order history will be hidden, if no orders exist.

### Fixed

- Fixed an error that occurred when activating additional store languages. When [adding](https://developers.plentymarkets.com/dev-doc/template-plugins#design-lang) new language files to the `resources/lang` folder and compliling the files with [Gulp](https://developers.plentymarkets.com/dev-doc/template-plugins#gulp-ceres), the template will be displayed in the selected language.

## v1.0.0 (2017-02-20)

### Features
- use of state-of-the-art web technologies
- modern design
- extremely fast
- integration of elasticSearch
- ongoing development
- easily extendable with plugins
- configurable
