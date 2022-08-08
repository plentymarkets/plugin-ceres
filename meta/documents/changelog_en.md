# Release Notes for plentyShop LTS

## v5.0.54 (2022-08-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.53...5.0.54" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- The new route `/contact-mail-api` has been added to the IO plugin. If you are using the plentyShop contact form (either the standard template or via a ShopBuilder content), please make sure that this route is activated in the IO plugin. To check this, open the IO setting in your plugin set. Open the tab **Configuration**. In the setting **Activate routes**, activate the route `/contact-mail-api` and save your changes. If you do *not* use a plentyShop contact form, please make sure that the route `/contact-mail-api` is deactivated.

### Changed

- The default text for the cookie bar has been adjusted to better comply with current legislation. The text can be adapted via the translation key `cookieBarHintText` in the menu **CMS » Multilingualism**.
- The translation keys `checkoutChooseOur` and `checkoutCheckAcceptGtc` have been adjusted in order to adhere to the requirements of § 305 b BGB (German Civil Code). You can find further information <a href="https://www.it-recht-kanzlei.de/Die_wichtigsten_AGB-Regularien.html#abschnitt_9" target="_blank">here</a>. The linked page is German only.

### Fixed

- After editing an unselected address in the My Account or Checkout area, this address was not displayed correctly. This has been fixed.
- If cache blocks were activated, incorrect links could occur via the language selection. This behaviour has been fixed.
- On mobile devices, the combination of language selection and ShopBooster could result in the mobile navigation being displayed in the previously selected language. This behaviour has been fixed.
- Errors could occur in the checkout if no shipping profile was selected. This has been fixed.
- Item sets with set components that contained order characteristics could cause an incorrect display of the value of goods. This has been fixed.

### Changed templates

