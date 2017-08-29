# Release Notes for Ceres

## v1.4.4 (beta)

### Fixed

- Item list now gives out the picture with the lowest priority.
- The title of the search page is now correct when an empty search input is carried out.

### Changed

- Item names in the wish list are shortened after four lines.

## v1.4.3 (2017-08-25)

### Fixed

- Fixed an error in MyAccount with the address select.
- The Script.Loader container was set to his previous position.

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
