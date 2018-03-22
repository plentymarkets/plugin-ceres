# Release Notes for Ceres

## v2.5.1 (2018-03-21) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.5.0...2.5.1" target="_blank"><b>Overview of all changes</b></a>

### Fixed

- Due to an error an ElasticSearch request returned all item data. This has been fixed.
- The mobile navigation is now working properly on all touch devices.
- Due to an error the online store was not loaded properly when it was accessed via an app like Facebook or Instagram. This has been fixed.

## v2.5.0 (2018-03-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.4.0...2.5.0" target="_blank"><b>Overview of all changes</b></a>

### Added

- Context classes, which provide data to related Twig templates, have been added.
- Ceres is now able to react to all types of notification codes that are sent by the server. It could previously only intercept error message codes.

### Changed

- Redundant styl instructions have been removed from the wish list.
- If a user removes all items from the shopping cart during checkout, they are now redirected to the shopping cart view.
- The font colour of the variation selection has been darkened. This will ensure a better readability for deactivated values in drop-down lists in the Firefox browser.
- The non-mobile store navigation has been optimised for touch devices.

### Fixed

- Due to an error the tooltip for the wish list was not translated correctly. This has been fixed.
- Due to an error multiple HTML elements were assigned the same ID. This has been fixed.
- Due to an error the wrong number of available images was displayed in the image preview of the item view. This has been fixed.
- Due to an error the contact form was not displayed correctly if the postal code had not been entered in the master data. This has been fixed.
- If the description tab had been deactivated in the single item view, the next available tab would not be selected automatically. This has been fixed.
- Due to an error the item view was empty if the item data did not contain availability information. This has been fixed.
- The hierarchy of deadlines has been optimised for the category page.
- The URL of the company logo in the footer will now be ignored by search engines.
- Values of order properties that exceeded a certain size were incorrectly displayed beyond the borders. This has been fixed.
- Deactivated tooltips no longer lead to the displaying of HTML titles.
- The languages view and countries of delivery view have been slightly adjusted in order to ensure complete functionality, even when a large number of languages or countries of delivery are active.

## v2.4.0 (2018-03-06) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.3.2...2.4.0" target="_blank"><b>Overview of all changes</b></a>

### Added

- Plugin configurations have been outsourced to corresponding helper classes.
- A configuration option has been added through which item suggestions can redirect directly to the item.
- In order to improve performance, multiple calls of a function are cached.
- The shopping cart has been completely redesigned. Bugs from the older version, such as overlapping text that damaged the layout of the content, have been fixed.

### Changed

- The items in the shopping cart are now refreshed asynchronously after the shop has been loaded. This leads to quicker loading times of the website.
- The information texts for safe passwords in the registration have been updated.
- The currency selection has been updated in order to prevent search engines from crawling the same page multiple times.


### Fixed

- Due to an error the layout for entering the address did not conform to the selected country when editing addresses. This has been fixed.
- Due to an error changing the currency overwrote existent URL parameters. This has been fixed.
- If the input fields of the checkout have been validated and a blank field has been marked in red, the red marking remained even after a successful input. This has been fixed.
- The company field was not displayed properly if company was selected from the menu in the address information. This has been fixed.

## v2.3.2 (2018-02-28) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.3.1...2.3.2" target="_blank"><b>Overview of all changes</b></a>

### Added

- User guide chapter on EHI certification.

### Fixed

- The subject of the "Forgot password" email is now loaded from the Ceres language files.
- Due to an error, wrong categories were opened via the mobile navigation bar. This has been fixed.
- If a category wasn't displayed in the navigation bar, elements such as pagination, items per page and sorting didn't work properly. This has been fixed.
- Order property values are now reset if the user selects a different variation of the item. If this variation had been selected previously, the previous value of the order property is loaded.
- Due to an error, clicking on buttons of the image carousel in the category view linked directly to the item. This has been fixed.

## v2.3.1 (2018-02-26) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.3.0...2.3.1" target="_blank"><b>Overview of all changes</b></a>

### Fixed

- Coupon discounts are now displayed on the order confirmation page and in the order details in the MyAccount section.
- After the creation of a return, the return confirmation page will now be displayed again. (The route in IO config has to be active.)
- The page for the creation of returns now only displays items that can be returned. (No shipping costs, coupon positions, etc.)
- Due to an error country names were always displayed in English. This has been fixed.
- Due to an error changing languages linked to wrong URLs. This has been fixed.
- Due to an error no icons were available for the languages Danish and Norwegian. This has been fixed.
- The Last seen list no longer displays random items if no item has been previously viewed in the store.

## v2.3.0 (2018-02-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.2.2...2.3.0" target="_blank"><b>Overview of all changes</b></a>

### Added