- In Ceres 5.0.54 we made changes to template files which are relevant for theme developers. You can find the changed templates below. The link directs you to the effected changes in the corresponding files.
- [resources/views/PageDesign/Partials/Header/DefaultHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/3319/files#diff-19f0c0c56118a0d17212318a2cf8c6e113276dc4c61779c2317b2e7a0976db31)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3319/files#diff-2696f6a2e31a39130c691133b3d6fdf30b218a6bdbbd0717433c835d060c3f66)
- [resources/views/Widgets/OrderConfirmation/PurchasedItemsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3318/files#diff-2cee15b4b8add92d304d2f4cbbb5a5891a5752c533b564f1e1d152982c1e62d0)

## v5.0.53 (2022-07-04) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.52...5.0.53" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- The setting **Forward to login page after clicking link in order confirmation** has been added back to plentyShop LTS settings and plentyShop wizard. These settings were removed in version 5.0.52, which resulted in the order confirmation of manually created orders not being accessible. We have therefore reverted this change.

## v5.0.52 (2022-06-29) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.51...5.0.52" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### New

- In addition to the browser name, the operating system is now also set as a class to the `<html>` object. If no operating system or browser can be detected, separate classes are set for each. We would like to thank @daniel-mannheimer for their contribution.

### Changed

- The translation keys `categoryItemFootnote`, `categoryItemFromPrice`, and `categoryItemLowestPrice` have been renamed to `itemFootnote`, `itemFromPrice`, and `itemLowestPrice`, respectively. If you've stored custom translations for these keys, your translations are automatically assumed for the renamed translation keys.
- The component `AddressSelect` has been changed in order to display large amounts of data more performantly. The component `DynamicScroller` now wraps individual addresses.
- The setting **Forward to login page after clicking link in order confirmation** has been removed from the plentyShop LTS settings and the plentyShop assistant. Now, the default behaviour is that customers are always forwarded to the login page. 
- The variable for the basket has been removed from the `GlobalContext`. Please read this <a href="https://forum.plentymarkets.com/t/plentyshop-basket-variable-wird-aus-dem-globalcontext-entfernt-basket-variable-is-removed-from-the-globalcontext/685718" target="_blank">forum thread</a> for more information.

### Fixed

- Order properties of the type **File** could cause errors on mobile devices if the order property's description was filled out. This has been fixed. 
- The CSRF token is now only added to REST calls that are directed to your own plentyShop.
- In the context of the update to PHP 8, several compatability errors have been fixed.

## v5.0.51 (2022-05-23) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.50...5.0.51" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### New

- It's now possible to display the prices of the last 30 days. This information is shown when displaying a strikethrough price and the item has a price from the last 30 days.
- The **Consent in the checkout** widget has been added to the checkout.

### Fixed

- The item for displaying more item information no longer covers the mega menu.
- On the order confirmation page, the item list sometimes displayed a total rebate of €0.00. This problem has been resolved.

### Changed templates

- In Ceres 5.0.51 we made changes to template files which are relevant for theme developers. You can find the changed templates below. The link directs you to the effected changes in the corresponding files.
- [resources/views/Checkout/OrderDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/3275/files#diff-49e9a28ec33181e8fd3720d39345363b8b0614f2bf29ceb66b403ef22c18bd4d)
- [resources/views/MyAccount/Partials/OrderHistoryListItemDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/3275/files#diff-dcc9c181484eba069617434b9c7c20b7906e9ab74907f134720e220a818c968a)
- [resources/views/Widgets/OrderConfirmation/PurchasedItemsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3275/files#diff-2cee15b4b8add92d304d2f4cbbb5a5891a5752c533b564f1e1d152982c1e62d0)

## v5.0.50 (2022-05-04) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.49...5.0.50" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- The amount already paid is now displayed on the order confirmation page.
- The order confirmation page can now display multiple redeemed coupon values.
- The plentyShop LTS plugin is now compatible with PHP 8.
- Order properties and characteristics configured as additional costs are now shown as separate items in the totals.
- For order properties and characteristics, it is now displayed in the single item view, in the shopping cart, and in the order confirmation whether the costs are inclusive or additional.
- Required, pre-selected order properties that have been configured as additional costs are now displayed without a checkbox below the item price on the single item view.

### Fixed

- When adding an item to the shopping cart, the base price was displayed incorrectly if the item quantity for a graduated price was reached by the addition. This behaviour has been fixed.
- If the tag name for the language selected in the shop was not stored for a tag, Javascript errors could occur in the shop. This has been fixed. 


## v5.0.49 (2022-04-11) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.48...5.0.49" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- The display of graduated prices in the **From price** in the category view can now be configured. The settings for this can be found in the plentyShop assistant under **Displayed information**. This setting is disabled by default.
- Characteristics of type "none" with additional costs are now displayed below the item price.

### Fixed

- The base price display on the category view was calculated incorrectly if graduated prices were defined for the article. This has been fixed.

### Changed templates

- In Ceres 5.0.49 we made changes to template files which are relevant for theme developers. You can find the changed templates below. The link directs you to the effected changes in the corresponding files.
- [resources/js/src/app/components/itemList/CategoryItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/3265/files#diff-4c35af622ef09ba8949eb1c47557e3e6651b088291a0d2e2463c9244007b5516)

## v5.0.48 (2022-03-21) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.47...5.0.48" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- Due to changes to ShopBuilder widgets, it is necessary to regenerate the ShopBuilder contents via the **Regenerate contents** button in the **CMS » ShopBuilder** menu.

### Added

- The item grid and item list widgets now contain a new option via which the VAT note can be hidden.
- The item grid and item list widgets now contain a new option via which the bakground of the item tiles can be coloured grey.
- The newsletter widget now contains a text for describing mandatory input fields. You can edit the text with the translation key **newsletterIsRequired** in the **CMS » Multilingualism** menu. 
- We added a new option to the image carousel widget with which images can be scaled to the full screen width.
- The widgets image box, image carousel and background image now contain an option via which images can be scaled to the full screen height.
- The widgets coupon input, item list, item grid, tool bar, order data and order history now contain the option to display buttons as outlined buttons. For item lists and item grid widgets, this only applies to the display on mobile devices.
- You can now create ShopBuilder contents of the type **Softlogin** with the corresponding coftlogin widget.

### Changed

- The order property option **Pre-selected** is now considered by checkboxes in the shop. For order properties of the type **None** for which the order options **Pre-selected** and **Required** are active, no checkbox is displayed in the shop.
- The URL from which the default company logo and default footer logo were loaded has been changed.

### Fixed

- The default tagging of cache blocks that contain category tree data or item data now works as intended.

### Changed templates

- In Ceres 5.0.48 we made changes to template files which are relevant for theme developers. You can find the changed templates below. The link directs you to the effected changes in the corresponding files.
- [resources/views/Widgets/Category/ItemGridWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3232/files#diff-f0aaf1ea155523f16c664c97d4b8877ad9db66f705f85a59ebffc0a3834f2456)
- [resources/views/Widgets/Common/ItemListWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3232/files#diff-56e4aca5195c81e2f933daaf2a1d1397fcd1e72844a24d75155dcab09e4cb0ee)
- [resources/js/src/app/components/newsletter/NewsletterInput.vue](https://github.com/plentymarkets/plugin-ceres/pull/3235/files#diff-b0d8af375291becdbc1a0f4d1a4cee18317d747dc3bd044270ff390cdf4b1fa6)
- [resources/views/Widgets/Common/ImageCarouselWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3233/files#diff-43b0576fe9cb61d0343a4aa220f562347c237717821f276ab632973e3970ec96)
- [resources/views/Widgets/Common/BackgroundWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3213/files#diff-bd9967b42e5604fbd1cc0034b2ed9fbc4bb18113880fe371167076f046aee956)
- [resources/views/Widgets/Common/ImageBoxWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3213/files#diff-9f438954b9f177761379a8b382eea014077ec743060583796ac4f9aaed3d3003)
- [resources/views/Widgets/Common/ImageCarouselWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3213/files#diff-43b0576fe9cb61d0343a4aa220f562347c237717821f276ab632973e3970ec96)
- [resources/views/Widgets/MyAccount/OrderHistoryWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3256/files#diff-f196d6bb6f33571742988039f2a995b8bb5b7e2b8e217ba7ddb9a6ebde4ada85)
- [resources/views/Widgets/OrderConfirmation/OrderDataWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3256/files#diff-82affb09026a21fd94995e057ae7214f6751cf84dfed718216f4760865567c33)
- [resources/views/Widgets/Basket/CouponWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3243/files#diff-1510e82d2597eb5bd730a313495e2f99bf742edc008f1d1e367fe7541e0e14e2)
- [resources/views/Widgets/Category/ItemGridWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3243/files#diff-f0aaf1ea155523f16c664c97d4b8877ad9db66f705f85a59ebffc0a3834f2456)
- [resources/views/Widgets/Category/ToolbarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3243/files#diff-cfedbade4ecd9f8d924f41e488e7d75c9b3273dbc2e422fe3f3238ea03b0d3ea)
- [resources/views/Widgets/Common/ItemListWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3243/files#diff-56e4aca5195c81e2f933daaf2a1d1397fcd1e72844a24d75155dcab09e4cb0ee)

## v5.0.47 (2022-02-25) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.46...5.0.47" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Sorting items by price caused errors in certain circumstances. This has been fixed.

## v5.0.46 (2022-02-24) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.45...5.0.46" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- Due to changes to ShopBuilder widgets, it is necessary to regenerate the ShopBuilder contents via the **Regenerate contents** button in the **CMS » ShopBuilder** menu.
- Graduated prices in the category view are now labelled with a "from" by default. Users can remove the "from" in the **CMS » Multilingualism** menu. The corresponding translation key is **itemFromPrice**. 

### Added

- ShopBooster now supports cache blocks. In the default plentyShop LTS, header, footer and item tiles (e.g. in item lists) are cached in blocks. This increases the ShopBooster cache coverage.
- The ShopBuilder preset for the homepage has been completely overhauled. The preset now contains demo images, sample texts, and a collection of various widgets.
- The asterisk characters for footnotes in the single item view, the category view, and live shopping pages can now be changed in the **CMS » Multilingualism** menu. The corresponding translation keys are **singleItemFootnote1**, **itemFootnote**, and **liveShoppingFootnote**.

### Changed

- In the newsletter registration, first and last names are now checked for invalid characters in order to prevent spam.
- In case of a CSRF token mismatch during a sensitive REST call, the client is reloaded and a notification is displayed. In this case, users are forwarded to the login page.
- The magnifying glass icon in the search bar now changes into a loading animation while the search data is requested.

### Fixed

- Graduated prices are now displayed in the category view, if they exist. The graduated price is now also labelled with "from". The corresponding translation key is **itemFromPrice**.
- The template of the **Add to wish list** component was changed from an `a-tag` to a `button-tag`.
- The setting **Show categories as filter options for search results** has been renamed and an error that occurred during saving was fixed.
- Under certain circumstances, the sticky container widget and the shopping cart preview overlapped. This has been fixed.
- The ShopBuilder preset **Footer** used an invalid parameter value for the cookie bar. This has been fixed.
- The widget **Selected filters** no longer leads to errors in the server-side rendering process (SSR) if it is placed above the filter selection.
- On iOS devices the shopping cart preview only opened after a second touch interaction. This has been fixed.

### Changed templates

- In Ceres 5.0.46 we made changes to template files which are relevant for theme developers. You can find the changed templates below. The link directs you to the effected changes in the corresponding files.
- [resources/js/src/app/components/basket/AddToBasket.vue](https://github.com/plentymarkets/plugin-ceres/pull/3112/files#diff-460828a2142adb35f926ca9c28a7d0c1c4eb9a2d127e2fafce1de5bceb925598)
- [resources/js/src/app/components/itemList/CategoryItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/3112/files#diff-4c35af622ef09ba8949eb1c47557e3e6651b088291a0d2e2463c9244007b5516)
- [resources/js/src/app/components/item/AddToWishList.vue](https://github.com/plentymarkets/plugin-ceres/pull/3217/files#diff-ca84d4fb86526c6d5ab30af678de22127f6721548962854510cf3fc42d36352e)
- [resources/js/src/app/components/item/ItemPrice.vue](https://github.com/plentymarkets/plugin-ceres/pull/3187/files#diff-eed3a26bc24bb9bbfd91d04e54f17d682022d8a9b1918fe760fe93d366beed22)
- [resources/js/src/app/components/item/SetPrice.vue](https://github.com/plentymarkets/plugin-ceres/pull/3187/files#diff-30614b885f8e0ea365fe8fbf3186a95f79a6a4b519e7d26f53c371301a0db3c1)
- [resources/js/src/app/components/item/SingleItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/3187/files#diff-24dd25ca458027f998950fb4b48c9908ba241ac54bcf94c6de48c26107d86c15)
- [resources/js/src/app/components/itemList/CategoryItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/3187/files#diff-4c35af622ef09ba8949eb1c47557e3e6651b088291a0d2e2463c9244007b5516)
- [resources/js/src/app/components/liveShopping/LiveShoppingDetails.vue](https://github.com/plentymarkets/plugin-ceres/pull/3187/files#diff-c2a08d86ac9eeeb7f4ba9b1855dc844c4e03a6446fd422d637f686975465ed3b)
- [resources/js/src/app/components/itemList/ItemSearch.vue](https://github.com/plentymarkets/plugin-ceres/pull/3204/files#diff-5bd4d6672453a0a141bfacda9410575580bca2d670355850d95619b77f2c1fb6)
- [resources/js/src/app/components/itemList/SearchSuggestionItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/3204/files#diff-004f2a9020c0efb677e721298f2739088d6620ebafccde4b94ced464e21b75ec)


## v5.0.45 (2022-01-18) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.44...5.0.45" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- Since the setting **Customers have to fill in all possible order characteristics before they can add an item to the shopping cart** in the step **Displayed information** of the plentyShop assistant no longer applies to order properties, sellers might need to activate the option **Required** for their order proerties in the **Setup » Settings » Properties » Configuration » (Select property) » Options » Order options** menu.

### Added

- The visibility of displayed item information in the shopping cart preview can now also be edited in the step **Displayed information** of the plentyShop assistant.

### Changed

- Order properties and order characteristics are now displayed even if the variation cannot be purchased.

### Fixed

- The styling of completed live shopping offers has been aligned with the styling of active live shopping offers.
- It was possible to submit a newsletter subscription without the reCAPTCHA if the corresponding cookie had been rejected. This has been fixed.
- The plentyShop assistant did not display default values for global values. This has been fixed.
- Due to an error, the entered search term was not correctly appended to the URL. This has been fixed.
- The setting **Customers have to fill in all possible order characteristics before they can add an item to the shopping cart** in the plentyShop assistant no longer applies to order properties.
- Due to an error, changes to the settings of the cookie bar widget were not applied. This has been fixed.
- Order properties of the type **None** in a group of the type **Select** are now working properly if the option **Required** has been activated.
- Order characteristics of the type **None** in a characteristic group of the type **Single selection** are now working properly if the option **Customers have to fill in all possible order characteristics before they can add an item to the shopping cart.** has been activated in the plentyShop assistant.

## v5.0.44 (2021-12-27) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.43...5.0.44" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- The settings for displaying price information in the shopping cart preview are now effective. Review the settings in the **Plugins » plentyShop LTS » Shopping cart** section for the setting **Show basket preview information** and adjust the settings to your needs.
- Due to changes to CookieBar widget in the ShopBuilder, it is necessary to regenerate the related contents via the **Regenerate contents** button in the **CMS » ShopBuilder** menu.

### Added

- It is now possible to prioritise the search results by variation name. You can find the setting in the **Search** step in the plentyShop assistant.
- It is now possible to determine the order of the buttons of the cookie bar in the widget settings. Additionally, you can hide the **Reject all** button.
- The description of order characteristics and order properties can now be displayed on mobile devices via a button.
- It is now possible to show or hide price information in the shopping cart preview. You can carry out this setting in the plentyShop configuration under **Shopping cart » Show basket preview information**. This functionality is available only in ShopBuilder headers.
- Order characteristics with the option **Required** are now supported.
- Footnote symbols on the single item page are now customizable via multilingualism. The corresponding translation keys are: **singleItemFootnote1**, **singleItemFootnote2**, **singleItemFootnote12**.

### Changed

- The colour settings in the tab **Design** of the plentyShop LTS settings have been deprecated. These settings can now only be accessed in the design settings of ShopBuilder. The selected colours remain unchanged.
- The scroll bar of the shop is now hidden as long as the shopping cart preview is opened. We would like to thank user @MaxBentz for their contribution.

### Fixed

- The item grid widget generated too much data in the ShopBuilder preview and unnecessarily increased the file size. This has been fixed.
- The cookie bar also rejected essential cookies if a user clicked **Reject all**. This has been fixed.
- Live shopping items scheduled for a future time slot that have no strikethrough price now display the correct normal price.
- The automatic phone number detection in the Safari browser could lead to hydration errors if SSR was active. It is therefore deactivated by default.
- Tool tips for the Add to wish list widget were not displayed correctly. This has been fixed.
- The plentyShop assistant did not display the back end name of shipping profiles. This has been fixed.
- An HTML element was output for the tag list, even if an item was not linked to any tags. This has been fixed. We would like to thank user @Lauflust for their contribution.
- The validation of order properties and order characteristics of the type **File** is now exclusively carried out on the server side.

### Changed templates

- In Ceres 5.0.44 we made changes to template files which are relevant for theme developers. You can find the changed templates below. The link directs you to the effected changes in the corresponding files.
- [resources/js/src/app/components/pageDesign/CookieBar.vue](https://github.com/plentymarkets/plugin-ceres/pull/3133/files#diff-07203a2a14f4fdfe0285c115db84358b9b18bbe84d3ab3536f80b667529b7392)
- [resources/views/Widgets/Footer/CookieBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3133/files#diff-c05849d77ed56c7c3fe936d53064ffa075171ba20822d0448e351ee940c1dc59)
- [resources/views/PageDesign/Partials/Head.twig](https://github.com/plentymarkets/plugin-ceres/pull/3109/files#diff-33a10158d672d50c9bc1c0e8a46fbd8edb701925dcb3f619c6ff6f8ca11e45ee)
- [resources/js/src/app/components/item/AddToWishList.vue](https://github.com/plentymarkets/plugin-ceres/pull/3110/files#diff-ca84d4fb86526c6d5ab30af678de22127f6721548962854510cf3fc42d36352e)
- [resources/js/src/app/components/item/OrderPropertyListGroup.vue](https://github.com/plentymarkets/plugin-ceres/pull/3115/files#diff-66d47567497f0cc8e0143d9f963d8c812092114dd774e63ccae91fe1179330ba)
- [resources/js/src/app/components/item/OrderPropertyListItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/3115/files#diff-38e564e102ed3a17d36a85e7a337ea233f1fba3a1e43d95808c20dde2484f1c9)
- [resources/js/src/app/components/basket/BasketPreview.vue](https://github.com/plentymarkets/plugin-ceres/pull/3104/files#diff-21af208d0ab5bd9055fcd8ca0bda5d6c0770336ed010aa788a2f0c1d7222e2b6)
- [resources/js/src/app/components/basket/BasketTotals.vue](https://github.com/plentymarkets/plugin-ceres/pull/3104/files#diff-74c12ada105a013f79bbea3a162d3e4358d1afa3f38c3e9e00894a3ab6ad01c1)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3104/files#diff-2696f6a2e31a39130c691133b3d6fdf30b218a6bdbbd0717433c835d060c3f66)
- [resources/js/src/app/components/item/TagList.vue](https://github.com/plentymarkets/plugin-ceres/pull/3134/files#diff-1b324b2465d4c6e8aefae057e8d7e36990efbd9e72f3beee9c61149d8bbc7e00)
- [resources/js/src/app/components/item/OrderPropertyListItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/3123/files#diff-38e564e102ed3a17d36a85e7a337ea233f1fba3a1e43d95808c20dde2484f1c9)


## v5.0.43 (2021-11-30) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.42...5.0.43" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added 

- `aria-labels` have been added to every **Close** button. We would like to thank @MaxBentz for their contribution!
- The entry `cookieBarDenyAll` was added to the multilingualism UI for changing the text of the **Reject all** button of the cookie bar.

### Changed

- The default cookie bar of plentyShop now contains the three buttons **Accept selection**, **Accept all**, and **reject all**.
- All cookie bar buttons are now in the same colour.

### Fixed

- The default logos for plentyShop LTS and plentymarkets were not correctly displayed. This has been fixed.
- Payment methods that included a lot of descriptive text were not correctly displayed in the checkout on small display sizes. This has been fixed.

### Changed templates

- In Ceres 5.0.43 we made changes to template files which are relevant for theme developers. You can find the changed templates below. The link directs you to the effected changes in the corresponding files.
- [resources/js/src/app/components/basket/AddItemToBasketOverlay.vue](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-311f3a2f3e02a8f6bb38785576b25dc75bf8b3e56a36a8cc2e4ae474745266b5)
- [resources/js/src/app/components/basket/BasketPreview.vue](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-21af208d0ab5bd9055fcd8ca0bda5d6c0770336ed010aa788a2f0c1d7222e2b6)
- [resources/js/src/app/components/customer/login/ForgotPassword.vue](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-44987529408a4046ff667225875e66b190a54913180f2aadcb986f8c349e1a33)
- [resources/js/src/app/components/customer/login/LoginView.vue](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-00501fd1757fdacd13f2da43432cb2de657278d7db72c324b8317160a0ece5d3)
- [resources/js/src/app/components/myAccount/EditCouponOverlay.vue](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-3385c5d0e4771710be00b0a70811ac5b8018e23b7da889cb9923959dbb8a9a29)
- [resources/js/src/app/components/orderReturn/OrderReturn.vue](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-971e659557f3b0f7e6b0d68a65d9a3f7fba777397bc842f3ecf77313d54857f1)
- [resources/js/src/app/components/pageDesign/Notifications.vue](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-aaca879a460ddd8b7177f493c43c224bf1589a43cdf0e284069d25656f0e93c8)
- [resources/views/Customer/Components/AddressSelect/AddressSelect.twig](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-969624803dfeb696a58e16de0d95c285a458ec83a615026882d9b1e65386935b)
- [resources/views/MyAccount/Components/AccountSettings.twig](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-f99642810d726bab73f9000f541ceebf82d6470974403d0c6693ea16ed9a47a4)
- [resources/views/MyAccount/Components/BankDataSelect.twig](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-1f3a9b0d80f77b92422277ac44697c3af03430626f4bbc8afc281c5b66ec0b1f)
- [resources/views/MyAccount/Components/ChangePaymentMethod.twig](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-eb7c6713f77e2474d697d9c61965c24b43696f444a9d6cc11fc93428da719535)
- [resources/views/MyAccount/Components/OrderHistory.twig](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-a4e17105e37f62c4fbc0b52da6bbcc7b5d0f134fd425f71b536e95e4ea565f5b)
- [resources/views/PageDesign/PageDesign.twig](https://github.com/plentymarkets/plugin-ceres/pull/3099/files#diff-6103acda40fc331c6f5ba92faab9976e92848d8fde0e9af7fe34abd593885128)


## v5.0.42 (2021-11-15) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.41...5.0.42" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### ToDo

- Themes and customised CSS have to be checked for obsolete `<span>` elements. We either removed or replaced all `<span>` elements that contained block level elements in order to prevent invalid HTML. Please check whether your selectors use the affected `<span>` elements and, if necessary, adjust your selectors. You can find the affected files in the section **Changed templates** below.

### Changed

- The validity of the date of birth is now checked whenever the address is updated, even if the date of birth input field is not visible.
- The ShopBuilder presets for **Checkout** and **My account** now use Inline Text widgets instead of Text widgets.
- The option **Item ID** has been added for the SEO setting for stock keeping units.

### Fixed

- The setting **Show when hovering over shopping cart icon in the hearder** for the shopping cart preview no longer worked as intended. This has been fixed.
- Opening and closing the mobile navigation is now carried out in one central place, which prevents varying states of the CSS classes that are applied to the displayed navigation.
- When server-side rendering was active, parts of the Javascript bundle were loaded without the build hash, which could lead to obsolete content being loaded from the browser cache. This has been fixed.
- Saving the plentyShop assistant no longer invalidates the entire ShopBooster cache. Settings which only affect values of the plugin configuration (preview mode) now only invalidate those pages affected by the setting. 
- After creating a return, users are no longer redirected to the homepage; instead, they are redirected to the **My account** area or the order confirmation page, depending on their login state.
- The missing translation for the currency Netherlands Antillean guilder and the corresponding setting ind the plugin configuration have been added.
- Invalid items were not removed from the shopping cart when a user changed the country of delivery. This has been fixed.
- `<span>` elements must not contain block level elements. The affected `<span>` elements have either been removed or replaced with `<div>` elements in order to prevent invalid HTML. We'd like to thank user @MaxBentz for their contribution.

### Changed templates

- In Ceres 5.0.42 we made changes to template files which are relevant for theme developers. You can find the changed templates below. The link directs you to the effected changes in the corresponding files.
- [resources/views/Customer/Components/AddressSelect/AddressSelect.twig](https://github.com/plentymarkets/plugin-ceres/pull/2880/files#diff-969624803dfeb696a58e16de0d95c285a458ec83a615026882d9b1e65386935b)
- [resources/views/Checkout/OrderDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/3086/files#diff-49e9a28ec33181e8fd3720d39345363b8b0614f2bf29ceb66b403ef22c18bd4d)
- [resources/views/MyAccount/Components/BankDataSelect.twig](https://github.com/plentymarkets/plugin-ceres/pull/3086/files#diff-1f3a9b0d80f77b92422277ac44697c3af03430626f4bbc8afc281c5b66ec0b1f)
- [resources/views/Widgets/Contact/ContactDetailsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3086/files#diff-b7d6f7d1aeff7c602684070225c40c435e3de1caed65ca3df51fdd554a994e33)
- [resources/views/Widgets/OrderConfirmation/OrderDataWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3086/files#diff-82affb09026a21fd94995e057ae7214f6751cf84dfed718216f4760865567c33)
- [resources/views/Widgets/OrderConfirmation/PurchasedItemsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/3086/files#diff-2cee15b4b8add92d304d2f4cbbb5a5891a5752c533b564f1e1d152982c1e62d0)

## v5.0.41 (2021-10-20) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.40...5.0.41" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added

+ The LayoutContainer "Ceres::PageDesign.AfterOpeningHeadTag" was added. @FelixRies

### Changed

* Rebranding: **Ceres** is now promoted as **plentyShop LTS**.

### Fixed

* In the standard login template, the input of the guest login modal was not focused after opening. This has been fixed.
* The assistant didn't show when the order properties were activated. This has been fixed.

### Changed templates

- In Ceres 5.0.41 we made a change to a template file which is relevant for theme developers. You can find the changed template below. The link directs you to the effected changes in the corresponding file.
- [resources/views/PageDesign/PageDesign.twig](https://github.com/plentymarkets/plugin-ceres/pull/3051/files#diff-6103acda40fc331c6f5ba92faab9976e92848d8fde0e9af7fe34abd593885128)

## v5.0.40 (2021-10-05) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.39...5.0.40" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added

+ plentyShop LTS now supports order properties. In order to use order properties, you need to activate the setting **Activate order properties** in the step **Online store** of the plentyShop LTS assistant. Please note that this replaces order characteristics.

### Changed

* A maximum of 250 properties were displayed in the data field picker in the ShopBuilder. This has been changed to a maximum of 1500 properties.
* plentyShop LTS is now able to react to a future order setting with which prefixes for item bundles and components can be customised. Note that changing these prefixes may lead to a faulty display of older orders.
* The maximum number of displayed items in the preview of the item grid widget in the ShopBuilder has been limited to 50.

### Fixed

* Item lists of the type **Last seen** didn't work as intended if Server-Side Rendering was inactive. This behaviour has been fixed.
* If the setting **Block unaccepted cookies** was inactive, accepting cookies could lead to a reCAPTCHA error. This has been fixed.
* The option **Show categories as filter options for search results**, which is necessary for displaying the category filter widget, has been added to the plentyShop LTS assistant.

## v5.0.39 (2021-09-13) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.38...5.0.39" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- It's no longer possible to send the contact form if reCaptcha is active and the corresponding cookie was not accepted by the user.

### Fixed

- The quantity input on the single item view now ignores the minimum order value if the shopping cart already contains the item in question.
- Tabs are displayed correctly again, even when they only include an image widget.
- If properties were assigned to multiple groups, display problems could occur if they were added to the ShopBuilder preset via the data field picker. This behaviour has been fixed.

## v5.0.38 (2021-08-31) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.37...5.0.38" target="_blank" rel="noopener"><b>Overview of all changes<</b></a>

### Changed

- For the changing of payment methods, the `accessKey` for the order is now also passed. 

### Fixed

- The interval order quantity of the quantity input is now updated when the user changes the variation.
- Using external search service providers could lead to the faulty display of search results in the frontend, due to an error on part of the search provider. This has been fixed.
- Under certain circumstances, images could not be displayed in the browser Internet Explorer 11. This has been fixed.
- The placeholders for "item text", "technical data", and for text properties are now output as block elements by ShopBuilder, therefore no longer creating invalid HTML.

## v5.0.37 (2021-08-17) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.36...5.0.37" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- Due to changes to ShopBuilder widgets, it is necessary to regenerate the ShopBuilder contents via the **Regenerate contents** button in the **CMS » ShopBuilder** menu.

### Fixed

- Due to an error, line breaks were included in the inline styles of the background image widget. These have been removed.
- If server-side rendering was active, the filter tool bar could not be opened on category pages that had not been created with ShopBuilder. This has been fixed.
- If server-side rendering was active, the toggles of the cookie bar could not be used in certain cases. This has been fixed.
- All values of properties of the type **Multiselect** can now be displayed in plentyShop.

### Changed templates

- In Ceres 5.0.37 we made a change to a template file which is relevant for theme developers. You can find the changed template below. The link directs you to the effected changes in the corresponding file.
- [resources/views/Widgets/Common/BackgroundWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2995/files#diff-bd9967b42e5604fbd1cc0034b2ed9fbc4bb18113880fe371167076f046aee956)
- [resources/js/src/app/components/itemList/filter/ItemFilterList.vue](https://github.com/plentymarkets/plugin-ceres/pull/3000/files#diff-e9e66af238168dbc3f834944944094a491bee28d6d7016c8e9365b673872a82b)
- [resources/js/src/app/components/pageDesign/CookieBar.vue](https://github.com/plentymarkets/plugin-ceres/pull/3000/files#diff-07203a2a14f4fdfe0285c115db84358b9b18bbe84d3ab3536f80b667529b7392)

## v5.0.36 (2021-08-05) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.35...5.0.36" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- The loading of customer data, the shopping cart, and shopping cart items are now subsumed under a single query.
- Variation properties on the single item view in the ShopBuilder and the plentyShop are now loaded via the new new repositories for variation properties.

### Fixed

- After changing the country of delivery in the header, the newly selected country of delivery was not saved. This has been fixed.
- Deactivating the currency selection in the plentyShop Ceres assistant deactivated all available currencies. This has been fixed.
- In plentyShops that didn't use server-side rendering, images in inactive tabs of the tab widget for which the option **Only load visible content** was active, were already loaded when the page was accessed. This has been fixed.

## v5.0.35 (2021-07-12) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.34...5.0.35" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- Due to changes to ShopBuilder widgets, it is necessary to regenerate the ShopBuilder contents via the **Regenerate contents** button in the **CMS » ShopBuilder** menu.
- The setting **Block unaccepted cookies** in the Ceres settings has been activated for all systems for which no Ceres settings have been saved so far. If you do not want to block cookies your customers have not accepted, check and, if necessary, deactivate the setting in the **Plugins » Plugin set overview »** *Select plugin set* **» Ceres » Configuration » Tab: Global** menu.

### Changed

- The setting **Block unaccepted cookies** in the Ceres settings is now active by default.

### Fixed

- Due to an error, it was not possible to set up the category navigation in such a way that the second level did not display any categories. This behaviour has been fixed.
- A wrong `prev` link was set in the HTML markup on the second page of a category. This has been fixed.
- Switching item variations on mobile devices could lead to the page scrolling to a different part of the page. This has been fixed.
- Data fields in text widgets were not updated in the single item view when a different variation was selected. This has been fixed.
- With active server-side rendering (SSR), it was impossible for external plugins to override Vue components in Ceres. This has been fixed.
- The allowed maximum value for the quantity input of an item was not updated when changing a variant. This has been fixed.
- The tooltip that displays the maximum value at the quantity entry of an item now outputs the correct value.

### Changed templates

- In Ceres 5.0.35 we have made changes to a number of template files which are relevant for theme developers. You can find the changed template below. The link directs you to the effected changes in the corresponding file.
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2960/files#diff-2696f6a2e31a39130c691133b3d6fdf30b218a6bdbbd0717433c835d060c3f66)
- [resources/views/Category/Item/CategoryItem.twig](https://github.com/plentymarkets/plugin-ceres/pull/2949/files#diff-6e3fe08ffe8086b5176c1c0451cb0c0034b99195843630994e5e79347f8d1158)

## v5.0.34 (2021-06-28) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.33...5.0.34" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- In order to ensure legal compliance with regard to contact data in the checkout, it is necessary to activate the option **Email** for the settings **Show invoice address fields** and **Show shipping address fields** of the address selection widget in the checkout.
- Due to changes to ShopBuilder widgets, it is necessary to regenerate the ShopBuilder contents via the **Regenerate contents** button in the **CMS » ShopBuilder** menu.

### Added

- The option **Email** has been added to the settings **Show invoice address fields** and **Show shipping address fields** of the address selection widget. Thus, shop visitors can now change the email address to which the order confirmation and other information is sent.
- The email address that users use to sign up in plentyShop is now automatically stored as part of the invoice and shipping addresses. 
- You can now activate the mapping of the barcode GTIN and the manufacturer name for the Rich Snippets of the single item view in the SEO settings of the plentyShop assistant and the Ceres settings. Furthermore, you can now add the external variation ID for MPN barcodes.
- The widget **Automatic language detection** has been added to the ShopBuilder. Through this widget, users can change online shop contents to the language that has been recognised as the browser language in consideration of redirects that have been set up in the backend.

### Changed

- The usability of the selection of invoice and shipping addresses has been reworked.
- The cookie bar has been adjusted so that no Cumulative Layout Shift (Google Core Web Vitals) occurs if a user reloads the page with accepted cookies.
- The successful sending of the contact form now triggers a `contactFormSent` event.
- When additional instances of jQuery are integrated, plugins that have previously been registered are now assumed and a corresponding warning is issued.

### Fixed

- If too many categories were displayed in the navigation widget, the shop logo was not displayed in its usual size. This has been fixed. 
- If a user implements custom fonts, text now remains visible during the loading of this font.
- The **Add to basket** button in item lists could cover the mega menu. This has been fixed.
- The missing output of the SEO attribute `priceValidUntil` for grouped variation properties has been added.

### Changed templates

- In Ceres 5.0.34 we have made changes to a number of template files which are relevant for theme developers. You can find the changed template below. The link directs you to the effected changes in the corresponding file.
- [resources/views/Checkout/CheckoutView.twig](https://github.com/plentymarkets/plugin-ceres/pull/2938/files#diff-c74596cdf6d6196e3b9c8563916151e3a08a5edfa026845503c9169a0fcd8252)
- [resources/views/Customer/Components/AddressSelect/AddressHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/2938/files#diff-30379d1768fe8165edaa8801437dacdd43b91106c90a543bde299bdfa82b2be4)
- [resources/views/Customer/Components/AddressSelect/AddressSelect.twig](https://github.com/plentymarkets/plugin-ceres/pull/2938/files#diff-969624803dfeb696a58e16de0d95c285a458ec83a615026882d9b1e65386935b)
- [resources/views/MyAccount/Components/BankDataSelect.twig](https://github.com/plentymarkets/plugin-ceres/pull/2938/files#diff-1f3a9b0d80f77b92422277ac44697c3af03430626f4bbc8afc281c5b66ec0b1f)
- [resources/views/MyAccount/MyAccountView.twig](https://github.com/plentymarkets/plugin-ceres/pull/2938/files#diff-dbc71118894a6415be3f82e4ee31dc1e6b7c3160b45b887ccce71f6620824d7c)
- [resources/views/Widgets/Basket/BasketTotalsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2938/files#diff-eb6a01e8f34626aab363899d6e2363283e62f314ef3f9f7f56638ab93cb11026)
- [resources/views/Widgets/Customer/AddressWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2938/files#diff-47efd06234499d9fa52810e58ce5e6d9983e522de814c92e8ff66f4b010f0db5)

## v5.0.33 (2021-06-14) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.32...5.0.33" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- It is now possible to combine the two settings **Only load visible content** and **Preload image** in the image carousel widget.
- The two widgets title bar and text negatively impacted the Cumulative Layout Shift value (Google Core Web Vitals), because the texts contained in the widgets were only rendered on the client's side. This has been changed.
- The title of the navigation widget is now again rendered on the server's side (SSR). This improves the value of the Cumulative Layout Shift of the Google Core Web Vitals.
- Unnecessary components for the My Account and checkout pages have been removed from the SSR bundle in order to decrease file size. We'd like to thank user @JVolke for their contribution.
- The component `user-login-handler` is now rendered on the client's side. This prevents hydration errors when Server-Side Rendering (SSR) is active.
- You can now set relationship attributes for links in the settings of the widgets list and link.

### Fixed 

- Changes to the appearance of text widgets could lead to the text no longer being displayed in the ShopBuilder. This has been fixed.
- The entry "headerSearchPlaceholder" has been added to the multilingualism settings, which serves to add a custom placeholder text to the input field of the item search.
- The image carousel widget did not display images of item variations. This has been fixed.
- Vuex was not available in the window as long as Server Side Rendering was active. This has been fixed.
- Due to an error, item lists of the type **Last seen** were incorrectly hydrated when Server-Side Rendering was active. This has been fixed.
- Due to a missing quote mark, the variable `priceValidUntil` in the structured data was not recognised. This has been fixed.

### Changed templates

- In Ceres 5.0.33 we have made changes to template files which are relevant for theme developers. You can find the changed template below. The link directs you to the effected changes in the corresponding file.
- [resources/views/Widgets/Common/InlineTextWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2906/files#diff-e7dc3611e423358f168f99f3a60b6bfa3d2af686cfee952aca2e93ca91a3be62)
- [resources/views/Widgets/Common/TitleBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2906/files#diff-91d4a3578417267035536ce9c72ca096a438ce5e7936d8edb1e0d3187bb69865)
- [resources/views/Widgets/Navigation/NavigationTreeWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2906/files#diff-d694b4ace865b8e05bdad90a07c80f0687d865e0d3d1a82f8ffa614bee809157)
- [resources/views/Widgets/Common/ImageCarouselWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2908/files?diff=unified&w=1#diff-43b0576fe9cb61d0343a4aa220f562347c237717821f276ab632973e3970ec96)
- [resources/views/Widgets/Common/LinkWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2903/files#diff-374f59a54ec3fcbe1d2444facbddd25c4f8a114e71b7576c9c34d7a20a2d122b)
- [resources/views/Widgets/Common/ListWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2903/files#diff-52efec59835d97dc6c2ed6ae7c8b639056ccfaac681c3e425090d53796b13423)

## v5.0.32 (2021-06-01) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.31...5.0.32" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added

- In the plentyShop assistant, the validity of the session cookie can now additionally be set to one hour or one day.
- You can now activate the mapping of various barcodes (GTIN-8, GTIN-13, ISBN, and MPN), the price validity (priceValidUntil), and the SKU for the Rich Snippets of the single item view in the SEO settings of the plentyShop assistant and the Ceres settings.

### Changed

- Errors in server-side rendering of the Vue.js app can now be caught. In this case, the page is rendered client-side.
- In the image carousel widget, the performance for loading linked item variations has been improved.

### Fixed

- The content of a text widget is no longer rendered on the server side (SSR) to prevent hydration errors.
- The logic for scrolling fixed elements in the header has been adjusted. This improves the 'Cumulative Shift Layout' (CLS) value of the Google Core Web Vitals.
- Under certain circumstances, the item list widget did not display images in ShopBuilder. This has been fixed.
- Due to an error, server-side nested components could not be overwritten via `data-component`, which led to hydration errors. This has been fixed.
- To run the Ceres assistant, plentymarkets users no longer require the user rights for the "Accounting" and "Order status" sections.
- Due to an error, `window.ceresStore` could no longer be accessed in the AfterScriptsLoaded container. This has been fixed.

### Changed templates

- In Ceres 5.0.32 we have made changes to a template file which are relevant for theme developers. You can find the changed template below. The link directs you to the effected changes in the corresponding file.
- [resources/views/PageDesign/Partials/Header/DefaultHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/2874/files#diff-19f0c0c56118a0d17212318a2cf8c6e113276dc4c61779c2317b2e7a0976db31)
- [resources/views/PageDesign/Partials/Header/Header.twig](https://github.com/plentymarkets/plugin-ceres/pull/2874/files#diff-f2a11c8bc92192c490363ceeb2b7e9a02819568c77971a10e43eedc93270014f)
- [resources/views/Widgets/Category/ItemGridWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2881/files#diff-f0aaf1ea155523f16c664c97d4b8877ad9db66f705f85a59ebffc0a3834f2456)
- [resources/views/Widgets/Common/ImageCarouselWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2875/files#diff-43b0576fe9cb61d0343a4aa220f562347c237717821f276ab632973e3970ec96)
- [resources/views/Item/SingleItemWrapper.twig](https://github.com/plentymarkets/plugin-ceres/pull/2879/files#diff-192a8837dba88964356b7ecd49003fe083ed719e2c601b9623e6dd4b24be9326)
  
## v5.0.31 (2021-05-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.30...5.0.31" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added

- The image box widget now has another option for the aspect ratio setting: "Retain aspect ratio". With this option, the widget retains the aspect ratio of the image.
- At the selection field widget of the contact form, you can now use the selection type "Checkboxes" in combination with the option "Mandatory field" to define the minimum and maximum amount of options to be selected.
- The item list widget now supports image preloading.

### Changed

- The QuantityInput component is now loaded together with the AddToBasket component. This reduces the loading time of the item view. Thanks to @naturdrogerie
- The ShippingCountrySelect component in the header is now covered by Intersect instead of Lazy-Hydrate. Thanks to @MaxBentz!

### Fixed

- The setting for enabling Vue SSR in the assistant could not be displayed in preview mode configurations. This has been fixed.
- Templates of nested components that have not been registered via Vue.component() are taken into account on the server-side.
- The delimiters in overwritten component templates are interpreted correctly by SSR.
- NullPointerExceptions could occur in the LazyLoad component. The behaviour has been fixed.

### Changed templates

- In Ceres 5.0.31 we have made changes to a template file which are relevant for theme developers. You can find the changed template below. The link directs you to the effected changes in the corresponding file.
  
- [resources/views/Widgets/Common/ImageBoxWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2856/files#diff-9f438954b9f177761379a8b382eea014077ec743060583796ac4f9aaed3d3003)
- [resources/views/Widgets/Common/ItemListWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2862/files#diff-56e4aca5195c81e2f933daaf2a1d1397fcd1e72844a24d75155dcab09e4cb0ee)
- [resources/views/Widgets/Form/SelectionWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2855/files#diff-87084c109a175d99c3284c8dc3de606d3ef045d10aa519da1acf7530c5b36fc0)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2851/files#diff-2696f6a2e31a39130c691133b3d6fdf30b218a6bdbbd0717433c835d060c3f66) 
- [resources/views/Widgets/Header/DefaultHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/2851/files#diff-19f0c0c56118a0d17212318a2cf8c6e113276dc4c61779c2317b2e7a0976db31)

## v5.0.30 (2021-05-14) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.29...5.0.30" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- `vueEventHub` has been added on the client side for active server-side rendering (SSR). This makes it possible to use the latest version of the blog plugin (v2.0.0) in combination with active SSR.
- The layout container "AfterOpeningBodyTag" and the **PartialFooter** block have been added to the PageDesign.twig.

### Fixed

- The size of the body was not newly calculated after changes had been applied in the ShopBuilder. This has been fixed.
- Overwritten component templates are now correctly rendered on the server-side.

### Changed templates

- In Ceres 5.0.30 we have made changes to a template file which are relevant for theme developers. You can find the changed template below. The link directs you to the effected changes in the corresponding file.
- [resources/views/PageDesign/PageDesign.twig](https://github.com/plentymarkets/plugin-ceres/pull/2857/files#diff-6103acda40fc331c6f5ba92faab9976e92848d8fde0e9af7fe34abd593885128)

## v5.0.29 (2021-05-11) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.28...5.0.29" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added

- The Ceres settings and the plentyShop assistant now include the new setting **Use Vue Server-Side Rendering** in the **Performance** section with which you can activate server-side rendering in order to generate markup on the server's side, thereby improving shop performance. This setting is inactive by default.
- The Ceres settings and the plentyShop assistant now include the new setting **Activate state cloning for event propagation in VueX** in the **Performance** section to activate and deactivate state clonging. Deactivating state cloning improves shop performance, but may lead to errors in combination with external plugins. This setting is active by default.
- We added the setting **Preload image** to the widgets image box, image carousel, background image, and item image. This setting serves to improve shop performance in combination with Vue Server-Side Rendering. You can find further information on how to use this setting [here](https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/best-practices.html#_optimising_image_widgets).
- `aria-labels` have been added to the quantity input of items in order to increase its accessibility. We would like to thank @MaxBentz for their contribution!
- You can now activate the mapping of the brand and the manufacturer for item view Rich Snippets in the SEO settings of the Ceres configuration and in the plentyShop assistant.
- We added the ClientOnly component. This enables external developers to wrap components that are not compatible with Vue Server-Side Rendering, so that these components are only generated on the side of the client.

### Changed

- Images in the background image widget can now be loaded at a later time by activating the widget setting **Lazyload background image**. You can find further information on how to use this setting [here](https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/best-practices.html#_optimising_image_widgets).
- Shipping addresses for post offices or Packstations can no longer be created in the My Account area if no shipping profile exists that includes the corresponding option.
- A unique ID has been added to the country selection in order to remove two console warnings. We would like to thank @jvolke for their contribution. 
- We added a slot to the LazyImg component, thereby making it possible to add additional image sources.

### Fixed

- The translation of the consent group for payment providers was not displayed correctly. This has been fixed.
- You can now hide all additional item data in the shopping cart widget. 

### Changed templates

- In Ceres 5.0.29 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files. In this version, there have been more changes than usual in order to prepare plentyShops for the Google Core Web Vital update. These changes have been categorised in classes that are listed below, sorted according to importance.

#### Necessary template changes

- [resources/views/PageDesign/PageDesign.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files?diff=split&w=1#diff-6103acda40fc331c6f5ba92faab9976e92848d8fde0e9af7fe34abd593885128)
- [resources/views/PageDesign/Partials/Header/Breadcrumb.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-1419cc783c69f7d9ffa8a59dfa07c63a77d349711edb01dd573f8119d0a5946d)
- - [resources/js/src/app/components/customer/login/Login.vue](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-2f9c77c26769ad83744b9004d9455b7db47a08d018f960672d2feaa51e1ce476)

#### Important template changes for performance improvements

- [resources/js/src/app/components/containers/LastSeenItemList.vue](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-19af7c40623f40d850c291ad2b4077e5a6bb4357fd778719bf996871d8739a17)
- [resources/js/src/app/components/item/ItemImageCarousel.vue](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-78484b68defc6a9839cc69c5f3f9fc8bef2d0641a6db41ab6e68f58665f48912)
- [resources/js/src/app/components/item/VariationSelect.vue](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-3bf7e50898b2d79d717300fe7c276487aea49cb917f014bf3f8ea27c6b392149)
- [resources/js/src/app/components/itemList/CategoryImageCarousel.vue](https://github.com/plentymarkets/plugin-ceres/pull/2712/files?diff=split&w=1#diff-449e63fc921701c277c047250ed882be5e7039c498efa513e1469dffd8ff818f)
- [resources/views/Widgets/Common/ImageBoxWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-9f438954b9f177761379a8b382eea014077ec743060583796ac4f9aaed3d3003)
- [resources/views/Widgets/Common/ImageCarouselWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-43b0576fe9cb61d0343a4aa220f562347c237717821f276ab632973e3970ec96)
- [resources/views/Widgets/Item/AttributeWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-3e6df11a97d5ae968dcaa110652d41aed6e5098612223d0f18030946b7a58bb9)
- [resources/views/Widgets/Item/ItemImageWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-e9d44ad6d7ca6325b265745487a158c45e697741e7ec84b86b338ecbfd511e98)
- [resources/views/Widgets/Common/BackgroundWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-bd9967b42e5604fbd1cc0034b2ed9fbc4bb18113880fe371167076f046aee956)

#### Additional template changes for performance improvements

- [resources/views/Widgets/Header/NavigationWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-d9d8d5418b1e74986dcb27dfa315d297f65a5f90efed0734e8ab495651cab594)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-2696f6a2e31a39130c691133b3d6fdf30b218a6bdbbd0717433c835d060c3f66)
- [resources/views/Widgets/Item/AddToBasketWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files#diff-130e6f2327939a6da964755351a1ae84298251d3c24de27e53214e91775dca4e)
- [resources/views/Category/Item/CategoryItem.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files?diff=split&w=1#diff-6e3fe08ffe8086b5176c1c0451cb0c0034b99195843630994e5e79347f8d1158)
- [resources/views/PageDesign/Partials/Header/DefaultHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files?diff=split&w=1#diff-19f0c0c56118a0d17212318a2cf8c6e113276dc4c61779c2317b2e7a0976db31)
- [resources/views/PageDesign/Partials/Header/Header.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files?diff=split&w=1#diff-f2a11c8bc92192c490363ceeb2b7e9a02819568c77971a10e43eedc93270014f)
- [resources/views/Widgets/Category/Filter/SelectedFilterWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files?diff=split&w=1#diff-bb4d6cc6416dadd32734558f042315abb70692052e3f4eeda9018bc1b293b375)
- [resources/views/Widgets/Category/ItemGridWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2712/files?diff=split&w=1#diff-1419cc783c69f7d9ffa8a59dfa07c63a77d349711edb01dd573f8119d0a5946d)

#### Other changes

- [resources/js/src/app/components/customer/AddressInputGroup.vue](https://github.com/plentymarkets/plugin-ceres/pull/2782/files#diff-5445acdb5dffc6cd08b75fb1bf432147c3f133b8de32af76563a4c97a544474a)
- [resources/views/MyAccount/MyAccountView.twig](https://github.com/plentymarkets/plugin-ceres/pull/2782/files#diff-dbc71118894a6415be3f82e4ee31dc1e6b7c3160b45b887ccce71f6620824d7c)
- [resources/views/Widgets/Customer/AddressWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2782/files#diff-47efd06234499d9fa52810e58ce5e6d9983e522de814c92e8ff66f4b010f0db5)
- [resources/views/Widgets/Basket/BasketWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2798/files#diff-a04406229e93c83b77582c9ca6224de6a07407290c3de61766703547c259a9f3)
- [resources/js/src/app/components/customer/CountrySelect.vue](https://github.com/plentymarkets/plugin-ceres/pull/2821/files#diff-d522167cca732f4be9af95ab75e109d08edeaeda8b145a0f17a97113c67374e9)
- [resources/js/src/app/components/item/QuantityInput.vue](https://github.com/plentymarkets/plugin-ceres/pull/2828/files#diff-3023cfd864b216b918be19d49ca9b82e9eadb47d5efc185483630cdd3f54c82a)
- [resources/views/Item/SingleItemWrapper.twig](https://github.com/plentymarkets/plugin-ceres/pull/2804/files#diff-192a8837dba88964356b7ecd49003fe083ed719e2c601b9623e6dd4b24be9326)
- [resources/views/Widgets/MyAccount/GreetingWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2779/files#diff-c428531b614621aa7ec1fe56507582fcd923aeae8342bfb3c0d2bbbe650c69be)

## v5.0.28 (2021-04-20) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.27...5.0.28" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added

- The alignment of the text in the greeting widget can now be determined in the widget settings.
- In the Online store step of the plentyShop asisstant, you can now determine which status should be set for orders for which the VAT identification number validation could not be completed. 

### Changed

- A number of user elements have been equipped with ARIA attributes. We would like to thank user @cerwantes for their contribution!
- The favicon is now uploaded to the internal webspace when changes in the plentyShop assistant are saved. It is therefore no longer necessary to save and publish the plugin set in order to effect changes to the favicon.
- The stability of the contact form has been improved.
- The input field for the VAT identification number now contains the country-specific prefix.

### Fixed

- If no favicon is stored in the Ceres settings, the favicon from the client's obsolete settings is now used as a fallback.
- An aria-label has been added to the home icon in the breadcrumbs. You can change the label via the `headerBreadcrumbHome` entry in the multilingualism interface. We would like to thank user @cerwantes for their contribution!
- Due to legal reasons, the list of graduated prices in the single item view now also includes the base price if the display of the base price is activated for this item.
- A defective `<img>` tag was displayed in the header if no company logo had been stored in the Ceres settings. This behaviour has been fixed.
- Payment method dependent surcharges and rebates are now taken into account if the payment method of an already existing order is changed.  
- Under certain circumstances, the currency was displayed incorrectly in the order overview in the My Account section. This behaviour has been fixed.
- Due to an error, only one translation file per plugin could be used in the frontend. This has been fixed.
- The minimum order quantity of an item or a price is now taken into account in the quantity input.

### Changed templates

- In Ceres 5.0.28 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/views/Widgets/MyAccount/GreetingWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2779/files#diff-c428531b614621aa7ec1fe56507582fcd923aeae8342bfb3c0d2bbbe650c69be)
- [resources/js/src/app/components/item/GraduatedPrices.vue](https://github.com/plentymarkets/plugin-ceres/pull/2765/files#diff-57df8453013ee1dd0821c871b25d89e42eb2ff2ed7d491f2141aacb299ada6b9)

## v5.0.27 (2021-04-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.26...5.0.27" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- The favicon from the plugin settings is displayed as long as no favicon is uploaded to the internal webspace.
- Under certain circumstances the store special component produced JavaScript errors in the console. This has been fixed.

## v5.0.26 (2021-04-06) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.25...5.0.26" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added 
- The plentyShop assistant now includes a setting with which you can determine how the customer login should work for systems that use multiple clients. Please refer to [this changelog thread in the forum](https://forum.plentymarkets.com/t/mehrere-kontakte-mit-der-selben-e-mail-adresse-koennen-sich-bei-unterschiedlichen-mandanten-einloggen-multiple-contacts-with-the-same-email-address-can-log-into-different-clients/630567) for further information.

### Changed 

- The entered CSS class for facets and facet values is now output in the frontend.
- You can now set the maximum number of displayed categories of the second level for the normal menu in the widget settings in the ShopBuilder.
- The stored favicon is now uploaded to the respective webshop domain after saving and deploying the plugin set. It is thereby also taken into account by the mobile Google search. **Important** Due to this change, changes to the favicon only become effective after saving and deploying the plugin set!
- Item images in the basket and the wish list now link to the variation page. We would like to thank @cerwantes for their contribution!
- External search providers can now directly submit the entire item data in order to improve the performance of the external search. This requires that the item data is submitted in the appropriate data structure.
- Fixed elements are no longer calculated if they are deactivated.

### Fixed 

- In the desktop view of the Safari browser, certain cursor movements erroneously triggered the expansion of drop-down menues in the navigation. This has been fixed.
- The "More..." button in the navigation was not displayed correctly. This has been fixed.
- In the plentyShop assistant, the setting **Default payment method** in the step **Defaul settings** did not list all plugin payment methods. This has been fixed.
- Wish list items with a minimum order value of 0 or an interval order value of either more than or less than 1 could not be moved directly to the basket. This has been fixed.
- Updating an item in the basket now also updates the base price.

### Changed templates

- In Ceres 5.0.26 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/js/src/app/components/itemList/filter/ItemFilter.vue](https://github.com/plentymarkets/plugin-ceres/pull/2753/files#diff-eab69464064e5200e309de7a80e4fa43773919c60a5f31d5997058b8f7e2f478
- [resources/views/PageDesign/Partials/Head.twig](https://github.com/plentymarkets/plugin-ceres/pull/2697/files#diff-33a10158d672d50c9bc1c0e8a46fbd8edb701925dcb3f619c6ff6f8ca11e45ee)
- [resources/js/src/app/components/basket/list/BasketListItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/2754/files#diff-2e0729c79085beac37d2ad03e5d1a25ddec4020ecf8e3551d50e64a6cf5f91d3)
- [resources/js/src/app/components/wishList/WishListItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/2754/files#diff-be8788b59e5887730f9bb4aa5a12d093908265ff19c26bb5ddca99485e7d7621)

## v5.0.25 (2021-03-22) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.24...5.0.25" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed
- The last paragraph of the text widget for inline editing had a spacing at the bottom, which made it impossible to use a text widget without this spacing. Thus, this was removed.
- In the output for the translations of "Brutto" (Ceres::Template.checkourtGross) and "Netto" (Ceres::Template.checkoutNet), parentheses were shown in the sums and could not be removed. Thus, the parentheses were transferred to the translations and can now be removed.
- When changing the salutation in the address selection, the fields are now only cleared when switching between a person's salutation and a company.

### Fixed
- The variation selection did not respond to user input if all selectable variations weren't purchasable.
- Spacings were missing on the standard pages of the legal texts. These have been added.

## v5.0.24 (2021-03-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.23...5.0.24" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added 

- In widgets for search results, it is now possible to hide the title.

### Changed

- In the translations for "Gross" `(Ceres::Template.basketGross)` and "Net" `(Ceres::Template.basketNet)` in sums, parentheses appeared that could not be removed. The parentheses have been transferred to the translations and can now be removed.
- Due to compatibility reasons, the `ceres-checkout.scss` is now loaded in the ShopBuilder regardless of the route.

### Fixed 

- Due to an error, the settings in the navigation widget for the display type "MegaMenu" had an impact on the display type "Normal". This has been fixed.
- In the footer template, no URL could be entered for the first entry of the given list widget. This has been fixed.
- From now on, the overlay for changing the password is directly opened when using the "forgotten password" link from your emails.
- In case the "Legal text" widget was added to the footer as last element, a second scrollbar was shown. This has been fixed.
- The clickable area of select boxes is now bigger, which means that they can be opened via the label. Furthermore, missing for attributes have been added.
- The route on the order confirmation page for given order properties of the type file was incorrect. This has been fixed.
- In case the email dispatch had not been set up yet, one of the error messages wasn't displayed in the contact form.
- An empty result when using external searches led to an increase in the TTFB. This problem has been solved.

### Changed templates

- In Ceres 5.0.24 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/views/Widgets/Header/NavigationWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2687/files#diff-d9d8d5418b1e74986dcb27dfa315d297f65a5f90efed0734e8ab495651cab594)
- [resources/js/src/app/components/basket/BasketTotals.vue](https://github.com/plentymarkets/plugin-ceres/pull/2698/files#diff-74c12ada105a013f79bbea3a162d3e4358d1afa3f38c3e9e00894a3ab6ad01c1)
- [resources/views/PageDesign/PageDesign.twig](https://github.com/plentymarkets/plugin-ceres/pull/2682/files#diff-6103acda40fc331c6f5ba92faab9976e92848d8fde0e9af7fe34abd593885128)
- [resources/views/Widgets/Header/SearchSuggestionWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2695/files#diff-4213d7ceb8c8a526388dda36535e762c171c37147183856d9801b5f8b18f6c34)

## v5.0.23 (2021-02-22) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.22...5.0.23" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added 

- The item list widget now contains the option to create a list that contains items from the entire range of products.
- The correct flag icon is now displayed if Northern Ireland is selected as the country of delivery.

### Changed

- The factory classes for generating widget settings have been relocated to the ShopBuilder module. The classes in Ceres have been marked as **deprecated**.
- The sorting of countries of delivery is now rendered server-side.

### Fixed 

- Due to a syntax error in the top bar widget, the button for the currency selection was not always displayed correctly. This has been fixed.

### Changed templates

- In Ceres 5.0.23 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/views/PageDesign/Partials/Header/DefaultHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/2664/files#diff-19f0c0c56118a0d17212318a2cf8c6e113276dc4c61779c2317b2e7a0976db31)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2664/files#diff-2696f6a2e31a39130c691133b3d6fdf30b218a6bdbbd0717433c835d060c3f66)

## v5.0.22 (2021-02-11) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.21...5.0.22" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed 

- Due to an error, Google reCAPTCHA prevented the sending of contact forms that included an attached file. This has been fixed.
- The file selection of the email attachment widget can now be opened by clicking the input field.
- Selected files in the email attachment widget can now be deleted.
- Under certain circumstances, autocompletion could fill out several honeypots in Chrome. This has been fixed.

## v5.0.21 (2021-02-09) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.20...5.0.21" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added 

- We added aria labels for reasons of accessibility.
- The email attachment widget was added to the ShopBuilder. The widget makes it possible to attach files to emails that are sent via the contact form.

### Changed

- Images displayed in the category description now have a maximum width.
- `<alt>` and `<title>` attributes are no longer placed on `<picture>` elements. The `<title>` attribute is now placed on `<img>` elements.
- The secret Google reCAPTCHA key has been removed from the global configuration object.
- The icon for deleting addresses in the ShopBuilder has been changed from an X to a waste bin. We would like to thank @daniel-mannheimer for their contribution.
- Buttons for saving the cookies selection have been added to the privacy settings widget.

### Fixed

- Selecting an address in the checkout could lead to an error. This has been fixed.
- The company logo could overlap the button for the category navigation on mobile devices. This has been fixed.
- On small displays it was possible that clicking the attribute selection of an item reset the scrolling position. This has been fixed.
- Due to an error, users were redirected to the checkout with an empty shopping cart if they aborted the payment process of an external payment provider by clicking the back button in the browser. The user is now instead redirected to the order confirmation. The status of the order is set to "Not yet paid".

### Changed templates

- In Ceres 5.0.21 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/views/PageDesign/Partials/Header/DefaultHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/2629/files#diff-19f0c0c56118a0d17212318a2cf8c6e113276dc4c61779c2317b2e7a0976db31)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2629/files#diff-2696f6a2e31a39130c691133b3d6fdf30b218a6bdbbd0717433c835d060c3f66)
- [resources/views/PageDesign/Partials/Footer.twig](https://github.com/plentymarkets/plugin-ceres/pull/2623/files#diff-8c1bbe12524104daee76bd9f9f8adbfa1e77c0c4bb3c44fc2cf9b762750b1f13)
- [resources/views/Widgets/Footer/LegalInformationWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2623/files#diff-a517288701fc39e24858ace7b40583eb007661e59be3298d5c4ada425898dcfc)
- [resources/views/Widgets/Common/ImageCarouselWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2622/files#diff-43b0576fe9cb61d0343a4aa220f562347c237717821f276ab632973e3970ec96)
- [resources/views/Widgets/Common/BackgroundWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2621/files#diff-bd9967b42e5604fbd1cc0034b2ed9fbc4bb18113880fe371167076f046aee956)
- [resources/views/PageDesign/Partials/Header/Navigation.twig](https://github.com/plentymarkets/plugin-ceres/pull/2625/files#diff-88b04651d27953ff32bd22a1b7764d7a9b470277695ccefb7c9b2fa07ad4aab7)
- [resources/views/Widgets/Header/NavigationWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2625/files#diff-d9d8d5418b1e74986dcb27dfa315d297f65a5f90efed0734e8ab495651cab594)
- [resources/views/Widgets/Common/PrivacySettingsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2646/files#diff-75c3277b48fbbac401ca5a942e7bea618e94fcfda96c19d2c5e83375e82f25d7)


## v5.0.20 (2021-01-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.19...5.0.20" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- If your theme uses the CSS property `position:sticky`, you need to overwrite the `overflow-x: hidden` property in the `.app` container in order to ensure the correct functioning of the sticky behaviour. plentyShops without a theme are not affected by this.

### Changed

- Images in the background image widget now have accessible alternative text attributes.
- Horizontal overflow in the `.app` container is now prevented through the inclusion of `overflow-x: hidden`. This inhibits the sticky behaviour of the CSS property `position:sticky`.

### Fixed 

- Due to a faulty setting pertaining to the number of items per page, items could be displayed incorrectly. This behaviour has been fixed.
- In the My Acount area and the order confirmation, different currencies were displayed for items and totals if the selected currency was not the system currency. This behaviour has been fixed.

### Changed templates

- In Ceres 5.0.20 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/views/Widgets/Common/BackgroundWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2606/files#diff-bd9967b42e5604fbd1cc0034b2ed9fbc4bb18113880fe371167076f046aee956)
- [resources/views/Checkout/OrderDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/2611/files#diff-49e9a28ec33181e8fd3720d39345363b8b0614f2bf29ceb66b403ef22c18bd4d)
- [resources/views/MyAccount/Partials/OrderHistoryListItemDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/2613/files#diff-dcc9c181484eba069617434b9c7c20b7906e9ab74907f134720e220a818c968a)
- [resources/views/Widgets/OrderConfirmation/PurchasedItemsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2613/files#diff-2cee15b4b8add92d304d2f4cbbb5a5891a5752c533b564f1e1d152982c1e62d0)


## v5.0.19 (2021-01-05) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.18...5.0.19" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Due to an error, the totals in the shopping cart and the order confirmation also listed order characteristics for which the setting **Display as additional costs** was active. This has been fixed.

## v5.0.18 (2021-01-04) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.17...5.0.18" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Added 

- You can now determine the search operator of the online shop search in the Ceres assistant. You can either select an **And** or an **Or** operator.

### Changed

- The totals in the shopping cart and the order confirmation can now display the additional costs of characteristics. The option can be activated in the settings of the price information widget.

### Fixed

- Under certain circumstances, the sticky container widget reset to its original position while scrolling, which led to a shaky display of the widget. This behaviour has been fixed.
- Images that are integrated into text widgets via data fields now have a maximum width.

## v5.0.17 (2020-12-21) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.16...5.0.17" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- Item lists that have been set up via the Ceres configuration and have been integrated into the online shop via layout containers are now limited to a maximum of 50 items.

### Fixed 

- If the image uploaded as an order proporty exceeded the allowed file size, no error message was displayed. This has been fixed. The text of the corresponding error message can be customised in the entry **errorPostTooLarge** in the multilingualism interface. 
- The alternative text of images used in the background image widget now works as intended for images loaded from the webspace. 
- You can now use the translation entry **basketRebateSign** to display a sign, such as plus/minus, before the discount value.
- The customised entries of the navigation tree widget that included umlauts were not displayed correctly. This behaviour has been fixed.
- Due to an error, the contact form did not consider the input field for blind copies. This has been fixed.
- The missing translations of the lightbox have been added.
- The Ceres assistent now directs the user to the plugin set instead of the setup assistent if a payment method has been installed but is still inactive.
- Item lists no longer extend beyond the confines of the page.

## v5.0.16 (2020-12-01) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.15...5.0.16" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- In order to display text, such as "instead of", next to the strikethrough price for live shopping offers on the single item view, the translation key **crossPriceSpecialOffer** has to be filled in in the multilingualism interface.

### Added 

- The newsletter widget now uses Google reCAPTCHA.

### Fixed

- If the shopping cart contained multiple customisable gift cards, only of these could be edited. This has been fixed.
- No link text was stored for the homepage symbol in the breadcrumb widget. The link text can now be entered for the translation key **headerBreadcrumbHome** in the multilingualism interface.
- For live shopping offers, the single item view now uses the normal sales prices as the strikethrough price.
- Under certain circumstances, the order confirmation could contain rounding errors. This behaviour has been fixed.
- Changes to the height of the sticky container widget were only effected by changing the window size or scrolling the page. This behaviour has been fixed.
- Under certain circumstances, icons could not be displayed in the online shop. This has been fixed.
- The Twig function `queryString` now uses query parameters in the format of the RFC 3986 standard.
- Due to an error, the correct URL was not always stored for the displayed image of a live shopping widget. This has been fixed.
- Due to an error, refreshing the URL parameters sometimes did not set the correct URL. This has been fixed.
- Under certain circumstances that involved third-party plugins, the CSRF token was not sent correctly. This has been fixed.
- A group for payment provider cookies has been added to the consent tool.
- The overview of the assistant configurations now also shows the entries for inactive plugin sets.
- In a multilingual online store, guest accounts were redirected to the homepage in the default language if they accessed the checkout without items in the shopping cart. Now, guest accounts are redirected to the homepage in the selected language.
- The setting **CSS class** of the widget privacy policy checkox did not work as intended. This has been fixed.

### Changed templates

- In Ceres 5.0.16 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/js/src/app/components/myAccount/EditCouponOverlay.vue](https://github.com/plentymarkets/plugin-ceres/pull/2537/files#diff-3385c5d0e4771710be00b0a70811ac5b8018e23b7da889cb9923959dbb8a9a29)
- [resources/views/Widgets/Header/BreadcrumbWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2528/files#diff-130e6f2327939a6da964755351a1ae84298251d3c24de27e53214e91775dca4e)
- [resources/js/src/app/components/item/ItemPrice.vue](https://github.com/plentymarkets/plugin-ceres/pull/2533/files#diff-eed3a26bc24bb9bbfd91d04e54f17d682022d8a9b1918fe760fe93d366beed22)
- [resources/views/Checkout/OrderDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/2521/files#diff-49e9a28ec33181e8fd3720d39345363b8b0614f2bf29ceb66b403ef22c18bd4d)
- [resources/views/Widgets/OrderConfirmation/PurchasedItemsWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2521/files#diff-2cee15b4b8add92d304d2f4cbbb5a5891a5752c533b564f1e1d152982c1e62d0)
- [resources/views/Widgets/Form/AcceptPrivacyPolicyWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2548/files#diff-accd1ccbc275c3ac061bf4ac777378fe335097303db30e1d9594c514d7c143b4)

## v5.0.15 (2020-11-09) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.14...5.0.15" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- The contents in the variation selection are now displayed in an ordered fashion.

### Fixed

- The scrolling performance for widgets in the header has been improved.
- If the option **Medium** or **Large** had been selected for the **Size** setting of the additional information widget, the corresponding widget overlay could no longer be closed. This has been fixed.
- Due to an error, the default header was sometimes displayed on item category pages instead of the ShopBuilder header. This has been fixed.
- Attributes of unavailable variations are now displayed as greyed out and struck through in the variation selection, analogously to attributes of non existent combinations.
- A wrong value was used for the third priority of the recommended sorting for the search results page. This behaviour has been fixed.
- Item names on the order confirmation were limited to two lines, which could lead to the truncation of item names. This has been fixed.
- Due to an error, the order quantity was not correctly updated when a variation had been changed. This has been fixed.
- Percentage surcharges for order characteristics did not consider graduated prices correctly. This has been fixed.

### Changed templates

- In Ceres 5.0.15 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/js/src/app/components/item/VariationSelect.vue](https://github.com/plentymarkets/plugin-ceres/pull/2432/files#diff-3bf7e50898b2d79d717300fe7c276487aea49cb917f014bf3f8ea27c6b392149)

## v5.0.14 (2020-10-20) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.13...5.0.14" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### ToDo

- Due to changes to ShopBuilder widgets, it is necessary to regenerate the ShopBuilder contents via the **Regenerate contents** button in the **CMS » ShopBuilder** menu.
- Users who have made changes to the text widget (i.e. through CSS) should check whether the margins of their text widgets need to be adjusted.

### Changed

- Redundant JavaScript for sorting images has been removed from the components `CategoryImageCarousel.vue` and `ItemImageCarousel.vue`.
- The currency Kenyan Shilling (KES) has been added to the available currencies.
- The sorting widget now also displays additional sorting provided by external plugins.
- Upon clicking the "Purchase" button in the checkout, the user input is now checked immediately, before the client interacts with the server.

### Fixed

- Several places in the online store did not consider currency icons for displaying currencies.
- In the Safari browser, the icons for payment providers and shipping service providers were contorted. This has been fixed.
- The meta tag `og:image` was not correctly filled in in the category view. This behaviour has been fixed.
- If the shopping cart contained an inactive item, incorrect totals were displayed. This behaviour has been fixed.
- Due to an error, different sortings in live shopping widgets always displayed the same data. This has been fixed.
- In the ShopBuilder preset for the item view, the translation key `Ceres::Widget.dataFieldTextsTechnicalData` was used for the multilingual entry "Technical Data" instead of `Ceres::Template.singleItemTechnicalData`. This has been fixed.
- The adjustable margins of the text widget were applied to the inner container of the widget. Therefore, paddings and margins behaved identically. This has been fixed.

### Changed templates

- In Ceres 5.0.14 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/views/Widgets/Category/ItemSortingWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2418/files#diff-457d3c37f4e91ce7e9b896280e97de47)
- [src/Widgets/Category/ItemSortingWidget.php](https://github.com/plentymarkets/plugin-ceres/pull/2418/files#diff-b29141ef191aa2121e0995f64cf05edc)
- [resources/views/Widgets/Common/InlineTextWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2445/files#diff-e7dc3611e423358f168f99f3a60b6bfa3d2af686cfee952aca2e93ca91a3be62)

## v5.0.13 (2020-09-28) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.12...5.0.13" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- We added the option **Display on legal pages** to the settings of the breadcrumbs widget. This setting only applies to legal pages that have been created with the ShopBuilder.
- The data for breadcrumbs is now always loaded if a user is on an item or content category page that is linked with the ShopBuilder. Therefore, the breadcrumbs widget is always able to display the path to the current category.
- Performance has been improved for online stores that use an external search provider.
- We removed an obsolete setting from the item data table widget.

### Fixed

- The field `addressFieldName1` appeared twice in the multilingualism interface. This has been fixed. We would like to thank @Lauflust for the contribution.
- Under certain circumstances, the sticky container widget reset to its original position while scrolling, which led to a shaky display of the widget. This behaviour has been fixed.
- The input field of the guest order widget was not automatically selected. This has been fixed.
- The `normalizeUrl` function could lead to errors if the setting **Trailing slash** was inactive, but the page was accessed via a URL with a trailing slash. This behaviour has been fixed.
- The loading animation was not displayed while the step-by-step navigation loaded additional categories. This has been fixed.
- The navigation tree now checks if subcategories exist, even if the next level of the category tree has not been loaded.
- Under certain circumstances, an error could occur if no API key had been stored for Google reCAPTCHA. This has been fixed.
- The meta tag `og:image` was not correctly filled in in the category view. This behaviour has been fixed.
- In a standard My Account area, it was possible to create returns, even though the corresponding setting in the Ceres configuration was inactive. This setting now applies as intended.

### Changed templates

- In Ceres 5.0.13 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/scss/ceres/components/_sticky-element.scss](https://github.com/plentymarkets/plugin-ceres/pull/2378/files#diff-5e661ae82cc538fe6612799243d943ad)
- [resources/js/src/app/components/category/StepByStepNavigation.vue](https://github.com/plentymarkets/plugin-ceres/pull/2374/files#diff-50c90a6655c0e7cbcf03de0a7b2c1e66)
- [resources/views/Widgets/Navigation/StepByStepNavigationWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2374/files#diff-d3ea59b4c6ebb4395ce978e00fc64e0b)
- [resources/views/Widgets/Item/ItemDataTableWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2380/files#diff-be40dbd506648d6e32e18e5b8c819461)
- [resources/views/Category/Macros/CategoryTree.twig](https://github.com/plentymarkets/plugin-ceres/pull/2356/files#diff-09d849cf28f22de603fc51c7165ab279)
- [resources/views/ResultFields/CategoryTree.fields.json](https://github.com/plentymarkets/plugin-ceres/pull/2356/files#diff-aadbcb4d0f3fe3e283b2f032903fb518)


## v5.0.12 (2020-09-14) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.11...5.0.12" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed 

- The selection of the variation content now impacts the variation selection to a lesser degree, so that the attribute selection can no longer be blocked by the content selection.

### Fixed

- Under certain circumstances, the order history did not display the correct currency for orders with non-standard currencies. This behaviour has been fixed.
- During the creation of an order, the customer wish was not passed on correctly if the customer had aborted the PayPal payment procedure. This behaviour has been fixed.
- A notification is now displayed when an invalid gift card is removed from the shopping cart.
- Under certain circumstances, the SingleItem template could not be detected, which could lead to display errors. This has been fixed.
- Due to an error, the preselected salutation in the address input was not working as intended. This has been fixed.

### Changed templates

- In Ceres 5.0.12 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/js/src/app/components/checkout/ContactWishInput.js](https://github.com/plentymarkets/plugin-ceres/pull/2365/files#diff-37b747947d823f75ad5cb175e3859af1)
- [resources/js/src/app/store/modules/CheckoutModule.js](https://github.com/plentymarkets/plugin-ceres/pull/2365/files#diff-02fceefaae66ccd08f2719a2a46c5a8d)
- [resources/views/Checkout/Components/ContactWishInput.twig](https://github.com/plentymarkets/plugin-ceres/pull/2365/files#diff-2e1a9880a29ff28bfdedc4293681a690)
- [resources/views/PageDesign/PageDesign.twig](https://github.com/plentymarkets/plugin-ceres/pull/2368/files#diff-63ac11bb178e21fa2fb744ce21e2cf5f)
- [resources/views/PageDesign/Partials/Header/Header.twig](https://github.com/plentymarkets/plugin-ceres/pull/2368/files#diff-3184d75e16637b83c7f23fae7d39854d)
- [resources/views/Widgets/Common/ItemListWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2368/files#diff-15057fa07b52305012c24a8812db234e)


## v5.0.11 (2020-09-01) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.10...5.0.11" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- The ShopBuilder preset for item sets now includes information on value-added tax and shipping costs.

## v5.0.10 (2020-08-27) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.9...5.0.10" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Due to an error, the value "NOINDEX, NOFOLLOW" for the meta-attribute "robots" was always displayed on the home page. This has been fixed.

## v5.0.9 (2020-08-25) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...5.0.9" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- The settings of the category used for the homepage for meta description and meta keywords are now taken into account and may have to be transferred from the **CMS » Multilingualism** section.
- Due to changes to ShopBuilder widgets, it is necessary to regenerate the ShopBuilder contents via the **Regenerate contents** button in the **CMS » ShopBuilder** menu.
- If the placeholder for the customs tariff number is used on the item view in ShopBuilder, it must be removed once and re-applied.

### Changed

- The component for the privacy settings in the cookie bar is now lazy-loaded.
- Widgets within the drop zone of the filter toolbar widget can now be distributed automatically.
- The meta title for the item view can now be set to one of the 3 item names using a new setting in the Ceres assistant. This setting also controls which of the item names is used when generating the item URL.

### Fixed

- Filters were not displayed in the tag search and the sorting did not work correctly. This has been fixed.
- The meta description and keywords of the homepage are now used from the category settings when a category is linked as the homepage in the ShopBuilder.
- For the **Item image** widget, the path was not loaded at runtime. This is fixed now. 
- User's data were not available if no top bar widget was used or the **Show customer login** setting was not active. This was fixed.
- The **Step-by-Step navigation** widget can now be used correctly on the category for the homepage.
- In the **Order data** widget, the customer number was not displayed despite the setting being set on the widget. This has been fixed.
- The customs tariff number was not displayed correctly in the **Table data** widget and as a placeholder in text widgets. The behavior was fixed.
- If there was no sorting widget on the category page, the sorting was set to **Name A-Z** when changing the number of items. The behavior was fixed.
- On the item page, when **Please select** was selected, the translation of **From price** was also used, even if the cheapest variation was not displayed. This behavior has been fixed.
- Due to an error, Google reCAPTCHA v2 was not reset correctly on the contact page and on registration. This has been fixed.

### Changed templates

- In Ceres 5.0.9 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/js/src/app/components/item/SingleItem.vue](https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...stable#diff-f4088e12496aa3b97ca8c8f2e6a1305c)
- [resources/js/src/app/components/pageDesign/CookieBar.vue](https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...stable#diff-1160de3ac277adf2c7bf4aaa280eaf1a)
- [resources/views/Homepage/Homepage.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...stable#diff-3411adc67bf663071159e94df552304d)
- [resources/views/Item/SingleItemWrapper.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...stable#diff-1cafcbdef6141f616d753d275daa9fa7)
- [resources/views/Widgets/Category/ToolbarWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...stable#diff-b0944a30c51905fae124c198cd99d045)
- [resources/views/Widgets/Item/ItemImageWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...stable#diff-8cf79fbacbbb5d468da56a6c071c7b24)
- [resources/views/Widgets/OrderConfirmation/OrderDataWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.8...stable#diff-fce7fd292bcaa8f8d9b62bd5d19557c7)

## v5.0.8 (2020-08-05) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.7...5.0.8" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO
- Due to changes to ShopBuilder widgets, it is necessary to regenerate the ShopBuilder contents via the **Regenerate contents** button in the **CMS » ShopBuilder** menu.

### Added

- The settings for margins have been added to the Additional information widget.

### Changed

- The layout container `Checkout` for overriding the checkout can now be used for ShopBuilder contents.
- The change regarding the **Minimum height** of the background image widget that was included in version 5.0.7 has been reverted because it could negatively impact the layout of the online store.

### Fixed

- If the **age restriction** was displayed via a data field in the ShopBuilder, a wrong value was output for the entry **Ages 18 and up**. This behaviour has been fixed.
- The widget step by step navigation no longer renders placeholders if no child categories exist for the current category.
- The validation of the selected value was not carried out for the option **Drop-down list** of the selection widget. This has been fixed.
- The address for the Google Maps widget is now encoded on the client side, so that the Google API key can be limited to the online store domain when it is generated. 

### Changed templates

- In Ceres 5.0.8 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
-[resources/views/Checkout/CheckoutCategory.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.7...stable#diff-500f84701cb3bec84b3253ca4fc12310)
- [resources/views/Widgets/Common/GoogleMapsWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.7...stable#diff-34a9c4fdd67b5eafe0fe676146a2d341)
- [resources/views/Widgets/Grid/AdditionalInformationWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.7...stable#diff-ce1d0ae261c2326eb512546452d84cce)
- [resources/views/Widgets/Helper/WidgetHelper.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.7...stable#diff-fe76ce66af52961ed5cbcd984b98681e)
- [resources/views/Widgets/Navigation/StepByStepNavigationWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.7...stable#diff-d3ea59b4c6ebb4395ce978e00fc64e0b)

## v5.0.7 (2020-07-28) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.6...5.0.7" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO
- Due to changes to ShopBuilder widgets, it is necessary to regenerate the ShopBuilder contents via the **Regenerate contents** button in the **CMS » ShopBuilder** menu.
- Changes to the background image widget can lead to shifts in the online store layout. Inspect your layout and, if necessary, change the setting **Minimum height** of the background image widgets you are employing to the option **None**.

### Changed

- Overlong links could negatively impact the online store layout. Overlong links will now wrap by default.
- The media breakpoints of the CSS class `.alert` now only apply to the parent class `.notification-wrapper` since they could negatively impact the layout of the online store.
- The widget step-by-step navigation now displays a maximum of 2 categories on mobile devices per default in order to improve readability.
- The option **Auto** for the **Minimum height** setting of the background image widget has been reworked. If the background image widget is placed in a grid widget, the option **Auto** scales the background image to the height of the highest widget in the same grid.

### Fixed

- Due to an error, the ShopBuilder header was not displayed correctly under certain circumstances. This has been fixed.
- The "Back to top" button was displayed even if the user had not scrolled down yet. This has been fixed.
- The "Forgot your password" modal only opened upon the second access if the user was on the page linked to the login route. This has been fixed.
- The login widget led to an error in combination with the `LayoutContainer` macro. This has been fixed.
- Under certain circumstances, custom CSS could override the background image widget. This has been fixed.

### Changed templates

- In Ceres 5.0.7 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/views/PageDesign/Partials/Footer.twig](https://github.com/plentymarkets/plugin-ceres/pull/2323/files#diff-47994aea903bc5cda6db336417059b47)
- [resources/views/PageDesign/Partials/PageMetadata.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.6...stable#diff-2043824c28b2ea46b69dc85c42439175)
- [resources/views/Widgets/Login/LoginWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.6...stable#diff-03fa829aa8eb859e9c0be49e489497d5)
- [resources/views/Widgets/Navigation/StepByStepNavigationWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.6...stable#diff-d3ea59b4c6ebb4395ce978e00fc64e0b)

## v5.0.6 (2020-07-21) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.5...5.0.6" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- If faulty code was entered into the FAQ widget, the FAQ widget and subsequent widgets could no longer be edited. In this case, you can now use the ShopBuilder's safe mode to correct the faulty code.
- The event listeners for scrolling have been set to passive for the sticky container widget. This improves client-side performance.
- The time until search suggestions are queried has been reduced from 500 milliseconds to 200 milliseconds in order to make the search more responsive.
- The two toggles "Do you want to integrate Google reCAPTCHA?" and "I want the online store language to adjust to the browser language." have been removed from the Ceres assistant. The toggles served to display additional settings. These settings are now displayed by default.

### Fixed

- Under certain circumstances, the dynamic calculation of set prices was carried out incorrectly. This has been fixed.
- The top bar widget setting **Display customer registration** did not work properly if the setting **Display customer login** was inactive. This has been fixed.
- In item list widgets, the option **No caption** for the setting **Caption type** did not work as intended. This has been fixed.
- In the Safari browser, the buttons for the shopping cart and the checkout could be truncated in the shopping cart preview. This has been fixed.
- The Owl carousel used in the Ceres image carousel has a known display error, due to which a white line is visible on the left side of an image. This has been fixed for Ceres.
- For export deliveries, the order confirmation displayed varying shipping costs for gross and net sums. This has been fixed.
- In the item data table widget, the entry **No age rating** was not displayed. This has been fixed.
- For orders that were completed via cash in advance and for which the order type **Advance order** had been set, the order confirmation did not display banking information. This has been fixed.
- The HTML markup in the text input field for variation properties was displayed incorrectly in the order confirmation. This has been fixed.
- The layout container `LoginOverlay.ExtendOverlayButtons` did not work as intended in the login widget. This has been fixed.
- The tooltip popper on the registration page, which can be opened via the information icon, was displayed outside the visible area on mobile devices. This has been fixed.
- Inactive countries in the country of delivery selection in the top bar widget were not displayed as inactive. This has been fixed.
- If the tool bar for selected filers was expanded automatically after a reload, manually collapsing or expanding the toolbar did not toggle the jQuery classes `class="collapsed"` and `aria-espanded="true"`. This has been fixed.
- In the Ceres assistant, empty values could not be saved for options that are selected via checkbox groups. This has been fixed.
- The label tag of facets from the `ItemFilter` component have been expanded by a CSS class that consists of the string "option-" and the ID of the facet. This serves to reintroduce styling possibilities that have been removed in a previous version.

### Changed templates

- In Ceres 5.0.6 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/js/src/app/components/customer/login/UserLoginHandler.vue](https://github.com/plentymarkets/plugin-ceres/pull/2288/files#diff-2ebcb5967c7916456a856707903d3e9e)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2288/files#diff-f16a56b62b13bd773d56c1b4d739dfe4)
- [resources/views/Checkout/Macros/OrderTotals.twig](https://github.com/plentymarkets/plugin-ceres/pull/2293/files#diff-b38340ae49c1aec8f7f5c17e150d35f8)
- [resources/views/Checkout/OrderDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/2289/files#diff-b71a6feed738cf93712cc1a55102b6d6)
- [resources/views/Checkout/OrderDetails.twig](https://github.com/plentymarkets/plugin-ceres/pull/2298/files#diff-b71a6feed738cf93712cc1a55102b6d6)
- [resources/views/Widgets/OrderConfirmation/OrderDataWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2289/files#diff-fce7fd292bcaa8f8d9b62bd5d19557c7)
- [resources/views/Widgets/Login/LoginWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2302/files#diff-03fa829aa8eb859e9c0be49e489497d5)
- [resources/views/Widgets/Common/CollapseWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2303/files#diff-7e8dd5f9ec03fca667d172a097ecd5e4)
- [resources/js/src/app/components/pageDesign/ShippingCountrySelect.vue](https://github.com/plentymarkets/plugin-ceres/pull/2306/files#diff-1b041b3611e8e3f27f418054f87356c2)

## v5.0.5 (2020-06-30) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.4...5.0.5" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- The build files **ceres.js.map**, **ceres.min.js**, and **ceres.min.js.map** have been removed for reasons of obsolescence.
- You can now display an additional tooltip for attributes that are displayed as images. You can customise the text of the tooltip in the multilingualism interface. You can find the key **singleItemAttributeTooltip** in the section **Ceres » Single item view**. You can use the variable **:attribute** to display the attribute's name and the variable **:value** to display the name of the attribute's value.

### Fixed

- The font files of FontAwesome have been updated.
- In cases of more than 500 variations, lazy loaded variations are now correctly taken into account in the calculation of available combinations.
- Order characteristics in the shopping cart and the shopping cart preview are now displayed in their full length instead of being truncated.
- Long category names in the title of the item list widget could shift the page content on smaller display sizes, thereby leading to display errors. This has been fixed.
- Due to an error in the PrivacySettings component, the toggle buttons for activating and deactivating cookies were always displayed as inactive. This has been fixed.
- The language selection was unable to determine the correct URL for several languages. This has been fixed.

### Changed templates

- In Ceres 5.0.5 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/js/src/app/components/basket/AddItemToBasketOverlay.vue](https://github.com/plentymarkets/plugin-ceres/pull/2276/files#diff-70d685498d2b1326481b12a924516e4d)
- [resources/js/src/app/components/basket/list/BasketListItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/2276/files#diff-c2e68222922bdd120e1bb3e918794353)
- [resources/js/src/app/components/basket/list/SetComponentItem.vue](https://github.com/plentymarkets/plugin-ceres/pull/2276/files#diff-dac784083959e603cf52f3496e646b6c)
- [resources/views/Widgets/Header/TopBarWidget.twig](https://github.com/plentymarkets/plugin-ceres/pull/2279/files#diff-f16a56b62b13bd773d56c1b4d739dfe4)
- [resources/views/PageDesign/Partials/Header/DefaultHeader.twig](https://github.com/plentymarkets/plugin-ceres/pull/2279/files#diff-19096cb359da1fa955ee575070b6a121)

## v5.0.4 (2020-06-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.3...5.0.4" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed 

- The format of dates was displayed incorrectly in the languages French and Dutch. This behaviour has been fixed.
- The URL in the structured data was incorrectly encoded. This has been fixed.
- Due to a faulty CSS adjustment, the PayPal wall was no longer displayed. This has been fixed.

## v5.0.3 (2020-06-02) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- The setting **Preselected salutation** has been added to the registration widget.
- The performance of the ShopBuilder has been optimised for a larger number of properties.
- The enveloping element for the unit of an item on the single item view now uses the CSS class `.is-single-piece` if the unit is "1 piece".

### Fixed

- The lifespan of the consent cookie is now indicated according to the system setting.
- If widgets with expandable elements, such as the toolbar widget, were placed in the background image widget, it was possible that the expandable elements were not displayed correctly. This has been fixed.
- Due to an error, search suggestions were closed too quickly in the desktop view, so that the clicked search suggestion was not opened. This has been fixed.
- The navigation arrows and the close button were missing from the Lightbox. This has been fixed.
- Images in the image box and image carousel widgets that were stored as fallback options were always loaded, even if they weren't necessary. This has been fixed.
- HTML elements with custom background colour could sometimes overlap the background image widget. This behaviour has been fixed.
- In the Firefox browser, it was not possible to use line breaks or multiple space characters in text fields. This has been fixed. We would like to thank @daniel-mannheimer for the contribution.
- The sticky container widget overlapped the expandable area of the toolbar widget. This has been fixed.
- Under certain circumstances, the search results page was displayed incorrectly if the search results stemmed from an external search provider and an item has been set to invisible. This behaviour has been fixed.
- The link to the order confirmation page in the My Account area was incorrect if the order confirmation page had not been created via the ShopBuilder. This has been fixed.
- The multilingualism entries **myAccountChangeEmailInfoText**, **myAccountRepeatEmail** and **myAccountRepeatPassword** have been corrected.

### Changed templates

- In Ceres 5.0.3 we have made changes to a number of template files which are relevant for theme developers. You can find a list of the changed templates below. Each link directs you to the effected changes in the corresponding files.
- [resources/js/src/app/components/common/LazyImg.vue](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-14e714eb9949801b5edce557d611bd37)
- [resources/js/src/app/components/item/ItemPrice.vue](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-f166cdc8c3dee1b7f98ecbe2460d8fcb)
- [resources/js/src/app/components/itemList/ItemSearch.vue](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-11d254ed1e8752285c36e305f9e2f8b3)
- [resources/js/src/app/components/itemList/SearchSuggestionItem.vue](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-522119f0fcf0c45d09b5f571158e678e)
- [resources/js/src/app/components/pageDesign/PrivacySettings.vue](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-f587df95a339e7022c1f7d1493a6cdfe)
- [resources/views/MyAccount/Components/OrderHistoryListItem.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-8eae4ababd4bb1b589bc6b60b0e69262)
- [resources/views/PageDesign/PageDesign.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-63ac11bb178e21fa2fb744ce21e2cf5f)
- [resources/views/Widgets/Common/BackgroundWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-ea4ec8873ffd72f60669593c7bbcc48d)
- [resources/views/Widgets/Common/ImageBoxWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-010b99ceca9e67e975342d0ee3966a3b)
- [resources/views/Widgets/Common/ImageCarouselWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-d4896f7591c4817ccd9887e8b0c17a67)
- [resources/views/Widgets/Common/ItemListWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-15057fa07b52305012c24a8812db234e)
- [resources/views/Widgets/Login/RegistrationWidget.twig](https://github.com/plentymarkets/plugin-ceres/compare/5.0.2...5.0.3#diff-a6656b1994026a00e7ade5a7ab9457c0)


## v5.0.2 (2020-05-12) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.1...5.0.2" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- We added the getter `currentItemVariation` and the variable `mainItemId` to the BaseItemModule in order to facilitate data access.

### Fixed

- Images of the background image widget were not loaded in the Safari browser. This has been fixed.
- Under certain circumstances, the height of a widget with the setting **Aspect ratio** was calculated incorrectly if the widget was placed within a grid widget. This behaviour has been fixed.
- Using the internal links **Return order** and **Shipment tracking** in the link widget could lead to an empty return page. This has been fixed.
- For non-default online store languages, the step by step navigation did not add the language to the URL. This has been fixed.
- Using the new layout containers for the checkout and the single item view could lead to JavaScript errors. This has been fixed.
- When a customer accessed a page for changing their email address or password that had been created with the ShopBuilder, the customer was not automatically logged out. As a result, input fields were not visible. This has been fixed.
- The values of variation properties were not displayed in the wishlist. This has been fixed.
- Objects within separating characters in Vue templates could lead to errors during the interpretation of the templates. This has been fixed.
- Due to an error, search suggestions were closed too quickly in the desktop view, so that the clicked search suggestion was not opened. This has been fixed.
- Due to an error, a notification on the change password page was not output correctly. This has been changed.

## v5.0.1 (2020-04-27) <a href="https://github.com/plentymarkets/plugin-ceres/compare/5.0.0...5.0.1" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- Due to changes to ShopBuilder widgets, it is necessary to regenerate the ShopBuilder contents via the **Regenerate contents** button in the **CMS » ShopBuilder** menu.

### Added

- The settings for margins have been added to the step-by-step navigation widget.

### Changed

- The quantity input in the single item view is now deactivated for items that are unavailable. The input is also deactivated until the necessary item data is loaded.
- The JavaScript for the Owl Carousel is now available in the entire online store.

### Fixed 

- Due to an error, item lists of the type **Last seen** were not displayed in the online store. This has been fixed.
- Image carousels in items lists were displayed incorrectly. This has been fixed.
- The value of the SCSS variable `$yiq-contrasted-threshold` was reset to 186.
- Under certain circumstances, modals could not be edited. This has been fixed.
- The loading animation was displayed permanently for empty wishlists. This has been fixed.
- We fixed faulty behaviour of the variation selection. If a user selects order characteristics for a variation and then changes variations, the order characteristics are now automatically selected when the user returns to the original variation. This does not apply to order characteristics of the type **file**.
- When multiple Google Maps widgets were placed on a single page, only the first Google Maps widget was loaded correctly. This behaviour has been fixed.
- The options for shipping to a Packstation or post office were missing in the My Account area. This has been fixed.
- Under certain circumstances, the order confirmation page displayed incorrect values for orders that included promotional coupons. This behaviour has been fixed.
- The lazy loading of images was not working properly in the Internet Explorer 11. This has been fixed.
- A missing quotation mark has been added to the "URL" entry of the Schema.org data.
- Missing data for the Schema.org data structure for breadcrumbs could cause errors for SEO tools. This has been fixed.
- If the top bar widget was placed in the bottommost position in the header, other widgets could overlap the shopping cart preview under certain circumstances. This behaviour has been fixed. 
- Texts in the step-by-step navigation are now centred.
- Due to an error, the step-by-step navigation was not displayed on the single item view. This has been fixed.
- Invalid colour values in the design settings of the ShopBuilder are now intercepted and replaced by default colour values.
- Users who were not logged in were unable to create returns on return pages that had not been created with the ShopBuilder. This behaviour has been fixed.
- The names of order characteristics were not displayed correctly in the return history and the return order form. This behaviour has been fixed.
- Elements integrated via the two layout containers "BasketPreview.BeforeCheckoutButton" and "BasketPreview.AfterCheckoutButton" were displayed smaller than intended. This has been fixed.

## v5.0.0 (2020-04-14) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.6.0...5.0.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- Themes and plugins that were compatible with former Ceres versions may need to be updated in order to ensure continued compatibility. You can find additional information on updating themes and plugins in our <a href="https://developers.plentymarkets.com/dev-doc/ceres-5" target="_blank" rel="noopener"><b>developer documentation</b>.
- Due to changes to ShopBuilder widgets, it is necessary to regenerate the ShopBuilder contents via the **Regenerate contents** button in the **CMS » ShopBuilder** menu.
- Users who still used the category **Homepage (deprecated) (Ceres)** in the ShopBuilder need to create and link a new homepage category. You should create a plugin set copy of the current state prior to Ceres version 5.0 so that you can duplicate your homepage contents from this plugin set copy to the newly created homepage category in the Ceres 5 plugin set. Otherwise, you will not be able to access your homepage contents without downgrading Ceres to a version below 5.0.
- In order to use the "Did you mean...?" search, users should create and link a new search results page via the search results ShopBuilder preset.
- The default white background has been removed from the following contents: **Shopping cart**, **Checkout**, **Contact page**, **My Account**, **Order confirmation**, **Returns page**, and **Wishlist**. Users should integrate a white background image widget in these contents in order to replicate the former appearance.

### Added

- This version supports <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/item/combining-products.html#3000" target="_blank">Item sets</a>. We added the **Components for item sets** widget to the ShopBuilder. It serves to edit item set contents via the ShopBuilder. This feature is currently in beta.
- This version supports <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/orders/coupons.html">Multipurpose coupons</a>. Multipurpose coupons can be personalised and downloaded as a PDF file on the order confirmation page.
- We added the three search widgets **Search suggestions**, **Search results: Categories**, and **Search results: Items** to the ShopBuilder. These can be placed in the search area of the top bar widget in the header.
- You can now click the search icon in the top bar widget to open a dropzone in which you can place widgets.
- An additional search is now carried out for misspelled search terms. The search results page now provides an alternative search term in the "Did you mean...?" message.
- We added the two template containers `SingleItem.AfterScriptsLoaded` and `SingleItem.Styles`. These can be used to only integrate scripts and stylesheets on the single item view.
- We added the two template containers `Checkout.AfterScriptsLoaded` and `Checkout.Styles`. These can be used to only integrate scripts and stylesheets on checkout, shopping cart, My Account, order confirmation, and returns pages.
- We added a button to the order history widget via which users can open the order confirmation of an order. This makes it possible to submit a rating for items of an order from the My Account area.
- The microdata field "url" is now filled in on the single item view.
- The sorting of variations on item tiles in item lists and the category view can now be configured via the Ceres assistant.
- The entry **itemFromPrice** has been added to the multilingualism interface. It is used to display a "from" before the price in item lists if the cheapest variation is displayed on the item tile and the item has more than one purchasable variation.

### Changed

- In order to improve performance, the online store's JavaScript and CSS have been split into separate files for the checkout and the item/category pages. 
- In order to optimise the loading times of the variation selection, the variation selection data is loaded at a later stage if the number of variations is exceedingly large.
- The performance of the sticky container widget has been improved.
- The Moment.js library has been replaced with Day.js in order to decrease file size.
- We updated the Bootstrap version to 4.4.1.
- The design of the online store has been adjusted to the Bootstrap standard in order to reduce the necessity of customised style definitions.
- We removed or replaced obsolete SCSS variables. You can find a complete list of the changes in [our developer documentation](https://developers.plentymarkets.com/dev-doc/ceres-5#scss).
- The helper class "widget-fw" no longer affects widgets that are placed within other widgets.
- The behaviour of the canonical tag and the robots information on category and search result pages has been revised.
- If a user selects order characteristics for a variation and then changes variations, the order characteristics are now automatically selected when the user returns to the original variation. This does not apply to order characteristics of the type file.
- Default presets for online store pages whose background had been styled white via CSS now integrate the background image widget in order to achieve the same effect.
- Variation properties are now output on the order confirmation page.
- The settings **Show image carousel dots in category item lists** and **Show image carousel navigation in category item lists** have been marked as deprecated because they can be carried out via the Ceres assistant. In addition, these settings in the assistant have been extended to cover both the category view and item lists.
- The filter toolbar is now visible again after a user clicks on a filter and the page is reloaded.
- The top bar widget setting **Display item images in search suggestions** has been moved to the settings of the new widget **Search results: Items**.
- The top bar widget setting **Search: Forward to single item view** has been removed.
- Country flags and icons in the online store are now loaded at a later stage in order to improve performance.
- The component contact-map has been replaced with the google-maps component.
- The directive `v-waiting-animation` has been marked as deprecated. The new icon component `icon` has been added as an alternative.
- All contents of the ShopBuilder category **Homepage (deprecated) (Ceres)** have been set to inactive.
- The input field **Name of the online store** has been removed from the Ceres assistant.
- Properties have been removed from the result fields for item lists and category pages.

### Fixed

- Images in the background image widget were automatically repeated, even if the option **Repeat image** was inactive. This has been fixed.
- In the step-by-step navigation, long category names were partially displayed outside the widget's boundaries, thereby interfering with the layout. Long category names are now shortened accordingly.
- Order documents of the type **Return slip** are now displayed in the order confirmation and the order history in the My Account area and can be downloaded there.
- Under certain circumstances, item images in the image carousel and image box widgets were not properly loaded. This has been fixed.
- Due to an error, structured data was not output correctly. This has been fixed.
- The option **Increase font size** of the background image widget affected all widgets that included text and were placed in a background image widget. The option has now been limited to the text and code widget.
- The sticky container widget could cause display errors when users changed the size of the browser window. This has been fixed.
- The navigation dots of the image carousel widget did not work as intended on the single item view. This has been fixed.
- Due to an error, certain browsers automatically filled in the invisible input field that serves to deflect bots. This has been fixed.
- Addresses from non-Ceres sources are now converted to ISO format when editing the address.
- The navigation arrows of the image carousel did not work as intended in item lists and the category view. This has been fixed.
- The item availability was displayed on the returns page, even if no option was activated for the **Show item information** setting of the returns widget. This has been fixed.
- Bold text was not displayed correctly in image box widgets. This has been fixed.
- If an item has more than 2 purchasable variations, the item tile in item lists now contains the arrow icon instead of the shopping cart icon. Clicking the icon redirects users to the single item view.
- Under certain circumstances, the search results page was displayed incorrectly if the search results stemmed from an external search provider. This behaviour has been fixed.
- Some combinations of background image widget, grid widgets, and the helper class **widget-fw** could lead to display errors. This behaviour has been fixed.
- Under certain conditions, the background image widget overlapped and thereby blocked the content of nested widgets. This has been fixed.
- Under certain circumstances, item lists of the type **Last seen** were displayed incorrectly. This has been fixed.

## v4.6.0 (2020-02-17) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.5.2...4.6.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- Due to changes to ShopBuilder widgets, it is necessary to re-generate the ShopBuilder contents for single item views via the **Regenerate contents** button in the **CMS » ShopBuilder** menu.
- Google reCAPTCHA is now only carried out after the online store user accepts the corresponding cookies. Forms that are subject to reCAPTCHA, such as the contact form or the customer registration, can therefore only be sent after the user's consent.

### Added

- We added the Your reference widget to the ShopBuilder.
- We added the step-by-step navigation widget to the ShopBuilder.
- We added settings for custom CSS classes, paddings, and margins to the Google Maps widget.
- The assistant now contains a setting via which you can activate the VAT number verification for the checkout, the creation of new addresses and changes to existing addresses.

### Changed

- Filters of the type category are now also available in the category view.
- The navigation tree widget is no longer displayed on display sizes on which the mobile navigation is used. A corresponding notification is displayed in the ShopBuilder.
- Properties are no longer output in the data set for item lists in order to reduce the quantity of data.
- The category image is now loaded via lazy load when it enters the visible area. This improves the performance.
- The image of the background image widget is now loaded via lazy load.
- The transmitted data for items with order characteristics has been optimised.
- E-mails are now sent in the language selected in the online store.
- The setting for entering the Google Maps API key has been moved from the Google Maps widget to the Ceres configuration. The checkbox for Google Maps cookies in the cookie bar will only be displayed if the key is stored there.
- The text that links to information pages of payment providers has been added to the multilingual language packages. The corresponding key is "checkoutPaymentMethodDetailsLinks".
- The name of the item image is now used as the title in the widgets image box, item image and image carousel.
- The type attribute of `<script2>` tags is no longer defaulted to "text/javascript".

### Fixed

- Due to an error, the VAT number was always displayed in the address selection widget. This has been fixed.
- script2 and style2 tags are no longer displayed as clear text before being translated into native tags.
- Base prices are now correctly output in the JSON for Schema.org.
- Preview images of the image carousel were not displayed in the Internet Explorer. This has been fixed.
- Child elements of the navigation tree widget were not displayed in the Internet Explorer. This has been fixed.
- Under certain circumstances, a horizontal scrollbar was displayed in the ShopBuilder. This has been fixed.
- Due to an error, online store visitors were unable to expand the subcategories of the current category in the navigation tree widget. This has been fixed.
- ShopBuilder contents for the returns page were not displayed in the online store. This has been fixed.
- Invalid elements are now removed from customised titles of the image box and image carousel widgets in order to prevent inline editing errors.
- Images in the image carousel widget were reloaded whenever a cursor moved over a button. This has been fixed.
- Tabs in the tab widget now become visible at a later time if their content becomes visible through user interaction or is delayed for other reasons.
- Widgets for the contact page did not recognise the input field for custom CSS classes. This has been fixed.
- Translations for store specials are now output correctly.
- We improved the usability of the toolbar widget of the ShopBuilder.
- The configured status for returns is now checked before the creation of the return. In case of an error, the default status for returns (9.0) is used instead.
- Registered customers can now create returns via the order confirmation link without having to log in.
- The conversion of special characters was not working properly for the category field in the structured data of an item. This has been fixed.
- The numerical value was missing from the field content of the additional details tab in the tab widget. This has been fixed.
- Due to an error, the Google reCAPTCHA was loaded on every page. This has been fixed.
- The checkbox for Packstation/post office was not displayed in the my account area. This has been fixed.
- The timer of the live shopping widget could not display a running time of more than 30 days. This has been fixed.
- The widgets item per page and item sorting could only be placed in the toolbar widget. This has been fixed.
- The settings for paddings did not affect list elements of the navigation tree widget that were loaded at a later time. This has been fixed.
- Due to an error, the backlink of the link widget was passed on to the registration and login pages. This has been fixed. 
- The navigation bar no longer displays categories if no category type has been activated in the Ceres setting **Type of categories rendered in the navigation**.
- The potentialAction element in the structured data is now only output on the homepage.
- Categories whose URL name is already used for system-internal URLs (such as /basket) can now be accessed as long as an alternative category has been linked for these system-internal URLs in the ShopBuilder.
- The setting **Always append trailing slashes** is now effective for pages that are accessed via the **More** button in the nevigation bar.
- Orders of the type warranty are now displayed and can be returned in the my account area.
- If the automatic language recognition of browsers is used, pages could be displayed in a different language than specified in the URL slug. In such cases, the pages are no longer written into the ShopBooster cache.

## v4.5.2 (2020-01-24) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.5.1...4.5.2" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- Due to changes to the order data widget, you need to regenerate ShopBuilder contents of the type order confirmation via the **Regenerate contents** button in the **CMS » ShopBuilder** menu.

### Fixed

- Payment information and the payment button are no longer displayed in the order confirmation of delivery orders and other order types that do not require payment.

## v4.5.1 (2020-01-06) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.5.0...4.5.1" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Due to an error, changing a variation did not update its variation properties. This has been fixed.
- Due to an error, changing a variation did not update its item images. This has been fixed.

## v4.5.0 (2019-12-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.4.2...4.5.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- In order to enable the redirection from tags to items linked with the tag, the route **Tags** has to be activated in the **Routing » Enable routes** menu of the **IO** configuration.
- Since tags are now displayed in the single item view, you need to review your tag labels and tag links in the **Setup » Settings » Tags** menu in order to avoid displaying unwanted content. 
- If you want to include "From" prices in the single item view, the translation key "dynamicVariationPrice" has to be filled out in the **CMS » Multilingualism** menu.
- The item rating filter has been moved to the plugin **Customer feedback**. If you want to display item rating filters, you need to update the plugin to the current version 3.3

### Added

- In the ItemListModule, facet data is now written into the Vue store via the new function `addFacets()` instead of the function `setFacets()`. This serves to prevent duplicate data. The function `setFacets()` has been marked as `deprecated`.
- The Ceres assistant now includes settings for the variation selection with which the "Please select" option can be activated and preselected.
- "From" prices can now be displayed in the single item view if the option "Please select" is active for the variation selection. The translation key "dynamicVariationPrice" has to be filled out in the **CMS » Multilingualism** menu.
- The following widgets have been added to the ShopBuilder for creating category views: Pagination, Items per page, Tool bar, Item grid, Item sorting, Availability filter, Filter for attributes, properties and characteristics, Price filter, Category filter, Manufacturer filter, Navigation tree, Background image.
- We added the "Tags" widget to the ShopBuilder, with which tags can be displayed in the single item view. Tags are set up in the **Setup » Settings » Tags** menu. 
- The number of columns in the item grid widget can now be set in correspondence to the viewport. We would like to thank @daniel-mannheimer for the contribution.
- Contents of the type **item category** can now be used for the category view.
- We added the presets for the search results page and the item category view.
- We added helper classes in order to more easily define widget settings.

### Changed 

- The settings "Position of the pagination", "Always show first page" and "Always show last page" have been moved to the ShopBuilder and have been marked as `deprecated`.
- The option "Please select" in the variation selection has been changed to "No selection" in order to clarify that the selected variation can be purchased, even if no attribute has been selected. 
- Images of items in the shopping cart and the single item view are now loaded via lazy load as soon as they become visible in order to improve performance.
- Icons of shipping profiles are now displayed in the checkout if the plugin of the corresponding shipping method provides an icon.
- Contents of the code widget are now output as clear text in the secure mode in order to ensure that the contents can still be edited, even in case of faulty input.
- The aspect ratio of the item image widget no longer changes in different column widths.
- Layout containers which can no longer be output with the ShopBuilder have been marked as `deprecated`.
- We added a setting to the image box and image box carousel widgets with which lazy loading can be activated, thereby only loading visible content. This improves the performance of the online store.
- The sorting of facets has been moved from Ceres to IO. The facets are returned from the server in a sorted fashion.
- The Vue component `contact-map` has been marked as `deprecated`.
- The Google Maps widget now logs errors.
- The following settings for the category view have been marked as `deprecated`: "Show category decription above item list", "Show category decription below item list", and "Show categories as filter options for search results".

### Fixed

- Javascript errors occurred if an item was added to the shopping cart a second time. This behaviour has been fixed.
- The layout containers "Shopping cart: Before basket totals" and "Shopping cart: After basket totals" are now output correctly in the totals widget unless it is placed in the checkout.
- In the Microsoft Edge browser, adding items to the shopping cart led to a Javascript error due to which the "AddToBasket" overlay was no longer displayed. This has been fixed.
- The layout container "ImageCarouselOverride" was not displayed correctly in the item image widget. This has been fixed.
- Overwriting styles in the code widget with a theme could lead to unreadable syntax. This behaviour has been fixed.
- When setting up the online store with the assistant more than once, the value for the option concerning item bundles was not displayed correctly. This has been fixed.
- Due to an error, the wrong data was transmitted to Google Analytics under certain circumstances. This behaviour has been fixed.
- Due to an error, phone number and VAT ID could not be removed from an address. This has been fixed.
- Due to an error, store specials were not displayed for live shopping items. This has been fixed. We would like to thank @Lauflust for the contribution.
- When opening a modal in Safari on mobile devices, the page scrolled back to the top. This has been fixed.
- If a user clicked the cookie bar's "Accept all" button a second time before refreshing the page, the cookie bar could no longer be closed. This behaviour has been fixed.
- Entering the e-mail address a second time was impossible for guest accounts if an e-mail address had already been entered. This has been fixed.
- Due to a CSS error, error notifications in the shopping cart were invisible. This has been fixed.

## v4.4.2 (2019-11-22) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.4.1...4.4.2" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Surcharges for order characteristics were displayed incorrectly in item lists, if the order characteristics were set on the level of the item. This behaviour has been fixed.
- Due to an error, attributes were not displayed on the order confirmation page if it had been set up via the ShopBuilder. This has been fixed.

## v4.4.1 (2019-11-19) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.4.0...4.4.1" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed 

- Due to an error, order characteristics were not displayed in the shopping cart and the checkout and were not included in the order. This behaviour has been fixed.
- Due to an error, it was not possible to open order details on My account pages that were not created with the ShopBuilder. This has been fixed.

## v4.4.0 (2019-11-14) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.3.4...4.4.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- The default value of the setting "Category levels in the category tree" has been set to 4 levels. If you want to load more than 4 levels, you will have to change this setting in the Ceres configuration. This may negatively impact the performance of the online store.

### Added

- We added a cookie bar widget to the ShopBuilder.
- We added a widget for privacy settings to the ShopBuilder.
- We added the additional information widget, which is a structure element with which you can display contents as a popover.
- A setting has been added to the Ceres configuration with which non-essential cookies can be blocked until the user has consented to its use.
- A setting has been added to the Ceres configuration with which you can determine the number of levels in the category navigation.
- We added the CSS class .widget-fw with which ShopBuilder widgets can be scaled to the entire width of the page.
- We added the CSS class .unfixed with which the scrolling behaviour of ShopBuilder widgets in the header can be adjusted in a way that widgets scroll together with the rest of the page.
- We added a safe mode, with which Ceres can be displayed without any changes made by themes or other external plugins.
- The language files of the online store are now available in Dutch, French, and Polish.
- The data field "Unit" has been added to the data field picker in the ShopBuilder.
- The ShopBuilder now enables the display of properties of the type **file** in the single item view.

### Changed

- The country of delivery selection now supports the flags for the Canary Islands, the Netherlands Antilles, and Ceuta.
- The **More** button in the list of shopping cart items has been reintroduced.
- In the totals in the shopping cart and checkout, gift cards are now displayed above the net totals.
- GoogleMaps is now only loaded after the user has given their consent.
- We improved the logging of Twig errors.
- The layout of the header is now calculated independently of breakpoints.
- The default setting of the scrolling behaviour of the sticky widget has been set to **Only scrolls within a structure element**.
- The ShopBuilder category "Homepage" now uses the meta title as the tab title, if available.
- Blank input fields in the registration form are now output in an error notification.

### Fixed

- Changes to filter, sorting, or items per page settings in the category view on mobile devices removed the country code from the URL. This has been fixed.
- Items for which the setting **Promotional coupon/POS discount: Purchasable with coupon only** is active can no longer be bought if no promotional coupon has been redeemed.
- The item ID of items in the shopping cart is now displayed correctly.
- Under certain circumstances, structure widgets in the header were displayed incorrectly. This behaviour has been fixed.
- Order characteristics were no longer displayed in the shopping cart after the page had been changed. This has been fixed.
- We fixed rounding errors that occurred in connection with the formatting of prices.
- Due to an error, switching between gross and net prices did not update the item's price in the shopping cart. This has been fixed.
- Generating item or variation URLs could lead to errors if the item category no longer existed. This behaviour has been fixed.
- The structured data is now correctly bundled if more than one FAQ widget is used on one page.
- Due to an error, the redirection of the registration widget was not functioning properly. This has been fixed.
- When adding an item from the wish list to the shopping cart, the quantity input now works correctly.
- Item bundles in the category and list views were displayed with a percentual savings badge instead of the item bundle badge. This has been fixed.
- The prices of live shopping items are now displayed correctly if neither an RRP nor a special offer has been stored.
- The order confirmation page could include incorrect calculations. This has been fixed.
- Due to an error, the top bar widget was not displayed if all of its components had been deactivated in the widget settings. This has been fixed.
- Percentage-based order characteristics were not outputted correctly. This has been fixed.
- The button for creating returns in the my account area was not displayed if the my account page had not been created via the ShopBuilder. This behaviour has been fixed.
- JavaScript errors could occur in the context of the AddToBasketOverlay. This behaviour has been fixed.
- Changing the country of delivery opened the shopping cart preview, even if the user was already on the shopping cart page. This behaviour has been fixed.

## v4.3.4 (2019-10-17) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.3.3...4.3.4" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- In order to use Ceres version 4.3.4, you need to update the plugin IO to its current version 4.3.3.

### Fixed

- The value of order characteristics of the type "selection" is now displayed correctly in the shopping cart.
- Obsolete settings regarding button sizes are now interpreted correctly.
- Guest accounts could not access order documents. This has been fixed.
- After adding items with order characteristics to the shopping cart, the confirmation overlay is now displayed correctly.
- The assistant stored an invalid value for the setting regarding the position of the shopping cart preview. This has been fixed.
- The default settings are now correctly loaded in the assistant.
- The components of item bundles were displayed incorrectly. This has been fixed.

## v4.3.3 (2019-10-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.3.2...4.3.3" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Due to an error, variation properties without groups have not be displayed in the shopping cart. This has been fixed.
- Due to an error, necessary data was unavailable in the layout containers of the order data widget. This has been fixed.
- The layout container `Ceres::Scripts.AfterScriptsLoaded` is now initialised before initialising Vue.js so that own Vue components can be registered again.
- Due to an error, ShopBuilder contents were not displayed when the privacy policy widget was placed on a page. This has been fixed.

## v4.3.2 (2019-10-02) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.3.1...4.3.2" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Due to an error, the registration page could not be opened via the header of the online store. This has been fixed.
- Due to an error, scripts that where implemented using the `<script2>` tag were not loaded correctly. This has been fixed.
- Due to an error, the Vue dev tools were also loaded in the live mode. This has been fixed.

## v4.3.1 (2019-10-01) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.3.0...4.3.1" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- The loading time of the **assistent** in the plentymarkets back end has been improved.
- Due to an error, the language was not appended to the URL of the mobile navigation correctly. This has been fixed.

## v4.3.0 (2019-09-26) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.2.1...4.3.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- Due to changes made to existing widgets, ShopBuilder contents have to be refreshed by clicking the button **Regenerate contents** in the **CMS » ShopBuilder** menu.
- The **Cash on delivery** plugin has to be updated to version 1.0.8 to ensure compatibility with Ceres.

### Added 

- We added a notification below the totals in the shopping cart that informs the customer about potential additional charges in case of an export delivery. You can remove the message by saving an empty string in the "basketExportDeliveryWarning" key in the **CMS » Multilingualism** menu.
- We added the ShopBuilder widget "Order documents" for the order confirmation. Customers can download important documents, such as invoice, external invoice, delivery note, order confirmation etc.
- We added the following widgets to the ShopBuilder: Order data, order totals, purchased items, registration, login, guest order, wish list, country of delivery selection, unsubscribe from newsletter, returns form, change password form, change email form.
- We added the following presets to the ShopBuilder: Order confirmation, 404 page, login, registration, unsubscribe from newsletter page, wish list, returns form, change password page, change email page, shopping cart. 
- We added the link button widget to the ShopBuilder. It serves to provide buttons that link to returns and shipment tracking.

### Changed 

- **Custom titles** of item list widgets are no longer displayed in capital letters.
- Item information in the order confirmation now includes attributes.
- The attributes of variations are now listed in the returns widget of the ShopBuilder.
- The attributes of variations are now listed in the order data widget of the ShopBuilder.
- The amount of data transferred during changes to the shopping cart has been reduced in order to improve the performance of the online store.
- Objects created via **pluginApp** are now stored in their variables before they are processed further. The direct use of new instances could, under certain circumstances, lead to errors during the publishing of plugins.
- If the option **Always display content selection** is inactive in the attribute selection widget, the content list in the attribute selection is hidden if the selected attributes do not yield a variation.
- Order characteristics are now sorted by position in the shopping cart.
- The structured data on item pages has been reworked.
- The tooltip of the "Add to basket" button has been adjusted to account for items that are not available.
- Parameters for search queries and the category view are now validated.
- The option "Enable Callisto route pattern for items" has been expanded to also consider the option "Item URL structure" in the **Setup » Client » Select client » SEO » URL structure » Item** menu.
- The payment and shipping method selection has been revised so that the selections can no longer preclude each other. Payment and shipping methods can always be changed. A notification is displayed in case an incompatible combination is selected.
- The ShopBooster now also caches the wish list view.
- The registration form is now also validated by Google reCAPTCHA, as long as the corresponding account data has been stored in the Ceres settings.
- The shopping cart content widget has been revised and now includes settings pertaining to the displayed item data.
- If a customer unsubscribes from a newsletter, they now only unsubscribe from one newsletter, depending on the link they followed. Previously, a customer unsubscribed from all newsletters at once.
- In order to prevent issues, countries of delivery are now initially loaded, regardless of whether a widget includes the country of delivery selection.
- The size of widget placeholders in the ShopBuilder has been reduced for structure elements to improve readability.

### Fixed

- Due to the lack of a specified minimum height, code widgets could not be edited in the ShopBuilder. This behaviour has been fixed.
- If a category with no meta title was linked for the ShopBuilder homepage, the category name was used as the title of the browser tab. From now on, only the meta title is displayed as the title of the browser title. If no meta title is stored for the category, no browser tab title is displayed.
- Order characteristics are now correctly displayed in the returns widget of the ShopBuilder.
- The minimum size of the image carousel cut off images on small displays. It has been removed.
- Shop logos in SVG format were displayed incorrectly when using Internet Explorer 11. This has been fixed.
- Due to an error, category images were displayed incorrectly on iOS devices. This has been fixed.
- Widgets in the header were displayed incorrectly on mobile devices. This has been fixed.
- Redirecting from internal URLs to multilingual categories in the ShopBuilder could lead to issues. This has been fixed.
- In the single item view, the input of the amount is now reset after changing the variation.
- The alternative text is now displayed correctly for images from the webspace in image box widgets.
- The default language for search engines is now transmitted correctly.
- The layout container for overwriting shipping profiles in the order data widget was faulty. This behaviour has been fixed.
- Due to an error, the language was not appended to the URL of the mobile navigation correctly. This has been fixed.
- Under certain circumstances, an empty `<title>` tag was displayed. This behaviour has been fixed.
- Due to an error, the list of last seen items was not loaded in tab widgets. This has been fixed.
- In a few cases, rounding errors of prices could occur. This has been fixed.
- The subtotals were not displayed correctly in the order details. This has been fixed.
- Item lists created with the ShopBuilder now only display the "Show all" link if the list type is "category".
- Due to an error, the item view created with the ShopBuilder was not loaded when using Internet Explorer. This has been fixed. 
- Due to an error, some attributes could not be selected in the single item view. This has been fixed.
- The translation key "orderConfirmationItemDiscount" was not stored in English. This has been fixed.
- The post number is now also displayed in the My account area and the order confirmation.

## v4.2.1 (2019-09-04) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.2.0...4.2.1" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- You can now create an individual header and footer for each category and each content type.
- Variation properties are no longer limited to type "None" in the checkout. Furthermore, variation properties will now be displayed on the shopping cart page.

### Fixed

- Due to an error, hashes included in URLs were cut off when the page was accessed. This has been fixed.
- Due to an error, data for the mobile navigation was not loaded in categories that were linked as the homepage. This has been fixed.

## v4.2.0 (2019-08-21) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.1.2...4.2.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- ShopBuilder homepages will from now on be managed as their own category in the ShopBuilder. In order to be able to use the ShopBuilder homepage in the future, it is necessary to create a new category of the type content and link it in the ShopBuilder's linking interface by clicking the gear wheel icon in the top left corner. You can copy the contents of your homepage into the newly created category. The container "Homepage" will prospectively be removed with Ceres v5.0.0.

### Added

- The Ceres assistant has been added to the **System » Assistants** menu.
- We added the following widgets for creating contact forms in the ShopBuilder: email form, text field (single line), text field (multiple lines), email field, selection, reCaptcha.
- We added the ShopBuilder preset for the default contact page.
- The widget "GoogleMaps" was relocated to the Ceres plugin. It now includes the setting "Map type": This setting makes it possible to display the map as a street map, satellite map, hybrid map, or terrain map.
- We added the "Contact data" widget.
- You can now determine the scrolling behaviour of the sticky widget. It can either scroll within its structure element or across the entire page.
- The static pages for cancellation form, cancellation rights, general terms and conditions, privacy policy and legal disclosure can now be created and edited with the ShopBuilder.
- We added the widget "Legal texts" to the ShopBuilder. This makes it possible to display the legal texts that are stored under **System » System settings » Client » Select client » Online store » Legal information**.
- We added the widget "Print". This serves to open the browser's print dialogue box.
- We added the ShopBuilder presets for the cancellation form, cancellation rights, general terms and conditions, privacy policy and legal disclosure.
- The logo of the manufacturer is now available as a data field in the inline editor of the single item view.
- You can now select the type of animation for the image carousel and the item image widgets.
- .css and .js files now have a dynamic suffix, which makes it possible to remove them from browser caches when the plugin set is saved and published (Cache busting).
- A warning is now displayed if an item without stock limitation is added to the shopping cart in an amount that exceed its available stock. The new key in the **CMS » Multilingualism** menu is "notificationsWarningOverselling".


### Changed

- In order to improve performance, categories for the mobile navigation are only loaded, if a resolution of the screen has been reached, at which the categories are actually displayed.
- The settings in the tab "Contact form" of the Ceres configuration have been marked as deprecated and have been removed. Th contact form is now created and managed via the ShopBuilder.
- The attribute selection has been expanded by the option "Always display content selection". If this option is active, the selection of content for variations is always displayed, as long as the variation has more than one content.
- The ShopBuilder container "Homepage" has been marked as deprecated. From now on, you need to create a new category for managing the homepage of your online store.
- The "Add to shopping cart" button is now deactivated in the single item view if the selected variation cannot be purchased.
- Items that are linked to an empty item template are now displayed in the default single item view layout of Ceres.
- In order to save data traffic, only currently visible categories are transmitted to the browser while the page navigation is assembled.
- The mobile navigation now initially displays the default category of the item on the single item view.

### Fixed

- The discount for the value of goods is now correctly calculated in the subtotals.
- Discounts on individual items are now listed in the order confirmation and the order history.
- The preset for the single item view caused errors on mobile devices. This has been fixed.
- Due to an error, the timer of the shopping cart modal was not working as intended. This has been fixed.
- If an item was linked to an item template for which no content had been stored in the tab Template, TWIG errors could occur when opening the single item view of the item. This has been fixed.
- The title of the image box widget was not displayed correctly on mobile devices if the option "Image and text (full footer)" was active. This has been fixed.
- Under certain circumstances, the title bar widget could issue an additional empty `<h1>` tag. This has been fixed.
- Due to an error, item URLs were not displayed correctly if the option **Trailing slash** was active. This has ben fixed.
- Under certain circumstance, rounding errors caused incorrect price displays. This has been fixed.
- Due to an error, the newsletter widget caused the display of a number of faulty error notifications in the browser console.
- The discount of items with the store special "Special offer" was calculated incorrectly if an active sales price was configured as a "Special offer" price. This has been fixed.
- The "Add to basket" button is now visibly deactivated if an item can not be purchased.
- The 'isVariationSelected' value in the SingleItem component is now correctly linked to the VueX module.
- Special characters were not displayed correctly in the `<title>` tag. This has been fixed.
- Selecting filters on category pages could lead to an error. This has been fixed.
- The labels of the item sorting values "First update" and "Last update" were swapped. This has been fixed.
- Due to an error, no error notifications were displayed in the shopping cart preview. This has been fixed.
- Unsubscribing from the newsletter was not possible if the option **Trailing slash** was active. This has been fixed.
- The settings for the automatic recognition of browser languages are now functioning correctly.
- For the redemption of coupons, you can now save an information text in the **CMS » Multilingualism** menu, which is displayed if the customer is currently in the read only checkout. The corresponding key is "couponReadonlyInfoText".

## v4.1.2 (2019-07-30) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.1.1...4.1.2" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Fixed

- Items with a large number of variations and item images could not be loaded correctly. This has been fixed.
- Special characters in URL parameters are now interpreted correctly.

## v4.1.1 (2019-07-16) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.1.0...4.1.1" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### Changed

- Attributes of variations without stock are now displayed if the options "Available automatically if net stock is positive" and "Not available automatically if net stock is 0 or negative" are deactivated.
- The categories of the mobile navigation are only loaded if the screen resolution is high enough to display the categories.

### Fixed

- The session flag for the read-only checkout is now passed on to the `executePayment()` method in IO.
- Due to an error, the selection of attributes issued the notification "Content not available" for certain item configurations. This has been fixed.
- Due to an error, the attribute selection was not displayed correctly for variations that only differ in their content. This has been fixed.
- Due to an error, item images scaled to the size of the item tile in the variation selection. Item images are now displayed in their original aspect ratio.

## v4.1.0 (2019-07-08) <a href="https://github.com/plentymarkets/plugin-ceres/compare/4.0.2...4.1.0" target="_blank" rel="noopener"><b>Overview of all changes</b></a>

### TODO

- Due to changes to widgets, it is necessary to re-generate the ShopBuilder contents via the **regenerate contents** button.
- The item data table widget displays 12 item data fields per default if they are stored for the item. Please check the widget settings of the item data table to prevent displaying unwanted item information.
- If you are using the ShopBuilder preset for the single item view, you need to manually add item lists to the page.

### Added

- It is now possible to send forms in the online store by pressing the enter key.
- Variation properties can now be added to the single item view via the ShopBuilder.
- We added the ShopBuilder preset for the single item view.
- The variation selection can now display attributes of the types box and image. Attributes and attribute values are sorted by position.
- We added the settings for paddings and margins to the tab widget.
- Preloading has been added to the ceres-legacy.css so that it is loaded at an earlier time. We would like to thank @JVolke for the contribution.
- You can now display a checkbox for accepting the privacy policy in the customer registration.
- The shopping cart and shopping cart preview now include the country of delivery selection. You can deactivate the display of the country of delivery selection in the tab **shopping cart** of the Ceres configuration.
- 6 new icons have been added to the list widget.
- We now provide rich snippet data for the breadcrumbs and FAQ widgets.
- Every widget now contains an input field for individual CSS classes. This enables individual styling possibilities for each widget. We would like to thank @xnaff for their contribution.
- We added the following widgets to the ShopBuilder: Attribute selection, Add to shopping cart, Add to wish list, Item availability, Item image, Order properties, Item bundle, Graduated prices, Item data table.

### Changed

- The variation selection in the single item view has been remodeled on the basis of ElasticSearch technology in order to increase performance.
- E-mails for customer registration in the online store now support umlauts.
- The "change password" function in the My Account area now validates the password according to our specifications.
- The error notification that is displayed when the minimum order value is not met has been adjusted and now contains the minimum order value.
- The alternative text of images in the image box and image carousel widgets is now displayed correctly.
- A CSS class has been added for the wish list view. We would like to thank @daniel-mannheimer for the contribution.
- In the shopping cart overlay, the order confirmation page, and the my account area, order properties of the type **selection** now display the name of the selection instead of the ID.
- The error notification that appears when a customer attempts to register an email address that has already been registered in the online store is now displayed for a longer time.
- It is now possible to enter a VAT identification number for delivery addresses.
- The following Ceres settings have been marked as `deprecated` and have been relocated to the corresponding widget settings: **Show item information**, all settings regarding **item lists**.
- The setting **Enable selection of variations without stock in variation drop-down** has been `deprecated`.

### Fixed

- The plentymarkets logo is now included in the footer preset via the code widget instead of the text widget.
- The values of order properties of the type "none" are no longer displayed as "true" on the order confirmation page.
- Due to an error, the browser would crash when the settings of the top bar widget were carried out. This has been fixed.
- Resizing the browser window could lead to widgets in the header overlapping the page body. This behaviour has been fixed.
- The two parameters items and page of the pagination now only allow numerical values.
- The option "Require all order characteristics before adding an item to shopping cart" in the Ceres configuration did not validate order characteristics of the type *file*. This has been fixed.
- Grid widgets were not displayed correctly in the header. This has been fixed.
- The :hyphen placeholder is now available for the translations keys for GTC (footerGtc) and legal disclosure (footerLegalDisclosure).
- Due to an error, preview images were not displayed in the item search. This has been fixed.
- The input field for dates is now correctly validated.
- The visual presentation of the single item view on mobile devices has been corrected.
- Order properties in property groups that are configured for surcharges on a percentage basis are now correctly displayed in the single item view. For this, we added data fields in the result field files.
- The input fields "VAT number" and "company name" are now displayed correctly if UK is selected as the country of delivery.
- Live shopping offers without a special offer price are now displayed correctly.
- Order properties with a percentual surcharge for which a lump sum surcharge has been configured on the item level were not calculated correctly. This has been fixed.
- The alternative text of images in the image box and image carousel widgets is now displayed correctly.
- Due to an error, widgets would sometimes overlap contents in sticky container widgets. This has been fixed.
- For order characteristics of the type **File**, unregistered customers could not click the preview link in the order confirmation. This has been fixed.
- Due to an error, the input fields for the newsletter registration was not correctly validated in the Internet Explorer, preventing a successful registration. This has been fixed.
- The input field for the newsletter registration reloaded the page when the enter key was pressed. This has been fixed.
- Hovering over a tooltip in the shopping cart closed the shopping cart preview. This has been fixed.
- The "Add to shopping cart" button was displayed in the category view if both the minimum order quantity and the interval order quantity were configured for variations. This behaviour has been fixed.
- The input field for the order quantity was not always filled out correctly if a minimum order quantity had been configured for the item. This behaviour has been fixed.
- The "Information on your registration" pop-up was not displayed correctly on mobile devices. This has been fixed.
- Certain layout options of the grid widget with three columns led to display errors. This has been fixed.
- Header widgets that are not fixed to the top are now ignored when the upper margin of the sticky container widget is calculated.
- It was not possible to open certain links in a mega menu that had at least two rows worth of entries. This has been fixed.
- Overflowing content was not scrollable in the item description tab. This behaviour has been fixed.
- The labels of order properties are now displayed in the correct language.
- Users were unable to close error notifications in several overlays in the online store. Error notifications are now displayed in a higher layer than other elements and can be clicked again.
- The position of attributes was not taken into account. This behaviour has been fixed.
- The hover effect was not displayed for the category navigation in the header. This has been fixed.
- Under certain circumstances, it was impossible to enter an address in the checkout if the online store was accessed in the Facebook browser via an advertisement. This has been fixed.
- Under certain circumstances, the header would overlap sticky container widgets in the Internet Explorer. This has been fixed.
- If an error occurs during payment after an order has been completed, the order can only be finalised after a waiting period of 30 seconds. This prevents the creation of duplicate orders that would thereby be invalid.
- Due to an error, no countries were preselected if the country selection was disabled in the top bar widget. This has been fixed.
- Empty item lists no longer render an empty `<ul>` tag. We would like to thank @daniel-mannheimer for the contribution.
- We fixed an error due to which the routes /checkout and /my-account did not redirect to the corresponding ShopBuilder content.
- Due to an error, sometimes no tab was preselected in the tab widget. This has been fixed.
- Due to an error, the attributes of an item were not displayed in the variation selection if only a graduated price was configured for the item. This has been fixed.

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
- The compatibility of themes designed for older ceres versions must be checked and themes might require an update. For further information about updating themes, refer to the <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/ceres-3-update.html" target="_blank" rel="noopener"><b>manual</b></a>.

### Added

- In the preview mode, you can now access items in the online store that would normally be invisible due to their settings (e.g. no price for the online store).
- We added the FAQ widget for the ShopBuilder. This widget serves to integrate an FAQ page in the online store.
- We added the 4 new layout containers **Basket.BeforeBasketTotals**, **Basket.AfterBasketTotals**, **BasketPreview.BeforeBasketTotals** and **BasketPreview.AfterBasketTotals**.
- Addresses for B2B customers now include a field for a contact person, instead of the fields for first and last name.
- The validity of the checkout URL can now be specified in the Ceres configuration.

### Changed

- The Bootstrap framework has been updated to version 4.2.1. For further information about Boostrap and about updating themes, refer to the <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/ceres-3-update.html" target="_blank" rel="noopener"><b>manual</b></a>.
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
- The setting Name of an item to display has been added to the Item view tab. This value determines whether the item name, the variation name (if available) or a combination of the two names are displayed in the online store. For further information, refer to <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#90" target="_blank">Customising the item view</a>.
- Categories of the Content type can now be displayed in the navigation bar. For this purpose the setting Type of categories rendered in the navigation has been added to the Header tab in the Ceres configuration. For further information, refer to <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#70" target="_blank">Customising the header and footer</a>.

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
- A cancellation form has been added. You can either create a cancellation form by saving the legal information in the back end or specify a PDF document for downloading in the Footer tab of the Ceres config. For further information, refer to [Saving legal information](https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#300).

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
- Items and variations can now be displayed dynamically. For further information, refer to <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#90" target="_blank">Customising the item view</a>.

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

- The Twig template `SingleItemWrapper` has been added. This template allows you to use <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/item/callisto-templates.html" target="_blank"><b>item templates</b></a> in Ceres.

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
- A mega menu has been added for the navigation. For further information refer to <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#80" target="_blank"><b>Customising the header and footer</b></a>.
- A default customer class for B2B customers can now be specified in Ceres. For further information refer to <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#45" target="_blank"><b>Carrying out global settings</b></a>.
- Items can now be sorted by stock in the category view using the **Recommended item sorting** option. For further information refer to <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#200" target="_blank"><b>Customising the pagination and sorting</b></a>.
- A customer that ordered as a guest may now change the payment method on the order confirmation page if enabled.
- A customer that ordered as a guest can now pay an order subsequently, e.g. when the payment method changes.
- An error message has been added that will be displayed when an error occurs during adding items to the shopping cart.
- Currency settings can now be carried out in Ceres. For further information refer to <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#203" target="_blank"><b>Carrying out settings for currencies</b></a>.
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

- Meta descriptions and robots settings for static pages of the online store can now be entered in the **SEO** tab. For further information about this, refer to <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#201" target="_blank"><b>Carrying out settings for search engine optimisation</b></a>.

### Changed

- **Name of your store** and **URL to your company logo** have been moved to the **Global** tab of the configuration.
- The **Allow returns** setting has been added in the **Checkout and My account** tab of the configuration and replaced the old setting for activating returns in the plentymarkets back end.

## 1.6.0 (2017-10-16) <a href="https://github.com/plentymarkets/plugin-ceres/compare/1.5.1...1.6.0" target="_blank"><b>Overview of all changes</b></a>

### Added

- Graduated prices are now integrated in Ceres and will be displayed below the order properties in the single item view. For further information about graduated prices, refer to <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/item/prices.html#870" target="_blank"><b>Managing sales prices</b></a>.

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

- It is now possible to return items of an order in the **My account** area. For further information about returns, refer to <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#430" target="_blank"><b>Activating returns</b></a>.

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
- The description of a category can now be displayed in the category view. Activate the setting <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#90" target="_blank"><b>Show category description in category view</b></a>.
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

- The shopping cart information to be displayed in the header can now be specified. It is possible to display the value of items, the quantity of items or the value and quantity of items in the header. For further information, refer to the <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#80" target="_blank">manual</a>.
- A custom favicon can be uploaded for the online store. For further information about uploading a favicon, refer to the <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#350" target="_blank">manual</a>.
- Every page now has a dynamically generated page title.
- The stock of items is now taken into consideration in the online store.
- The setting **Invisible: in item list** in the **Settings** tab of a variation is now taken into consideration in the online store.
- Variations without stock can now be activated for the variation drop-down menu. For further information, refer to the <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#90" target="_blank">manual</a>.
- A wish list has been added. **Note:** In order to display the wish list in the online store, the route `/wish-list` must be activated in the **Routing** tab in the configuration of **IO**.
- A contact page and the contact form has been added. **Note:** In order to display the contact page in the online store, the route `/contact` must be activated in the **Routing** tab in the configuration of **IO**. For further information about setting up the contact page, refer to the <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#370" target="_blank">manual</a>.
- Error messages sent by the server are now displayed correctly in the front-end.
- The link in the order confirmation email now forwards to the order confirmation page of Ceres.
- A category image can now be displayed in the category view. For further information, refer to the <a href="https://knowledge.plentymarkets.com/en-gb/manual/main/online-store/setting-up-ceres.html#100" target="_blank">manual</a>.

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
