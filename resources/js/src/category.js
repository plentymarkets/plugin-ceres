// =========================
// Polyfill's
// =========================

import "custom-event-polyfill";

// =========================
// Framework's
// =========================

import Vue from "vue";
import Vuex from "vuex";

window.Vue = Vue;
window.Vuex = Vuex;

Vue.use(require("vue-script2"));

import jQuery from "jquery";
window.jQuery = jQuery;
window.$ = jQuery;

import "bootstrap";

// =========================
// COMPONENTS
// =========================

import "./app/components/basket/AddItemToBasketOverlay";
import "./app/components/basket/AddToBasket";
import "./app/components/basket/BasketPreview";
import "./app/components/basket/BasketTotals";
import "./app/components/basket/Coupon";
import "./app/components/basket/list/BasketList";

import "./app/components/common/GoogleMaps";
import "./app/components/common/TabList";

import "./app/components/containers/LastSeenItemList";

import "./app/components/customer/AcceptPrivacyPolicyCheck";
import "./app/components/customer/ChangeEmailForm";
import "./app/components/customer/ContactMap";
import "./app/components/customer/CountrySelect";
import "./app/components/customer/ReCaptcha";
import "./app/components/customer/Registration";
import "./app/components/customer/ResetPasswordForm";

import "./app/components/customer/login/ForgotPassword";
import "./app/components/customer/login/GuestLogin";
import "./app/components/customer/login/Login";
// legacy non-shopbuilder component
import "./app/components/customer/login/LoginView";
import "./app/components/customer/login/UserLoginHandler";


import "./app/components/item/ItemBundle";

import "./app/components/item/OrderPropertyValue";
import "./app/components/item/QuantityInput";

import "./app/components/itemList/CategoryImageCarousel";
import "./app/components/itemList/CategoryItem";
import "./app/components/itemList/ItemLazyImg";
import "./app/components/itemList/ItemSearch";
import "./app/components/itemList/ItemStoreSpecial";
import "./app/components/itemList/filter/ItemFilter";

import "./app/components/itemList/filter/ItemFilterList";
import "./app/components/itemList/filter/ItemFilterTagList";

import "./app/components/liveShopping/LiveShoppingItem";

import "./app/components/newsletter/NewsletterInput";
import "./app/components/newsletter/NewsletterUnsubscribeInput";

import "./app/components/orderReturn/OrderReturn";

import "./app/components/pageDesign/Carousel";
import "./app/components/pageDesign/CookieBar";
import "./app/components/pageDesign/PrivacySettings";
import "./app/components/pageDesign/MobileNavigation";
import "./app/components/pageDesign/Notifications";
import "./app/components/pageDesign/Popper";
import "./app/components/pageDesign/ShippingCountrySelect";

import "./app/components/wishList/WishList";
import "./app/components/wishList/WishListCount";

// =========================
// DIRECTIVES
// =========================
import "./app/directives/basket/basketItemQuantity";
import "./app/directives/basket/basketItemSum";
import "./app/directives/basket/toggleBasketPreview";

import "./app/directives/common/truncateTooltip";

import "./app/directives/customer/logout";

import "./app/directives/helper/populateStore";
import "./app/directives/helper/validate";
import "./app/directives/helper/waitingAnimation";
import "./app/directives/helper/waitingAnimationInfinite";

import "./app/directives/navigation/navigationTouchHandler";
import "./app/directives/navigation/openMobileNavigation";

import "./app/directives/pageDesign/ieObjectfitPolyfill";
import "./app/directives/pageDesign/scrollToTop";
import "./app/directives/pageDesign/stickInParent";
import "./app/directives/pageDesign/tooltip";


// =========================
// FILTERS
// =========================
import "./app/filters/ageRestriction.filter";
import "./app/filters/arrayFirst.filter";
import "./app/filters/attachText.filter";
import "./app/filters/currency.filter";
import "./app/filters/date.filter";
import "./app/filters/fileName.filter";
import "./app/filters/fileUploadPath.filter";
import "./app/filters/graduatedPrice.filter";
import "./app/filters/hasItemDefaultPrice.filter";
import "./app/filters/inputUnit.filter";
import "./app/filters/itemBundleName.filter";
import "./app/filters/itemCrossPrice.filter";
import "./app/filters/itemImage.filter";
import "./app/filters/itemImageAlternativeText.filter";
import "./app/filters/itemImages.filter";
import "./app/filters/itemName.filter";
import "./app/filters/itemPrice.filter";
import "./app/filters/itemUrl.filter";
import "./app/filters/numberFormat.filter";
import "./app/filters/propertySurcharge.filter";
import "./app/filters/propertySurchargeSum.filter";
import "./app/filters/propertyFileUrl.filter";
import "./app/filters/translate.filter";
import "./app/filters/truncate.filter";


// =========================
// MIXINS
// =========================
import "./app/mixins/buttonSizeProperty.mixin";
import "./app/mixins/getJsonData.mixin";
import "./app/mixins/template.mixin";


// =========================
// Bootstrap frameworks
// =========================
import "./app/main";
