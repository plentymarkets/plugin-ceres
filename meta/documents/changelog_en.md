# Release Notes for Ceres

## v4.0.2 (2019-06-12) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.0.1...4.0.2" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Under certain circumstances, the My Account area was not correctly displayed in the ShopBuilder due to the faulty generation of the order history widget. This has been fixed.

## v4.0.1 (2019-05-14) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.0.0...4.0.1" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- The "Change email address" button in the My Account area is now hidden if the route "/change-mail" in IO is inactive.
- Contents of the title bar widget that had been created prior to the release of Ceres 4.0.0 were not evaluated correctly by the ShopBuilder. Therefore, the default text was displayed instead. This behaviour has been fixed.

## v4.0.0 (2019-05-02) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.2.2...4.0.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- It is now possible for registered customers to change their email address in the My Account area. To enable this, you need to carry out settings in the **System » System settings » Client » Select client » Email** menu. Create a new template under **Templates**. This template needs to include the variable "$NewCustomerEmail", which contains a confirmation link for the change of the email address. You need to link this template to the **Customer wants to change email address** event under **Automatic**.   
- In order to make it possible for customers to change their email address in the My Account area, you need to activate the route "/change-mail" in the settings of the IO plugin.
- Due to changes made to the address input field "Contact person", default Ceres stores now display the input fields for first and last names for B2B customers. These input fields are not required by default. You can make changes to the address input fields directly in the address selection widget of the ShopBuilder.
- If you use the plentymarkets plugin "Customer feedback", you need to update the plugin to version 2.0.0 in order for it to work properly.

### Added

- Customers are now able to change their email address in the My Account area.
- We added the widget "Cancel order" for the checkout. This serves to cancel a verified order by a payment plugin (e.g. PayPal).
- We created an interface for blocking relevant inputs in the checkout for payment plugins that do not allow changes to this data.
- We added the "Tabs" widget, which is a new structure widget that allows the creation of tabs that can be filled with other widgets.
- Pages can now be identified via a class in the <body> tag.
- The texts of the following widgets can now be edited directly in the ShopBuilder preview via inline editing: Text, image box, item list, title bar, newsletter, shipping profile selection, payment provider selection, address selection, account settings, notes and requests, order history and return history.
- You can now determine which option is preselected in the "Form of address" drop-down list in the registration and address selection. You can carry out the settings in the Ceres configuration or in the settings of the address selection widget.
- "Mx." is now available as an option in the "Form of address" drop-down list in the registration and the address selection. This option serves to provide a form of address for the gender option "Diverse".
- The shipping profile now displays the maximum delivery time. The maximum delivery time is the sum of the availability with the longest delivery time among items in the shopping cart and the period of delivery specified in the shipping profile.
- We added the layout container **Checkout: Override headline**. It serves to overwrite the default headline of the checkout.
- The paddings and margins of all non-grid widgets of the ShopBuilder can now be configured individually in the Widget settings.
- We added the inline editing code widget, which makes it possible to write and edit code directly in the ShopBuilder preview.
- We added the inline editing text widget, which makes it possible to write and edit text directly in the ShopBuilder preview. This widget replaces the former text widget, which has been deprecated and is no longer available in the widget selection of the ShopBuilder.
- You can now specify additional CC and BCC email addresses for the contact form. We would like to thank @lauflust for the contribution.
- The subject for the email sent via the contact form can now be extended in the **CMS » Multilingualism** menu. We would like to thank @lauflust for the contribution.

### Changed