- Explanatory texts for registration and intended use have been added (EHI).
- A container has been added to the OrderConfirmation page so that shipping-plugins are now able to display additional content.
- The setting Name of an item to display has been added to the Item view tab. This value determines whether the item name, the variation name (if available) or a combination of the two names are displayed in the online store. For further information, refer to <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#90" target="_blank">Customising the item view</a>.
- Categories of the Content type can now be displayed in the navigation bar. For this purpose the setting Type of categories rendered in the navigation has been added to the Header tab in the Ceres configuration. For further information, refer to <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#70" target="_blank">Customising the header and footer</a>.

### Fixed

- Due to an error, items that were not displayed on the category page could not be moved to the shopping cart. This has been fixed.
- Due to an error, there were attempts to place an order even if the shopping cart was empty. This has been fixed.

## v2.2.2 (2018-02-12) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.2.1...2.2.2" target="_blank"><b>Overview of all changes</b></a>

### Fixed

- Due to an error, the item view occasionally displayed a 404 page if the URL was entered without Variation ID. This has been fixed by taking the configuration value **Show variations by type** into account in the item view as well.
- Due to an error, item lists that contained items with multiple images weren't displayed correctly. This has been fixed.
- Due to an error, plugins were unable to create tabs in the item view. This has been fixed.

## v2.2.1 (2018-02-07) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.2.0...2.2.1" target="_blank"><b>Overview of all changes</b></a>

### Changed

- The sorting order of search results has been improved.
- The settings for the Google reCAPTCHA have been moved from the **System » Client » Select client » Online store » Settings** menu to the **Global** tab of the Ceres configuration.
- The settings for the active languages of the online store have been moved from the **System » Client » Select client » Online store » Multilingual** menu to the **Languages** tab of the Ceres configuration.

## v2.2.0 (2018-02-05) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.1.5...2.2.0" target="_blank"><b>Overview of all changes</b></a>

### Added