- You can now configure the address field "Contact person" to either display the input field contact person or the input fields for first and last name. The fields can also be configured as required address fields.
- The type specifications of the functions `isActive()`, `isOpen()` and `isCurrent()` in the CategoryService have been adjusted so that they can be also be called from Twig templates.
- The notifications that are issued when errors occur in the validation of address input fields are now reset upon changing the form of address, the country or when switching between address and Packstation/post office.
- Item lists and categories now contain links to individual items that are issued even without active JavaScript.
- The Twig function "queryString" can now process multi-dimensional arrays. We would like to thank @wladi0097 for the contribution.
- Obsolete language-specific settings have been removed from the Ceres configuration for reasons of clarity. With the introduction of the **CMS » Multilingualism** menu, these entries had been relocated to the language files of Ceres and marked as deprecated.
- The syntax for slots has been updated and now uses the `v-slot` directive introduced by Vue.js v2.6.0.
- The link list widget of the ShopBuilder has been marked as deprecated and is no longer available in the widget selection. It has been replaced by the list widget, which assumes the same functionality.
- We have made adjustments to several components in which we now use the json_data filter to relocate larger JSON objects from properties to external <script> tags. This serves to reduce the document size and accelerate the initialisation of Vue.js. Please consult [our developer documentation](https://developers.plentymarkets.com/dev-doc/theme-plugins#ceres-4-update) for a list of adjusted components.

### Fixed

- Due to an error, more pages were returned in the pagination of a category than ElasticSearch could process. The maximum number of items per category has therefore been limited to 10,000.
- Hreflang attributes now use the correct ISO codes for activated languages.
- The bank account widget used the wrong translation keys. This has been fixed.
- Under certain circumstances, widgets in the header would overlap. This behaviour has been fixed.
- Due to an error, the size of the input fields of the registration was too small in the Internet Explorer 11. This has been fixed.
- Due to an error, delivery to a Packstation/post office could be selected for shipping profiles that did not support this option. This has been fixed.
- Due to an error in the layout of the category navigation, the company logo overlapped certain menu entries. This has been fixed.
- The mega menu could not be opened in the mobile view of the Firefox browser. This has been fixed.
- When selecting the option "Image and text (full width)" in the settings of the image box widget, the link was not scaled to the full width of the image. This behaviour has been fixed.
- Under certain circumstances, other elements could overlap error notifications. This has been fixed.
- Due to an error, the preview text of an item was not displayed in the shopping cart if the item text was not filled in. This has been fixed.
- When changing variations, it was possible that variations were displayed as item packages, even if the variation was not configured as such. This behaviour has been fixed.
- Under certain circumstances, input fields were automatically filled in with the email address of the user in Google Chrome. This has been fixed.
- Invalid values are now filtered out when navigating to URLs that include parameters.
- Due to an error, it was no longer possible to delete addresses. This has been fixed.
- Due to an error, the setting for displaying and validating the input field **State** was not always recognised. This has been fixed.
- The post number in the address data for Packstation/post office is now taken from the input field "Post number" instead of the field "Address 3".
- The email that contains the link for resending the customer password now uses the URL of the corresponding client.
- Due to an error, the cross-selling item list in the single item view was not loaded when the page was accessed the first time. This has been fixed.
- Due to an error, the sorting value for the category also affected the sorting of variations of individual items, as long as the option "dynamically" was selected for the setting **Show variations by type**. As of now, the variation with the lowest price is displayed first.
- Under certain circumstances, the footer could overlap content on the right side of the single item view. This has been fixed.
- Due to an error, order characteristics of the type "selection" were not working properly. This has been fixed.

## v3.2.2 (2019-04-10) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.2.1...3.2.2" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- All global data is now loaded per default if no context is explicitly specified.
- Due to an error, several widgets extended beyond the limits of a grid widget. This has been fixed.
- Due to an error, categories were not correctly displayed in the category navigation widget of the ShopBuilder header. This has been fixed.

## v3.2.1 (2019-04-02) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.2.0...3.2.1" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Due to an error, the order history widget could not be displayed for variable users. This has been fixed.

## v3.2.0 (2019-03-25) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.1.3...3.2.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- Order characteristics of the type **Selection** are now supported and the description of the characteristic is displayed in the front end. You should check the **description** of the order characteristic and review whether you want the description to be displayed in the online store.
- In case the markup is displayed incorrectly, you can use the **Regenerate contents** button.


### Added

- The widget "Two column grid" can now be arranged individually for each display size.
- The aspect ratio of images can now be specified in the image carousel widget of the ShopBuilder.
- The aspect ratio of images can now be specified in the image box widget of the ShopBuilder.
- We added the new layout container **Basket.ExtendOverlayButtons**.
- Ceres now considers the visibility of order statuses as specified in the back end.
- Order characteristics of the type **Selection** are now supported.

### Changed

- The address information on the order confirmation page now includes the contact person for B2B company addresses.
- You can now use all ShopBuilder widgets for static pages in the header.
- The following settings have been marked as `deprecated` and have been removed from the section **Checkout and My account** from the Ceres configuration: Number of orders to show per page in the order history, Allow returns in My account, Allow customers to change the payment method. These settings have been relocated to the **Order history** widget of the ShopBuilder.
- It is now required to enter the old password in order to change the password in the MyAccount area.
- The loading of the category tree has been refactored, resulting in a significantly better performance.
- We added notification messages to the Ceres search, which state the number of search results.

### Fixed

- Due to an error, the space between the page body and the header was calculated incorrectly. This has been fixed.
- Item bundles were not displayed correctly if the option **Replace item bundle with base items** was selected. This has been fixed.
- Due to an error, images were not loaded correctly in Internet Explorer 11. This has been fixed.
- Tab spaces in the description of the structured data on the single item view caused errors. This behaviour has been fixed.
- The setting for the number of decimal places is now interpreted correctly again.
- Item properties no longer prevent adding the items to the shopping cart from item lists.
- Empty error messages are no longer displayed.
- The mapping between availabilities configured in the back end and availabilities specified by search engines was not working properly. This behaviour has been fixed.
- Due to an error pertaining to variation properties, the shopping cart was not properly rendered in the checkout. This has been fixed.
- The category option "Visible: After login" is now applicable in Ceres online stores. Categories for which this option is active are only displayed in the navigation after a login. Directly accessing the URL redirects to the login page.
- In the address overlay, it was not possible to enter anything containing an apostrophe. This error has been fixed.

## v3.1.3 (2019-03-20) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.1.2...3.1.3" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- We fixed compatibility issues pertaining to the Internet Explorer browser and the single item view.


## v3.1.2 (2019-03-20) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.1.1...3.1.2" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- The checkout and shopping cart can now correctly display and process items with measurement inputs for length and width.

## v3.1.1 (2019-03-04) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.1.0...3.1.1" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Variations in the image box widget are now displayed correctly. We would like to thank daniel-mannheimer for the contribution.
- Under certain circumstances, it was impossible to move items to the shopping cart. This has been fixed.

## v3.1.0 (2019-02-25) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.0.2...3.1.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- To ensure the secure use of the Google reCAPTCHA in the contact form, you need to save the secret site key you receive from Google in the Ceres configuration.

### Added

- We added a computed property to the SingleItem component so that the variation properties of an item can be read. This makes it possible for themes to access them.
- Variation properties of the type **None** can now be displayed in the shopping cart during the order process.
- The URL picker component can now be used by ShopBuilder widgets. This component serves to define specific link targets, e.g. in image carousels. The URL picker has been added to the image box, the image carousel and the link list.
- The margins and paddings of the separator line widget can now be edited in the widget settings.
- We added a ShopBuilder preset for the checkout. This includes all widgets necessary for the order process and replicates the standard Ceres checkout design in the ShopBuilder.
- The ShopBuilder item list widget has been extended to offer the possibility of filtering items according to their manufacturer.

### Changed

- ShopBuilder content in the category for shipping information is now displayed in the corresponding overlay on item and category pages.
- The settings for linking a category for displaying additional shipping information has been relocated to the global settings of the ShopBuilder.
- We added translations so that the formatting of strikethrough prices can now be configured.
- Prior to the sending of the contact form, the Google reCAPTCHA is verified via the secret site key.

### Fixed

- Due to an error, item-dependent coupons were not removed if the corresponding item was removed from the shopping cart. This has been fixed.
- The URLs in the sidebar navigation are now generated correctly for all languages.
- If certain restrictions inhibit the selection of a shipping profile, a corresponding error notification is now issued in the checkout and the purchase is blocked.
- Due to an error, the same form of address in the address input was displayed for different countries of delivery, even though these had been configured differently. This has been fixed.
- Due to an error, the height of the footer was not calculated correctly on mobile devices. This has been fixed.
- We fixed a display error which caused other elements to overlap with the place order button in the checkout.
- Due to an error, the image box widget was not displayed correctly in the Internet Explorer. This has been fixed.
- Due to an error, the pagination in the MyAccount area was not working properly. This has been fixed.
- The pagination of category pages was not working properly for additional clients. This behaviour has been fixed.
- Due to an error, clicking a link in the mega menu was not working properly on touch devices. This has been fixed.
- Due to an error, loading animations caused the scroll bar to appear. This has been fixed.
- Changes to the minimum and maximum order quantity were not taken into account when the variation was changed in the single item view. This has been fixed.
- The Google ReCAPTCHA request is now reset after sending the contact form so that the contact form can be sent again.
- You can now access categories in the preview mode that are not linked to a client.
- Order properties of the type **decimal number** were not working properly. This has been fixed.
- Due to an error, the name of a category in the category view was positioned too far left. This has been fixed.
- Due to an error, the category image was displayed larger than intended on iOS devices. This has been fixed.
- You can no longer move items without a price to the shopping cart in the admin preview.

## v3.0.2 (2019-02-07) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.0.1...3.0.2" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Sales prices in the category view and the single item view are no longer additionally loaded via ElasticSearch.
- Under specific circumstances the configuration of the minimum and maximum number of items and variations could lead to errors when changes were made to items in the shopping cart. This behaviour has been fixed.

## v3.0.1 (2019-01-24) <a href="https://github.com/plentymarkets/plugin-ceres/compare/3.0.0...3.0.1" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Due to an error, item lists of the types cross-selling and tags were not displayed in the single item view. This has been fixed.
- Category descriptions 1 and 2 were not correctly displayed on category pages. This has been fixed.
- Under certain circumstances, the option "Please select" was not displayed in the drop-down list in the single item view. This has been fixed.

## v3.0.0 (2019-01-21) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.17.1...3.0.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- Due to changes of the markup of ShopBuilder widgets, the ShopBuilder pages must be regenerated after the update. The pages can be regenerated by clicking the button **Regenerate contents** in the toolbar in the menu **CMS » ShopBuilder**.
- The compatibility of themes designed for older ceres versions must be checked and themes might require an update. For further information about updating themes, refer to the <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/reference/ceres-3-update" target="_blank" rel="noopener"><b>manual</b></a>.

### Added

- In the preview mode, you can now access items in the online store that would normally be invisible due to their settings (e.g. no price for the online store).
- We added the FAQ widget for the ShopBuilder. This widget serves to integrate an FAQ page in the online store.
- We added the 4 new layout containers **Basket.BeforeBasketTotals**, **Basket.AfterBasketTotals**, **BasketPreview.BeforeBasketTotals** and **BasketPreview.AfterBasketTotals**.
- Addresses for B2B customers now include a field for a contact person, instead of the fields for first and last name.
- The validity of the checkout URL can now be specified in the Ceres configuration.

### Changed

- The Bootstrap framework has been updated to version 4.2.1. For further information about Boostrap and about updating themes, refer to the <a href="https://knowledge.plentymarkets.com/en/omni-channel/online-store/reference/ceres-3-update" target="_blank" rel="noopener"><b>manual</b></a>.
- Widgets are now grouped in categories in the ShopBuilder.
- The dynamic display of variations now considers the attribute setting **Groupable in item lists**.
- The TopBar widget has been optimised to fit smaller screen resolutions.
- The zoom feature on iOS devices is prevented when tapping into input fields, such as address input fields.
- The texts for an item's age restriction in the single item view have been updated.
- The setting for limiting the last seen items in the respective list has been marked as **deprecated**.
- On mobile devices, the carousel function for item images has been removed when the respective items are displayed in a carousel in the item list.
- The display of buttons in the checkout and the My account area have been reworked for small screen sizes.
- Item lists now display the attributes of a variation in addition to the item name.
- The loading animation **blur** has been removed.
- The way the list and newsletter widgets are displayed have been unified.
- The mega menu has been reworked and is now displayed more consistently on different browsers.
- On smaller devices with a resolution between 768px and 992px a maximum of 3 items will be displayed in a row. Thanks to <a href="https://github.com/lkreimann" target="_blank" rel="noopener"><b>@lkreimann</b></a> for this change.
- Items in the shopping cart, the shopping cart preview and the checkout are now displayed in a uniform fashion when using the Internet Explorer.
- The width of the **New address** button in the checkout now adapts to the length of the text it contains.
- Tags for store specials are now displayed for item packages.
- The display of item information in the shopping cart, the shopping cart preview and the checkout have been optimised.
- The date of birth entered in the checkout is now being validated.

### Fixed

- Due to an error, sorting and filtering items by price was not working correctly. This has been fixed.
- We fixed a display error that affected the list widget in the footer on mobile devices.
- Due to an error, the shopping cart preview was not displayed with the correct height when using the Internet Explorer. This has been fixed.
- The **Please select** option in the attribute selection is now hidden if the main variation is not active.
- In the ShopBuilder live shopping widget, the texts "Days", "Hours", "Minutes" and "Seconds" were not translated correctly. This has been fixed.
- For shipments to Packstation/post office, the customer number is now displayed in the address.
- Due to an error, the layout container **RegistrationOverlay.ExtendOverlay** was not working properly. This has been fixed.
- Structure widgets weren't displayed correctly in some cases. This has been fixed.
- Links to previous and next category pages are now displayed in the correct way.
- Due to an error, the image box widget of the ShopBuilder was not displayed correctly on mobile devices under certain circumstances. This has been fixed.
- Texts for store specials can now be translated in the **CMS » Multilingualism** menu.
- Due to an error, guest accounts could create addresses without specifying an email address. This has been fixed.
- Due to an error, the filters of a category included categories that were only supposed to appear in the search. This has been fixed.
- Due to an error, the Back-To-Top button wasn't displayed in the footer of the ShopBuilder. This has been fixed.
- The title of ShopBuilder widgets could not contain apostrophes. This has been fixed.
- Due to an error, the currency conversion was not working for the live shopping widget. This has been fixed.
- The discount values were not displayed correctly on the order confirmation page. This has been fixed.

## v2.17.1 (2018-12-03) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.17.0...2.17.1" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Due to an error, main variations linked to an attribute could not be added to the shopping cart. This has been fixed.

## v2.17.0 (2018-11-27) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.16.3...2.17.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- Due to the conversion to the automated email service, you need to transfer the "Forgot password" email template to the **System » Client » Select client » Email » Templates menu**.
- Due to the conversion to the automated email service, you need to delete the event procedure for sending the order confirmation. Otherwise, the email will be sent twice.

### Added

- The configuration of the category description has been adjusted. Both category descriptions 1 and 2 can now be displayed on the category page and can be positioned above or below the item list.
- We added a new layout container to the order confirmation page. The container is displayed below the "Your order is being processed." text.
- In order to place live shopping offers in the ShopBuilder, a new widget has been added.

### Changed

- The Ceres configuration setting "Display the change variation button" has been deprecated.
- Error messages in the frontend are now displayed responsively/on mobile devices with a uniform length.
- Pricing information in structured data is now rounded to two decimal places.
- The position of the layout container "LoginOverlay.ExtendOverlayButtons" has been adjusted, so that the content is now displayed at the expected place again.

### Fixed

- Due to an error, images in the slider widget were displayed in a contorted way when viewed in the Internet Explorer 11. This has been fixed.
- Due to an error, the total sum and the delete button in the shopping cart were cut off when using the Internet Explorer 11. This has been fixed.
- Due to an error, not all languages were shown in the header's language selection. This has been fixed.
- Due to an error, texts in the slider widget weren't fully displayed on small screens. This has been fixed.
- Due to an error, item information was displayed incorrectly in the order confirmation overview when viewing it in Internet Explorer 11. This has been fixed.
- You can now upload .pdf files in the legal information widget of the ShopBuilder.
- Order properties of the type **None** now correctly display the description tooltip.
- If the category navigation has no categories, it is now set to a minimum height.
- The specified value of order properties was not correctly calculated when users changed the variation of an item. This has been fixed.
- If the shopping cart contains items that become unavailable during the session, these items are now removed from the shopping cart.
- Cross-selling items of the type **Bundle** are now displayed correctly.
- The URLs of order properties of the type **file** partially linked to 404 pages. This behaviour has been fixed.
- Errors could occur when attempting to change the page or sorting on a category page that was not listed in the link list. This behaviour has been fixed.
- Due to an error, the height of the header was calculated incorrectly if the logo of the online store was loaded from the cache. This has been fixed.
- In the category view, items with inactive variations now show the "Add to basket" button. This was previously the arrow "Show item".

## v2.16.3 (2018-11-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.16.2...2.16.3" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Changing the currency via the ShopBuilder top bar widget was not possible. This behaviour has been fixed.
- Due to an error, the item search was not working properly on certain Android devices. This has been fixed.

## v2.16.2 (2018-11-07) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.16.1...2.16.2" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Due to an error, it was not possible to scroll through the shopping cart preview in the Mozilla Firefox browser. This has been fixed.
- Due to an error, the content selection in the single item view was displayed even if it was not necessary for the item. This has been fixed.
- Due to an error, the shopping cart button was not greyed out for non-purchasable main variations. This has been fixed.

## v2.16.1 (2018-10-25) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.16.0...2.16.1" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Due to an error in the newsletter widget, the input fields of the newsletter registration were not validated. This has been fixed.
- We fixed an error concerning the variation selection, due to which items with certain attribute combinations could not be purchased.
- Due to an error, clicking on a search result collapsed the input field of the search. This has been fixed.

## v2.16.0 (2018-10-23) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.15.0...2.16.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added

- We added the ShopBuilder newsletter widget in Ceres.
- We added 2 new layout container to the item list in the shopping cart.
- We added a new container with which the image carousel in the single item view can be overwritten.
- The first input field of forms in Ceres is now always focused.
- We added an EventListener via which notifications can be issued in Ceres.
- We added the option "Display in content categories" to the Breadcrumb widget of the ShopBuilder. This option serves to activate or deactivate breadcrumbs on content category pages.
- All Vuex mutations are now realised as JavaScript CustomEvents so that external plugins/themes can react better to changes to the online store.

### Changed

- The shopping cart preview has been revised in order to improve functionality on mobile devices. A new view in landscape format has been added.
- Before the title of a category is refreshed, the element is checked for existence. This serves to prevent potential errors regarding content categories.
- The Ceres login area has been slightly modified in order to conform to the overall design of the Ceres online store.
- If the input fields for number of categories in the navigation widget are empty, their maximum number is now set to standard values. This prevents categories from disappearing from the navigation.
- The file structures for category navigation have been minimised in order to improve loading times.
- Breadcrumbs are now displayed on content category pages, even if these are not included in the navigation.
- We adjusted the way discounts are displayed in the online store.
- We added new JavaScript events via which changes to the browser history, the user registration and the sending of the contact form can be registered. We would like to thank @felixries for the help.
- Changes to the filters, the sorting and the page are included as entries in the browser history. We would like to thank @felixries for the help.
- It is now possible in IO to read the current template during a REST call.

### Fixed

- Due to an error, the search term was not displayed correctly on the search page. This has been fixed.
- Due to an error, the checkbox for accepting data transmission was not displayed for certain shipping profiles. This has been fixed.
- Due to an error, incorrect calls emerged in the context of rich snippets. This behaviour has been fixed. We would like to thank @Lauflust for their help.
- Due to an error, certain content category pages could not be accessed. This has been fixed.
- The login page would sometimes issue console errors. This has been fixed.
- Due to an error, the PayPal PLUS wall was not functioning properly on mobile devices. This has been fixed.
- The background colour of the search icon in the top bar now uses the correct SCSS variable.
- Due to an error, the address input fields **Street** and **Street** number were reset when the country was changed. This has been fixed.
- Due to an error, no items were displayed on the returns page. This has been fixed.
- Due to an error, icons of payment providers were not displayed in the order confirmation. This has been fixed.
- Due to an error, the page title of content pages was not filled in correctly. This has been fixed.
- Due to an error, the description of property groups was not displayed correctly. This has been fixed.
- When navigating through the navigation tree, an obsolete configuration setting was retrieved for the page title, instead of the value from the multilingualism UI. This behaviour has been fixed.
- Accessing the return overview led to issues. This behaviour has been fixed.
- Due to an error, the validation of coupons only issued generic error codes and not specific error codes. This has been fixed.
- We made several SEO-relevant adjustments.
- Due to an error, not all relevant items were included in the **Last seen** item list. This has been fixed.
- Due to an error, the selection of an invoice address was not saved correctly. This has been fixed.
- Due to an error, if an item had multiple order properties of the type text, not all of the values were adopted to the shopping cart. This has been fixed.
- Due to an error, switching between content categories was not working properly on mobile devices. This has been fixed.
- Due to an error, the header obscured parts of the online store. This has been fixed.
- We fixed an error due to which a selection of variations in the single item view was not possible if 2 or more variations consisted of the same combination of attributes or if the variations had to attributes at all. In these cases, the selection is now possible via the content drop-down list.
- Due to an error, the category filters were displayed after switching categories. This has been fixed.
- Due to an error, the value "true" was displayed in the shopping cart after properties that were displayed as checkboxes in the online store. This has been fixed.
- Due to an error, the ShopBuilder widget for displaying legal information prevented scrolling in the Firefox browser. This has been fixed. You need to save the widget again in the ShopBuilder.
- Due to an error pertaining to category images, scrolling in Safari browsers was not working properly. This has been fixed.

## v2.15.0 (2018-09-12) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.14.0...2.15.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### ToDo

- We adjusted the settings of the Shop Builder image carousel in the context of a bugfix. Image carousels created prior to version 2.15 are still working correctly, but can no longer be edited. If you want to make changes to this widget, please create a new image carousel.

### Added

- We added a mapping for translating the standard availabilities of Schema.org to availabilities in plentymarkets. This is located in the SEO tab of the Ceres configuration.
- The following widgets have been added to the Shop Builder: Top bar (Header), Category navigation (Header), Breadcrumb navigation (Header), Legal information (Footer), List, Link list, Dividing line.
- You can now add additional slides to the image carousel of the Shop Builder.
- You can now edit or disable the image titles of slides in the image carousel of the Shop Builder.
- You can now edit the title of the image box of the Shop Builder.
- You can now edit or disable the title of item lists in the Shop Builder.
- We added templates for the header, footer and homepage that can be used for the Shop Builder.

### Changed

- We added events in the checkout which indicate a change in the selected address.
- Error messages on the contact page are now displayed analogously to error messages on other pages.
- Error messages in the checkout have been improved, so that invalid input fields will be highlighted.
- Error messages of address entry forms have been improved, so that invalid input fields will be highlighted.
- You can now set the number of visible items in an item list.

### Fixed

- The login URL stored at the level of the customer now also works in Ceres.
- Due to an error, clicking the wish list button did not always add an item to the wish list. This has been fixed.
- The height of widgets in a Shop Builder structure element with four columns is now correctly calculated.
- The maximum number of items is now considered by the item list of the type "last seen" in the Shop Builder.

## v2.14.0 (2018-08-28) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.13.0...2.14.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added

- Two additional layout containers have been added so that the header and footer of the Shop Builder can be displayed.
- Categories have been added as filter options for search results.
- Item lists and search results can now be sorted randomly.
- A new event hook has been added, which reacts to the building of plugins. This enables the invalidation of the content cache.
- A new checkbox has been added to the address input fields, via which the delivery to a Packstation/post office in Germany can be activated. The input fields adapt to the type of delivery destination if the checkbox is activated.
- A new option has been added to the tab pagination and sorting in the Ceres configuration. This option determines the page number, beginning from which the value **noindex** is set for SEO robots.

### Changed

- The individual entries of item lists now span the entire width of the list.
- The live search in the header and the search page have been synchronised so that they provide the same search results.

### Fixed

- Due to an error, users could not select variations of an item if the name of an attribute exceeded a certain length. This has been fixed.
- Cross-site scripting is now suppressed in the search.
- The quantity input of items in the shopping cart now considers the decimal separator configured in the IO settings.
- The option "Fix the navigation bar at the top of the page" in the header tab is now functioning properly again.
- Due to an error, the login button was shifted outside the displayable area of the screen on mobile devices. This has been fixed.
- Due to an error, it was not possible to change the number of items for items whose name exceeded a certain length. This has been fixed.
- Due to an error, the page did not automatically scroll back to the top after switching categories. This has been fixed.
- An error has been fixed that prevented the display of a conclusive error notification when items for which no stock was available had been moved to the shopping cart.
- Under certain circumstances item bundles led to JavaScript errors. This behaviour has been fixed.
- Orders that included items with live shopping prices led to errors in Callisto stores with an installed Ceres checkout. This behaviour has been fixed.
- The missing title and alt tags have been added in order to improve search engine optimisation.
- An error led to rounding errors for prices. This behaviour has been fixed.

## v2.13.0 (2018-07-30) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.12.0...2.13.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### ToDo

- If item lists are not displayed on the Shop Builder homepage after the upgrade to version 2.13, the Shop Builder homepage has to be saved again.

### Added

- A new layout container has been added underneath the order details on the order confirmation page.

### Changed

- The unit price was not displayed if the number of units was 1. This has ben fixed. The display of the unit price is now exclusively dependent on the setting stored at the variation level.
- The browser now scrolls back to the top of the page whenever the user changes the category.
- The drop-down list for addresses is now limited to a maximum height. This prevents that a large number of addresses makes an address selection impossible.
- Coupons are now distinguished into **gift cards** and **coupons for special offers**. The layout for coupons has been adjusted accordingly.

### Fixed

- The navigation always displayed all categories. This behaviour has been adjusted, so that different navigations can be displayed, depending on different customer classes.
- Due to an error, Ceres online stores were not working properly on Microsoft Edge browsers. This has been fixed.
- An error led to roundoff mistakes in the single item view. This has been fixed.
- Due to an error, item bundles would lead to vue.js issues in the online store under certain circumstances. This has been fixed.
- The error "No 'Access-Control-Allow-Origin' header is present on the requested resource" will not occur anymore.
- Due to an error, the VAT ID on the registration page was validated for non-business customers. This has been fixed.
- If the "Reset password" email was opened via an e-mail client, the link was not recognised as such. This error has been fixed.
- The .twig file of the third item list used several faulty IDs. This error has been fixed.
- The CDN URLs for item images are now loaded client-dependently in the correct manner.
- Due to an error, no items were added to the **last seen** item list, if the list was not also linked to the single item view. This has been fixed.
- Due to an error, certain items were not displayed on the order confirmation page if they were part of an item bundle. This has been fixed.

## v2.12.0 (2018-07-10) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.11.0...2.12.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added

- Item bundles can now be displayed in the online store.
- A new widget, which displays free text and HTML, has been added to the Shop Builder.

### Changed

- User-specific data, such as the shopping cart, login information and wish list, is now loaded later.
- The list of last seen items is now loaded later.

### Fixed

- Various faulty links have been fixed.
- Due to an error, the item ID was not displayed in the shopping cart. This has been fixed.
- Due to an error, the information below items displayed "incl. VAT" instead of "plus VAT". This has been fixed.
- The name of the online store is now loaded correctly from the translations for the shopping cart, content categories, category pages, single item view and item search.
- If a customer had not stored a first name, the header sometimes displayed a wrong message. This has been fixed.
- Due to an error, items with a particular interval could not be edited properly in the shopping cart. This has been fixed.
- The value for the item name is now loaded correctly from the Ceres plugin configuration file.
- The missing colours for item availability values 6-10 have been added.

## v2.11.0 (2018-06-26) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.10.0...2.11.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### ToDo

- If other plugins used the social media library **Shariff** in Ceres, Shariff now needs to be integrated into the respective plugins themselves.

### Changed

- The social media library **Shariff** has been removed from Ceres for reasons of obsolescence.

### Fixed

- The name of the online store in the title bar widget of the Shop Builder is now correctly loaded from the translations in the multilingualism interface.
- The alternative text for the company logo is now correctly loaded from the translations in the multilingualism interface.
- The page title is now correctly loaded from the translations in the multilingualism interface.
- The country code has been removed from the URLs of the standard language. The country code is part of the URL for all other languages.

## v2.10.0 (2018-06-12) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.9.1...2.10.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added

- The Ceres configuration has been translated into German.
- A favicon can now be selected via a file picker in the Ceres configuration. If no favicon is selected there, the favicon stored in the **System » Client » Select client » Online store » Settings** menu is used instead.

### Changed

- The configuration of the company and store logo is now done through a file picker instead of a text field.
- The configuration for the PDF version of the cancellation form is now done through a file picker instead of a text field.
- It is now possible to overwrite the order details in the order history with a theme, because the order history component now receives a second parameter which contains the template for the order details.
- The link to the forum on the "Vue.js could not be initialised" error page is now equipped with a nofollow tag.
- The buttons for adding an address in the checkout have been optimised for mobile view and no longer conceal other elements.
- If a customer account has been blocked, the customer now receives a corresponding notification.
- Net or gross sums are now highlighted on the order confirmation page, depending on the flag of the order.
- Addresses on the order confirmation page now include the country of delivery.

### Fixed

- Due to an error, warning notifications were not displayed. This has been fixed.
- Due to an error, clicking on a link refreshed the current page. This has been fixed.
- Due to an error, the shopping cart overlay displayed a wrong image. This has been fixed.
- If the order property of an item requires a discrete surcharge, the surcharge is now displayed correctly in the single item view.
- Interactions between order properties and regular properties led to an error. This has been fixed.
- Due to an error, the sums in the checkout and the shopping cart did not immediately switch between gross and net sums upon changes. This has been fixed.
- Due to an error, the display of sums in the header did not immediately switch between gross and net sums upon changes. This has been fixed.

## v2.9.1 (2018-06-05) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.9.0...2.9.1" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Due to an error, plugins with external checkout were no longer able to place orders. This has been fixed.
- Due to an error, single-digit decimal places of prices were returned as double-digit decimal places. This has been fixed.

## v2.9.0 (2018-05-24) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.8.1...2.9.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added

- The event "afterBasketItemAdded" has been added, which is triggered whenever a new item has been added to the shopping cart.
- A checkbox has been added, via which users can consent that their data is transmitted to shipping service providers.

### Changed

- Language-dependent configuration values have been removed from the Ceres configuration. They are now stored as .properties files and can be edited via the multilingualism interface.
- The display of gross and net prices now ensures that the price is displayed in bold font.
- The selection of the country of delivery is now deactivated if the online store user has already saved an address. In this case, a tooltip suggests the user to change their address.
- **Name** is no longer a mandatory field for the contact form.

### Fixed

- Adjustments have been made in order to prevent cross-site scripting.
- Due to an error, trailing slashes were not working properly for the breadcrumb navigation and the language selection. This has been fixed.
- Due to an error, the title of the item list was not displayed in the single item view. This has been fixed.
- Due to an error, the buttons for deleting and editing bank details were not properly displayed. This has been fixed.
- Due to an error, pressing "enter" to select a suggested item did not open the single item view. This has been fixed.

## v2.8.1 (2018-05-16) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.8.0...2.8.1" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Due to an error, the settings of the Shop Builder image carousel widget were not working properly. This has been fixed.
- Due to an error, the link to the cancellation rights was not clickable in the checkout. This has been fixed.

## v2.8.0 (2018-05-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.7.0...2.8.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### ToDo

- Plugins and themes that utilise language-dependent texts from the Ceres .properties files may need to be modified. Please refer to the following thread for further information: https://forum.plentymarkets.com/t/ankuendigung-anpassung-der-properties-dateien-in-ceres/340077
- If item sorting according to price has been activated, it needs to be selected and saved again in the "Pagination and sorting » Enable item sorting by" option of the Ceres configuration.

### Added

- The elements of the homepage have been outsourced as editable elements for the Shop Builder.
- A container for overwriting search filters has been added.
- The facet type **price** has been added.
- The option to include trailing slashes is now considered when generating URLs.

### Changed

- The configuration of the homepage has been outsourced to the Shop Builder.
- External URLs are now accessed via the rel="noopener" attribute.
- Ceres now reacts to the event "afterPaymentMethodChange" and reloads the shopping cart data after changing the payment method.
- The meta title is now used as the title of a category. If no meta title has been saved, the name of the category is used instead.
- The language-dependent texts of Ceres have been reorganised and renamed in order to conform to the multilingualism functionality.
- The item sorting according to price is now based on the average price of a variation instead of its minimum/maximum price.

### Fixed

- Due to an error the fast switching between categories led to problems in the Firefox browser. This has been fixed.
- Due to an error, changing the payment method immediately triggered the event "afterPaymentMethodChanged". The event is now only triggered after a successful server response.
- Due to an error, changing the shipping profile immediately triggered the event "afterShippingProfileChanged". The event is now only triggered after a successful server response.
- Due to an error, properties that had not been created as order properties were displayed as order properties in the item view. This has been fixed.
- Due to an error, data from the Ceres GlobalContext could not be loaded if accessed via a route of another plugin. This has been fixed.
- When using Ceres and IO as a client that is not the main client, category details of the main client were loaded under certain circumstances. This has been fixed.
- Due to an error, the side navigation and the breadcrumbs were not working properly on touch devices. This has been fixed.
- Due to an error, the linked shipping cost category was not displayed in the item overview. This has been fixed.
- Various CSS errors for the image carousel have been fixed.
- The browser history is now working properly when navigating between categories.

## v2.7.0 (2018-04-13) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.6.0...2.7.0" target="_blank"><b>Overview of all changes</b></a>

### Added

- For items without image, the preconfigured placeholder image is now displayed in the online store.
- The tab "design" and its corresponding settings have been added to the Ceres configuration.
- Order properties of the type file can now be processed.
- The contact page can now display a checkbox with which users confirm that they have read the privacy policy.
- A new value has been added to the configuration, through which the checkbox for confirming the privacy policy can be activated or deactivated.
- The contact page now displays an error notification if a user attempts to submit the form without filling in all mandatory fields.

### Changed

- Images in the item description now act responsively and conform to the layout of the page.
- The notification "Vue.js could not be initialised" is now displayed as a span element instead of an h1 heading.
- The selection for states and federal states now displays "Please select" as the default value.
- The customer's contact data in the system is now synchronised with the first invoice address.
- A text has been added to the contact page that informs the user that fields flagged with "*" are mandatory fields.
- The visual layout of the contact page has been redesigned in order to conform to that of all other pages.

### Fixed

- Due to an error the buttons of the quantity input of the single item view did not adjust the item number if the order interval of the item was 0. This has been fixed.
- Due to an error the configuration for the positioning of the pagination was not working properly. This has been fixed.
- The current payment method was not initially displayed in the overlay of the order confirmation. This has been fixed.
- Due to an error the navigation on touch devices wasn't working properly if it included no subcategories. This has been fixed.
- Due to an error the salutation was not saved correctly. This has been fixed.
- Under particular circumstances certain script and style tags were rendered more than once. This has been fixed.
- Due to an error meta-information pertaining to store specials was displayed incorrectly in the single item view. This has been fixed.
- Due to an error the price information was not formatted correctly in several languages. This has been fixed.
- A redundant conversion into the .json format led to a faulty display of German *umlauts* in the meta information of content categories. This has been fixed.
- If a user deletes or edits an address, the address selected by the server is now displayed as the selected address in the user interface.
- The contact data stored in the system now includes the date of birth provided in the first invoice address.

## v2.6.0 (2018-04-03) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.5.2...2.6.0" target="_blank"><b>Overview of all changes</b></a>

### Added

- IO is now able to react to the generation of the sitemap and can provide its own patterns for the creation of URLs.

### Changed

- The shopping cart now displays the surcharge of order properties via the preposition "incl.".
- The quantity input now considers the interval order quantity of an item.
- The plugin configuration is now delivered generically to JavaScript and is available as a global object.
- Decimal quantities of items can now be purchased.
- The check box for the terms and conditions, cancellation rights and privacy policy have been moved to the left side of the checkout. Thereby, the purchase button is now located directly under the total price.
- The preview text of an item in the single item view can now support HTML elements.
- The value "Please select" can now always be selected in the attribute selection of the variation in the single item view. This prevents that the selection of one attribute blocks other selections from the dropdown list. This also enables users to select main variation, as long as the main variation is active and not linked to an attribute.
- The surcharge of order properties is now included in the item's total price in the shopping cart.

### Fixed

- Under certain circumstances the button for changing payment methods was not displayed on the order confirmation page. This has been fixed.
- Due to an error a purchase via Paypal redirected to a 404 page instead of the order confirmation page. This has been fixed.
- The shopping cart now considers the position of item images and displays the image with the lowest position number.
- The item view of items with a specified order property used to display the surcharge of the property. Now, the item is checked for separate surcharges that can be configured for the item. If such a surcharge is configured, this surcharge is displayed instead.

## v2.5.2 (2018-03-26) <a href="https://github.com/plentymarkets/plugin-ceres/compare/2.5.1...2.5.2" target="_blank"><b>Overview of all changes</b></a>

### Fixed

- Due to an error the interface continued to display deleted delivery addresses. This has been fixed.
- Due to an error clicking the navigation arrows of an image slider in the category view redirected to the item. This has been fixed.
- Due to an error additional content of payment plugins was not displayed correctly in the checkout. This has been fixed.

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