- A service class has been implemented that enables translations via JavaScript, similar to the handling of translations with Laravel on the server side.
- Texts in different languages will now be loaded directly from the server. It is no longer necessary to compile language-dependent JavaScript files on your local machine.
- A cancellation form has been added. You can either create a cancellation form by saving the legal information in the back end or specify a PDF document for downloading in the Footer tab of the Ceres config. For further information, refer to [Saving legal information](https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#300).

### Changed

- When selecting **Company** in the **Salutation** field in the address input form, the **VAT ID** field will be displayed.
- The button in the contact form now has the same loading animation as all the other buttons in the online store.
- The performance of the **My account** area has been improved.
- The elements in the **Checkout** have been re-arranged into 2 separate columns in order to fulfill certain legal requirements.
- In the checkout the input field for customer wishes and notes has been moved to the left side below the area for selecting a payment method.
- In the checkout the checkbox for accepting the legal information and the Order now button have been moved below the shopping cart sums.

### Fixed

- Due to an error the relevance of an item wasn't correctly taken into account when searching for items and sorting items by relevance. This has been fixed.
- Due to an error the **Company** field wasn't displayed correctly on the registration page when selecting **Company** in the **Salutation** drop-down menu. This has been fixed.
- Due to an error categories that were missing a translation were displayed in the navigation bar and in the breadcrumbs but with no content. This has been fixed.
- Due to an error categories that were missing a translation could be opened by hovering over in the mega menu. This has been fixed.
- Due to an error the pagination in the order history didn't work properly. This has been fixed.


## v2.1.5 (2018-02-02) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.1.4...2.1.5" target="_blank"><b>Overview of all changes</b></a>

### Fixed

- Due to an error the pagination wasn't displayed correctly when using the setting **Show varations by type: Dynamically**. This has been fixed.
- Due to an error the links in the footer of the online store weren't clickable. This has been fixed.
- Due to missing JavaScript features using the Internet Explorer was limited. This has been fixed.
- Due to a different behaviour of the browser Internet Explorer compared to other browsers it was not possible to save the shipping country for an address. Furthermore, there has been a problem when selecting Company from the Salutation drop-down. This has been fixed.

## v2.1.4 (2018-01-29) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.1.3...2.1.4" target="_blank"><b>Overview of all changes</b></a>

### Fixed

- Due to an error the mega menu wasn't displayed correctly in Firefox. This has been fixed.

## v2.1.3 (2018-01-23) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.1.2...2.1.3" target="_blank"><b>Overview of all changes</b></a>

### Changed

- The sorting value **Item position** in the **Item view** tab has been removed from the recommended sorting. Sorting by position can now be configured using the position of the variation.

### Fixed

- Due to an error the wish list wasn't initialised correctly. This has been fixed.

## v2.1.2 (2018-01-22) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.1.1...2.1.2" target="_blank"><b>Overview of all changes</b></a>

### Changed

- The setting **Combine variations** in the **Item view** tab of the configuration has been renamed to **Dynamically**.

### Fixed

- The shipping costs in the shipping method selection of the checkout will now be updated correctly.
- The estimated shipping date in the **Order overview** will not be displayed when there is no estimated shipping date in the order data.
- Due to an error the back-to-top button has been reloaded repeatedly. This has been fixed.
- Due to an error the item view hasn't been displayed correctly when certain item information was missing. This has been fixed.

## v2.1.1 (2018-01-09) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.1.0...2.1.1" target="_blank"><b>Overview of all changes</b></a>

### Fixed

- Due to an error, item URLs haven't been generated correctly without a defined URL path. This has been fixed.

## v2.1.0 (2018-01-04) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.0.3...2.1.0" target="_blank"><b>Overview of all changes</b></a>

### Added

- **SEO:** The name of the online store has been added to the homepage as an h1 header.

### Changed

- Addresses that cannot be selected will not be displayed in the drop-down menus of the address components anymore.
- The overlay for deleting addresses has been re-designed to be more up-to-date.
- The alternative texts set in the back end will be used for item images displayed in the shopping cart, on the category view and on the single item view.
- Item lists will display a different number of items depending on the resolution.
- **SEO:** The headers of various pages have been updated and arranged into the correct order.
- The font size of numbers in the filters has been increased in order to be more readable.

### Fixed

- Addresses entered in the checkout will now be validated correctly again.
- Images in item lists will now be loaded correctly as soon as they are visible.
- The items displayed in the slider of the home page will now be displayed correctly.
- Due to an error, filters haven't been rendered correctly. This has been fixed.
- Due to an error, the single item view wasn’t displayed for items for which no item template was set. This has been fixed.

### TODO

- Due to changes in the search logic, facet links must be saved for the client. In the centralised login, go to **System » Client » Select client » Services » Facet links**. Select a facet on the left and click on **Link facet**.


## v2.0.3 (2017-12-21) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.0.2...2.0.3" target="_blank"><b>Overview of all changes</b></a>

### Changed

- Added possibility in the **Checkout**  for payment plugins to deactivate themselves.
- Upon registering with an already existing email, the overly stays upon to better perceive the error message.
- Items and variations can now be displayed dynamically. For further information, refer to <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#90" target="_blank">Customising the item view</a>.

### Fixed

- In the **Wishlist**, images of variations are displayed correctly.
- The button to remove an item from the **Wishlist** is now centered.
- On iOS devices, the cursor does not jump on modals anymore. iOS [Bug report](https://bugs.webkit.org/show_bug.cgi?id=176896).
- Fixed error where the **Shopping cart preview** did not open occasionally after button click.
- Fixed error where the **Shopping cart preview** did not open after putting an item into the shopping cart (if configurated).
- Shipping costs are linked correctly in the single item view (if configurated).
- Fixed error where some pages did not use full height (leading to a white margin at the bottom).
- Styles in Firefox are displayed correctly.

## v2.0.2 (2017-12-13) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.0.1...2.0.2" target="_blank"><b>Overview of all changes</b></a>

### Added

- The opening hours of your store can now be saved in German and English.

### Changed

- The address selection has been updated to be clearer for the customers of your store.

### Fixed

- The mega menu now displays all categories without cutting them off at the bottom.
- Due to an error, the meta data was output in quotation marks. This has been fixed.
- Due to an error, the email address of guest customers wasn't validated. This has been fixed.
- Die to an error, the country wasn't pre-selected correctly on the registration page. This has been fixed.
- Due to an error, the category view could not be displayed when items without an item image were loaded. This has been fixed.
- Due to an error, the search icon didn't use the SCSS variables for colour codes. This has been fixed.

## v2.0.1 (2017-12-06) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.0.0...2.0.1" target="_blank"><b>Overview of all changes</b></a>

### Added

- The Twig template `SingleItemWrapper` has been added. This template allows you to use <a href="https://knowledge.plentymarkets.com/en/item/managing-items#720" target="_blank"><b>item templates</b></a> in Ceres.

### Fixed

- The base prices will now be displayed correctly in the single item view, if the base price is set for the item.
- Due to an error, the item sums have been displayed on the left side in the **Checkout** if the list of items has been longer than the list of payment methods. The sums will now always be displayed on the right.
- Due to an error, the single item view wasn't displayed correctly when no manufacturer was saved for an item. This has been fixed.
- The shopping cart overlay will not add up the timers when adding items to the shopping cart. It can be opened directly after the first click.
- The header is fully responsive again.
- Due to an error, some items weren't displayed in item lists. This has been fixed.

## v2.0.0 (2017-11-30) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.7.2...2.0.0" target="_blank"><b>Overview of all changes</b></a>

### Added

- The version of the JavaScript framework Vue has been updated from Vue1 to Vue2. For further information refer to the <a href="https://forum.plentymarkets.com/t/news-technologie-update-in-ceres-vue2-und-vuex/77116" target="_blank"><b>forum</b></a>.
- The technology VueX has been integrated in the online store.
- The template container `SingleItem.AdditionalContentAfterVAT` has been added for displaying additional content after the **VAT** information in the single item view (Thanks <a href="https://github.com/jalie" target="_blank"><b>@jalie</b></a>).
- The template container `RegistrationOverlay.ExtendOverlayButtons` has been added for displaying additional content in the registration overlay (Thanks <a href="https://github.com/mkreusch" target="_blank"><b>@mkreusch</b></a>).
- A mega menu has been added for the navigation. For further information refer to <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#80" target="_blank"><b>Customising the header and footer</b></a>.
- A default customer class for B2B customers can now be specified in Ceres. For further information refer to <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#45" target="_blank"><b>Carrying out global settings</b></a>.
- Items can now be sorted by stock in the category view using the **Recommended item sorting** option. For further information refer to <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#200" target="_blank"><b>Customising the pagination and sorting</b></a>.
- A customer that ordered as a guest may now change the payment method on the order confirmation page if enabled.
- A customer that ordered as a guest can now pay an order subsequently, e.g. when the payment method changes.
- An error message has been added that will be displayed when an error occurs during adding items to the shopping cart.
- Currency settings can now be carried out in Ceres. For further information refer to <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#203" target="_blank"><b>Carrying out settings for currencies</b></a>.
- Various loading animations on buttons have been added to provide better feedback to customers when something is loaded.
- If an element updates in the shopping cart, a loading animation is displayed.
- When changing addresses in the **My account** area, the input fields will now be disabled until the address data is loaded from the server.
- When changing the payment method or shipping method in the checkout, the related elements will now be disabled until the data is loaded from the server.

### Fixed

- Error messages triggered in the shopping cart preview will now be displayed correctly.
- Various CSS styling issues have been fixed.
- Due to an error, the item conditions hasn't been displayed in the single item view. This has been fixed.
- Due to an error the **My Account** area could not be loaded when loading the orders of a customer.
- Due to an error prices with different VAT rated haven't been displayed correctly. This has been fixed.
- Sums and prices on the page for manually created orders will now be displayed correctly.
- Due to an error the stock check in the shopping cart didn't work properly. This has been fixed.
- It is not possible anymore to perform an empty search.

### Changed

- The buttons for changing the item quantity or for deleting an item in the shopping cart will now be deactivated until the server responded.
- Every overlay has a footer to display the buttons.
- The menu in the header that is displayed after logging in has been re-designed to match the global design of the header.
- The search icon now displays where the search can be closed.
- All menus in the header can now be closed by clicking anywhere in the online store.
- The buttons for adding, editing and deleting addresses have been re-designed to be clearer to the customer.
- A unique icon has been added to all buttons in Ceres in order to make the buttons more understandable.
- A **Back** button has been added in the mobile navigation referring to the parent category.

## v1.7.2 (2017-11-22) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.7.1...1.7.2" target="_blank"><b>Overview of all changes</b></a>

### Added

- Events from plentymarkets or from other plugins can now be processed directly in Ceres.
- Server notifications will now be output directly in Ceres. This way, plugin developers can access the notifications in Ceres in a more convenient way.

### Fixed

- Due to an error, shipping costs weren't displayed correctly on the order detail page and on the order confirmation page. This has been fixed.
- Due to an error, additional item data wasn't displayed in the shopping cart when having more than 10 items in the shopping cart. This has been fixed.

## v1.7.1 (2017-11-17) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.7.0...1.7.1" target="_blank"><b>Overview of all changes</b></a>

### Fixed

- Due to an error, the setting for displaying the unit price of an item has been ignored. This has been fixed.
- Due to an error the manufacturing country hasn't been displayed in the details tab on the single item view even when the related setting has been activated. This has been fixed.
- Due to an error, the the quantity of an item hasn't been displayed in the category view. This has been fixed.
- Due to an error, customers were unable to change the password in the **My account** area. This has been fixed.
- Due to an error, graduated prices were displayed for customer with a certain customer class, even though this price was not set for the customer class. This has been fixed.
- Due to an error, graduated prices for items with a the quantity 1 have been displayed. This has been fixed.

### Changed

- The field **External variation ID** in the details tab on the single item view has been changed to **Variation ID**.

## v1.7.0 (2017-11-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.6.3...1.7.0" target="_blank"><b>Overview of all changes</b></a>

### Added

- Customer classes are now taken into consideration when displaying item data in the online store.

### Fixed

- The variation setting for unite prices **Show unit price** is now taken into account. When deactivating this setting, the unit price is not displayed in the online store.

### Known issues

- No discounts for customer classes are taken into consideration when calulating graduated prices.
- The minimum order quantity set for a customer class is not yet displayed in the single item view.
- Items that are only available for a certain customer class will also be displayed to all customer classes in the variation selection. These items still can only be purchased by the respective customer class.

## v1.6.3 (2017-11-02) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.6.2...1.6.3" target="_blank"><b>Overview of all changes</b></a>

### Fixed

- Order properties will not be displayed twice on the single item view.

## v1.6.2 (2017-10-25) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.6.1...1.6.2" target="_blank"><b>Overview of all changes</b></a>

### Added

- In the return history, only four images per order are loaded initially.
- In the return history, a "Show more" button was added.
- If items with order properties are in the basket, each surcharge is followed by "per item".
- After the customer has filed a return request, they are forwarded to a confirmation page.

### Fixed

- The returns tab in the My account area is deactivated if the customer does not have any returns.

## v1.6.1 (2017-10-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.6.0...1.6.1" target="_blank"><b>Overview of all changes</b></a>

### Add

- Meta descriptions and robots settings for static pages of the online store can now be entered in the **SEO** tab. For further information about this, refer to <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#201" target="_blank"><b>Carrying out settings for search engine optimisation</b></a>.

### Changed

- **Name of your store** and **URL to your company logo** have been moved to the **Global** tab of the configuration.
- The **Allow returns** setting has been added in the **Checkout and My account** tab of the configuration and replaced the old setting for activating returns in the plentymarkets back end.

## 1.6.0 (2017-10-16) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.5.1...1.6.0" target="_blank"><b>Overview of all changes</b></a>

### Added

- Graduated prices are now integrated in Ceres and will be displayed below the order properties in the single item view. For further information about graduated prices, refer to <a href="https://knowledge.plentymarkets.com/en/item/managing-items#870" target="_blank"><b>Managing sales prices</b></a>.

### Changed

- The text of order properties will not be displayed in the shopping cart preview anymore.
- Order properties will now be displayed above the price in the single item view.
- In the single item view, the item price is now calculated considering surcharges for order properties and graduated prices.
- The item price is now calculated considering surcharges for order properties and graduated prices in the **Add to shopping cart** overlay.
- In the order history, the clock icon has been replaced with a text.
- In the return history, the clock icon has been replaced with a text.

## v1.5.1 (2017-10-05) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.5.0...1.5.1" target="_blank"><b>Overview of all changes</b></a>

### Added

- The **Container for customer feedback** container has been added.

### Changed

- Der template container **Single item: Add detail tabs** now contains the current `Item` object.
- Der template container **Single item: Add content to detail tabs** now contains the current `Item` object.

### Fixed

- Surcharges for order properties are now correctly displayed in the shopping cart and shopping cart preview.
- In the **My account** area the note **Payment method cannot be changed** will be hidden as soon as the order was paid.

## v1.5.0 (2017-09-28) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.4.7...1.5.0" target="_blank"><b>Overview of all changes</b></a>

### Added

- It is now possible to return items of an order in the **My account** area. For further information about returns, refer to <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#430" target="_blank"><b>Activating returns</b></a>.

### Fixed

- Due to an error the shipping date on the order confirmation page was incorrect. This has been fixed.
- Due to an error the order overview could not be loaded when an order with an old payment method was saved. This has been fixed.
- Due to a randomly occurring error the checkout could not be opened when ordering as a guest. This has been fixed.
- Due to an error the image gallery in the single item view wasn't displayed correctly when switching the variation of the item. This has been fixed.

## v1.4.7 (2017-09-20) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.4.6...1.4.7" target="_blank"><b>Overview of all changes</b></a>

### Added

- The `afterBasketItemRemoved` event has been added. This event will be triggered after removing an item from the shopping cart.
- The `afterBasketItemQuantityUpdated` event has been added. This event will be triggered after updating the quantity of items in the shopping cart.
- The `afterShippingCountryChanged` event has been added. This event will be triggered after changing the shipping country in the checkout.

### Fixed

- Due to an error the unit price wasn’t displayed correctly. This has been fixed.

## v1.4.6 (2017-09-13) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.4.5...1.4.6" target="_blank"><b>Overview of all changes</b></a>

### Added

- Attributes (e.g. size) are now displayed in the shopping cart.
- Order notes can now be entered in the checkout.
- The description of a category can now be displayed in the category view. Activate the setting <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#90" target="_blank"><b>Show category description in category view</b></a>.
- The search by variation number has been implemented.

## v1.4.5 (2017-09-06)

### Fixed

- Due to an error, the variation selection in the single item view didn't work properly. This has been fixed.
- Due to an error, item data wasn't displayed in the mobile navigation. This has been fixed.
- Due to an error, the number of items wasn't displayed correctly in the shopping cart preview. This has been fixed.

## v1.4.4 (2017-08-30)

### Added

- A feature was implemented so that customers can reset the password in the online store.
- When switching categories the `afterCategoryChanged` event is triggered in Ceres which sends the current category as well as all categories.
- The container `Script.AfterScriptsLoaded` container has been added. Using this container own Vue components can be added, for example and all other frameworks implemented in Ceres can be used.
- When the customer chooses to change the payment method, the current payment method is displayed.
- The customer gets a warning when he wants to switch to a payment method from which he cannot switch back anymore.

### Fixed

- The sorting option by price now works correctly.
- The variation selection dropdown in the single item view now also displays the attributes of the main variation.

### TODO

- The `password-reset` route must be activated in IO in order to use the **Forgot your password?** feature in Ceres.

## v1.4.3 (2017-08-25)

### Fixed

- The title of the search page is now correct when an empty search input is carried out.
- Item list now gives out the picture with the lowest priority.
- Fixed an error in MyAccount with the address select.
- The Script.Loader container was set to his previous position.

### Changed

- Item names in the wish list are shortened after four lines.

## 1.4.2 (2017-08-23)

### Added

- Google maps added to contact form.
- Google maps available in mobile view.
- If the browser has a forward link when registering, it will be opened after successful registration. If not, the user is redirected to the start page.
- If the user registers via pop-up, the page will be reloaded after successful registration.
- A "Send me a copy" checkbox was added to the contact form to enable the customer to receive a copy of their message.
- The ScriptLoader container has been moved to a position where all frameworks used by us are implemented.

### Fixed

- Sorting by newest and oldest items now works correctly.
- MyAccount login does not offer login as guest anymore.
- Fixed wrong header and breadcrumbs in the category view on medium-sized mobile devices.
- Untranslated categories are ignored in the mobile navigation and do not cause JavaScript errors any more.
- Untranslated categories are not displayed in the side navigation.
- When opening an item page, the current category is displayed correctly.
- Fixed error with missing title HTML tag.
- Item names in the basket are displayed in the right size.
- Fixed Javascript errors in older browsers.

## v1.4.1 (2017-08-11)

### Added
- A header was added to the search page.
- An updated password validation was added to the registration.

### Fixed
- No error messages when changing categories if the category image is not displayed.
- Corrected header size of categories when category image is displayed.
- Image size in wish list is scaled correctly.
- The wish list icon was placed next to the basket in the header; the position of the items in the wish list was changed is now left of the icon.
- Modified the item counter in the basket.

## Changed

- The Tab **Registration** has been removed from the Config.
- RegEx for email and password is now predetermined by Ceres.

## v1.4.0 (2017-08-09)

### Added

- The shopping cart information to be displayed in the header can now be specified. It is possible to display the value of items, the quantity of items or the value and quantity of items in the header. For further information, refer to the <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#80" target="_blank">manual</a>.
- A custom favicon can be uploaded for the online store. For further information about uploading a favicon, refer to the <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#350" target="_blank">manual</a>.
- Every page now has a dynamically generated page title.
- The stock of items is now taken into consideration in the online store.
- The setting **Invisible: in item list** in the **Settings** tab of a variation is now taken into consideration in the online store.
- Variations without stock can now be activated for the variation drop-down menu. For further information, refer to the <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#90" target="_blank">manual</a>.
- A wish list has been added. **Note:** In order to display the wish list in the online store, the route `/wish-list` must be activated in the **Routing** tab in the configuration of **IO**.
- A contact page and the contact form has been added. **Note:** In order to display the contact page in the online store, the route `/contact` must be activated in the **Routing** tab in the configuration of **IO**. For further information about setting up the contact page, refer to the <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#370" target="_blank">manual</a>.
- Error messages sent by the server are now displayed correctly in the front-end.
- The link in the order confirmation email now forwards to the order confirmation page of Ceres.
- A category image can now be displayed in the category view. For further information, refer to the <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/setting-up-ceres#100" target="_blank">manual</a>.

## Changed

- The size of headlines on all pages of the online store has been increased.
- The headlines of item lists have been changed from `h1` to a `p` element.
- The mobile navigation has been refactored and displays up to 6 sub-categories.

### Fixed

- Image positions are now also taken into consideration in item lists.
- The language selection in the header of the online store displays languages again.
- Categories of the **Item** type have been displayed in the online store even if no item was linked with this category. This has been fixed.
- If the quantity of an item added to the shopping cart exceeded the stock of the item, a `Bad Params` error message was shown. His has been fixed.

### Removed

- The `Mobile-Breadcrumbs` component has been removed, because the new mobile navigation contains its own breadcrumbs.

## v1.3.2 (2017-07-26)

### Added

- The **Phone number** field has been added to the address forms of the delivery countries DE and UK.

### Changed

- The design for the list of shipping methods in the checkout was updated.

### Fixed

- The quantity input in the single item view, the shopping cart preview and the shopping cart now takes  into account the minimum order quantity and the maximum order quantity of an item.
- The item images on the order confirmation page are now displayed correctly.

## v1.3.1 (2017-07-24)

### Added

- The custom event `onVariationChanged` has been added.
- Order properties of the **Text** type can now be linked with items. These order properties will be displayed in the single item view (Note: Only order properties of the type **Text** are available in the **Ceres** online store at the moment. Furthermore, organising order properties in property groups is not yet possible). For further information about setting up order properties, refer to our <a href="https://forum.plentymarkets.com/t/howto-bestellmerkmale-in-ceres-einrichten/63155" target="_blank">forum</a>.
- When creating/editing addresses, the text fields will be marked red if the server returns an error. Also, instead of a generic "Validation errors", the specific error message is shown.

### Fixed

- When linking categories in the footer, the content of these categories will now be displayed depending on the respective language.
- The email address of a logged-in customer will be displayed in the **My account** area.

## v1.3.0 (2017-07-13)

### Added

- Item lists provided by Ceres are now loaded dynamically and each list can be set independently.
- Items can now be displayed in item lists with the help of tags.
- Cross-selling items can now be displayed in item lists (only available in the single item view).
- The **Title** field has been added to the address forms of the delivery countries DE and UK.
- Caching has been implemented for the side navigation and the top navigation.
- It is now possible to change the pattern of item URLs to match the pattern of the old online store (e.g. Callisto 3.5). To do so, activate the **Enable Callisto route pattern for items** setting in the **Global** tab of the Ceres configuration.

### Changed

- The design of the **Add to shopping cart** button in the category view has been changed.
- The online store search will now use the **AND** operator. This replaces the **OR** search that was previously used.
- The search icon in the header will now switch to an **X** when clicking the search to help the customer with closing the current search.
- The mobile navigation has been refactored. Using the mobile navigation is now easier than before due to a larger button for opening sub-categories.
- The address field 2 is now a default field of the address form of the delivery country UK.
- The first address in the address list will now be displayed by default in the checkout.
- The delivery country will now be set automatically based on the delivery address in the checkout.
- On the checkout page, the delivery country cannot be changed in the header menu anymore.
- The category view has been refactored for mobile devices.

### Fixed

- Only those item images activated for a client will be displayed in the respective online store.
- The side navigation now displays the categories on every level again.
- When changing the delivery country in the checkout, the first allowed payment method will now be selected automatically.
- The name of an item displayed in the category view or an item list is not "cut off" after 35 characters and now wrapped.

## v1.2.10 (2017-07-05)

### Added

- It is now possible to set up complex item sorting for the category view and the search by using the recommended sorting options. Up to three sorting values can be concatenated in th **Pagination and Sorting** tab of the Ceres configuration. With the sorting option **Recommended** enabled, recommended sorting will be displayed in the online store.
- The design of the list of payment methods displayed in the checkout and in the overlay when changing a payment method in the **My Account** area has been updated. An external link can now be displayed by a payment plugin.
- The template container `ExtendOverlayButtons` has been added to the shopping cart overlay.
- The template container `AdditionalContentAfterButtons` has been added to the login page.
- The template container `ExtendOverlayButtons` has been added to the overlay of the login page.

### Changed

- Instead of the **Description 1** tab, the content of the **Template** tab of a category is now used for displaying shipping information in a modal in the online store. Due to this change Twig code can also be rendered.
- Prices and units are only displayed once in the single item view and updated dynamically.

### Fixed

- Due to an error the **House No.** field was not auto-filled (Auto-fill support of the browser required) correctly in the German address form. This has been fixed.
- An error occurred when calculating discounts. This has been fixed.
- Due to a formatting error in the image carousel for preview images, the right border was not visible. This has been fixed.

## v1.2.9 (2017-06-30)

### Changed

- The design of the list of payment methods in the checkout has been changed. A payment method can now also display a short description.

## v1.2.8 (2017-06-29)

### Added

- A payment method can be changed subsequently for an order in the **My account** area if this feature is enabled in the payment method.
- The image carousel can now be enabled for the category view.
- The `CategoryItem.SideNavBarBottom` template container has been added. This container allows you to add content below the side navigation bar in the category view.
- The information text "* Incl. VAT excl. Shipping" is now displayed for each item in the category view.
- A modal for displaying the shipping costs has been added. A category can be linked to this modal in the configuration of **Ceres** in the **Global** tab.

### Changed

- The image carousel is now also available for preview images in the single item view.
- All images displayed in the single item view are now scaled to a fixed size.
- Items as well as categories for which no translations are available are no longer displayed on the homepage after the respective language is selected.
- The image carousel in the **Last seen items** list has been removed.
- The image carousel in the category view will only be initialised for items with more than one linked image.
- Variations that are out of stock cannot be added to the shopping cart anymore.
- When selecting a variation that is out of stock the customer will be forwarded to the next variation with stock.

### Fixed

- In the mobile view, the navigation will now close after switching the category.
- Due to an error, a deleted address was not removed from the address list. This has been fixed.
- Only one invoice address and delivery address can be saved in the checkout when ordering as a guest.
- In the single item view, inactive variations or variations that are out of stock will not be displayed.

## v1.2.7 (2017-06-22)

### Added

- The **Company** field is shown in address forms as soon as **Company** is selected in the **Form of address** drop-down.
- If the **Company** field is deactivated in the **Checkout and My account** tab in the config, the option **Company** is not shown in the **Form of address** drop-down.  

### Changed

- Sorting items by price has been improved.
- Various entries have been removed from the sorting options in the config.
- The names of sorting options in the config have been changed. They now equal the names of the sorting options in the online store.

### Fixed

- In the address form, the value **Mr.** is preselected in the form of address field and the value is now displayed in the drop-down.

## v1.2.6 (2017-06-14)

### Changed

- Items and categories for which no translations are available will not be displayed on the homepage when the respective language is selected in the online store.

### Fixed

- The **Show all** button of the first category list on the homepage now references to the correct category.
- Due to an error, the country of delivery in the invoice address form did not change when a different country was selected. This has been fixed.
- The link for the **General terms and conditions** in the checkout now references the correct category.

## v1.2.5 (2017-06-08)

### Added

- The payment method and the payment status are now be displayed in the order history.
- The template container `MyAccount.OrderHistoryPaymentInformation` for displaying additional information in the order history of the **My account** area has been added.

### Changed

- The registration overlay will not close if an error occurs.
- Online store notifications are now activated by default for Ceres.
- Sorting options for the category view have new translation texts.
- Validation will be reset if a user data overlay is opened again.
- Categories for which no translation was saved will not be displayed if the respective language is selected in the online store.

### Fixed

- The order status is displayed again in the order history.
- Due to an error, item images could sometimes not be loaded in the category view. This has been fixed.
- Due to an error validation during creating an address failed. This has been fixed.

## v1.2.4 (2017-06-02)

### Added

- For items with variations displayed in the category view, an arrow button is displayed instead of the "Shopping cart" button that will open the single item view.
- A template container for overriding the complete order confirmation page has been added.
- The "Back-to-top" button can now be displayed on the right at the bottom or in the middle at the bottom of the online store.
- The preview text of an item can now be displayed in the shopping cart.
- A template container was added for displaying additional tabs with description texts and other content next to the item description tab and technical data tab in the single item view.
- The fields of the address form for the delivery country **United Kingdom** can now be displayed and validated individually.
- Instead of displaying an overlay after clicking on **Add to shopping cart** the shopping cart preview can be shown.

### Changed

- The icon of the "Close" button has been changed in the filter view.
- The maximum size of the area for displaying item information in the shopping cart has been increased ("More" button).
- Optional fields of the address forms are not activated by default.
- The external name of a manufacturer is displayed in the online store instead of the internal manufacturer name.
- When a customer opens the checkout page and no address is available for this customer, the address form overlay will automatically open.

### Fixed

- Due to an error the item information were not shown in the shopping cart. This has been fixed.
- Names of sub-categories will be wrapped to the next line if the name of the sub-category is longer than the name of the main category.
- Due to an error the translation of the "More/less" buttons were not shown in the shopping cart. This has been fixed.
- The margin between the main categories in the navigation has been removed.
- The image with the position 0 will be displayed in the item previews on the homepage.

### To do

- In order to display the name of the manufacturer of an item in the online store, a name must be entered in the **External name** field in the **Settings » Item » Manufacturer** menu.

## v1.2.3 (2017-05-19)

### Added

- A customisable homepage was added. This homepage can be set up in the **Homepage** tab of the Ceres config.
- Furthermore, 10 template containers have been added to the homepage allowing you to display your own content. For further information refer to [Containers on the homepage](http://developers.plentymarkets.com/dev-doc/template-containers#container-homepage).
- The address fields of the address forms in the checkout can now be shown or hidden individually as well as validated. These address fields can be set up in the **Checkout and My account** tab of the Ceres config.

### Fixed

- Due to an error, the breadcrumbs/menu points didn't work properly. This has been fixed.
- Due to an error, the sorting of item images didn't work properly if a variation had its own images. This has been fixed.


## v1.2.2 (2017-05-11)

### Added

- Item images are sorted by the position. The [position of the image](https://www.plentymarkets.co.uk/manual/item/managing-items/#14-8) can be set in the plentymarkets back end.

### Fixed

- In some systems, the grouping settings for main and child variations were ignored. This error was fixed.
- An error regarding the breadcrumbs occurred in the browser console. This error was fixed.
- In some cases, notifications and messages weren't displayed correctly. This error was fixed.
- The images in the shopping cart preview are now displayed correctly.
- Suggested search results created by the auto-complete feature are now taking into account the grouping of variations.

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
