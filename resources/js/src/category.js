// =========================
// Polyfill's
// =========================

import "custom-event-polyfill";

// =========================
// Framework's
// =========================

import Vue from "vue";
import Vuex from "vuex";

const mount = Vue.prototype.$mount;

Vue.prototype.$mount =
    function(el, hydrating)
    {
        const templateOverride = this.$props.templateOverride;

        if (templateOverride && typeof templateOverride === "string" && templateOverride.charAt(0) === "#" && document.querySelector(templateOverride))
        {
            const renderFunctions = Vue.compile(document.querySelector(templateOverride).innerHTML);

            Object.assign(this.$options, renderFunctions);
        }

        return mount.call(this, el, hydrating);
    };

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

import AddItemToBasketOverlay from "./app/components/basket/AddItemToBasketOverlay.vue";
Vue.component("add-item-to-basket-overlay", AddItemToBasketOverlay);
import AddToBasket from "./app/components/basket/AddToBasket.vue";
Vue.component("add-to-basket", AddToBasket);
import BasketPreview from "./app/components/basket/BasketPreview.vue";
Vue.component("basket-preview", BasketPreview);
import BasketTotals from "./app/components/basket/BasketTotals.vue";
Vue.component("basket-totals", BasketTotals);
import Coupon from "./app/components/basket/Coupon.vue";
Vue.component("coupon", Coupon);
import BasketList from "./app/components/basket/list/BasketList.vue";
Vue.component("basket-list", BasketList);

import "./app/components/category/StepByStepNavigation";

import GoogleMapsWidget from "./app/components/common/GoogleMaps.vue";
Vue.component("google-maps-widget", GoogleMapsWidget);
import LazyImg from "./app/components/common/LazyImg.vue";
Vue.component("lazy-img", LazyImg);
import "./app/components/common/TabList";

import "./app/components/containers/LastSeenItemList";

import ChangeEmailForm from "./app/components/customer/ChangeEmailForm.vue";
Vue.component("change-email-form", ChangeEmailForm);
import ReCaptcha from "./app/components/customer/ReCaptcha.vue";
Vue.component("recaptcha", ReCaptcha);

import Registration from "./app/components/customer/Registration.vue";
Vue.component("registration", Registration);
import ResetPasswordForm from "./app/components/customer/ResetPasswordForm.vue";
Vue.component("reset-password-form", ResetPasswordForm);

import ForgotPassword from "./app/components/customer/login/ForgotPassword.vue";
Vue.component("forgot-password-modal", ForgotPassword);
import GuestLogin from "./app/components/customer/login/GuestLogin.vue";
Vue.component("guest-login", GuestLogin);
import Login from "./app/components/customer/login/Login.vue";
Vue.component("login", Login);
// legacy non-shopbuilder component
import LoginView from "./app/components/customer/login/LoginView.vue";
Vue.component("login-view", LoginView);
import UserLoginHandler from "./app/components/customer/login/UserLoginHandler.vue";
Vue.component("user-login-handler", UserLoginHandler);

import ItemBundle from "./app/components/item/ItemBundle.vue";
Vue.component("item-bundle", ItemBundle);
import OrderPropertyValue from "./app/components/item/OrderPropertyValue.vue";
Vue.component("order-property-value", OrderPropertyValue);
import QuantityInput from "./app/components/item/QuantityInput.vue";
Vue.component("quantity-input", QuantityInput);
import TagList from "./app/components/item/TagList.vue";
Vue.component("tag-list", TagList);

import "./app/components/itemList/CategoryImageCarousel";
import "./app/components/itemList/CategoryItem";
import "./app/components/itemList/ItemSearch";
import "./app/components/itemList/ItemStoreSpecial";
import "./app/components/itemList/filter/ItemFilter";

import "./app/components/itemList/filter/ItemFilterList";
import "./app/components/itemList/filter/ItemFilterTagList";

import "./app/components/liveShopping/LiveShoppingItem";

import "./app/components/newsletter/NewsletterInput";
import "./app/components/newsletter/NewsletterUnsubscribeInput";

import "./app/components/orderReturn/OrderReturn";

import CookieBar from "./app/components/pageDesign/CookieBar.vue";
Vue.component("cookie-bar", CookieBar);
import PrivacySettings from "./app/components/pageDesign/PrivacySettings.vue";
Vue.component("privacy-settings", PrivacySettings);
import Carousel from "./app/components/pageDesign/Carousel.vue";
Vue.component("carousel", Carousel);
import MobileNavigation from "./app/components/pageDesign/MobileNavigation.vue";
Vue.component("mobile-navigation", MobileNavigation);
import Notifications from "./app/components/pageDesign/Notifications.vue";
Vue.component("notifications", Notifications);
import Popper from "./app/components/pageDesign/Popper.vue";
Vue.component("popper", Popper);
import ShippingCountrySelect from "./app/components/pageDesign/ShippingCountrySelect.vue";
Vue.component("shipping-country-select", ShippingCountrySelect);

import WishList from "./app/components/wishList/WishList.vue";
Vue.component("wish-list", WishList);
import WishListCount from "./app/components/wishList/WishListCount.vue";
Vue.component("wish-list-count", WishListCount);

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

import "./app/directives/pageDesign/scrollToTop";
import "./app/directives/pageDesign/stickInParent";
import "./app/directives/navigation/sidenavigationChildrenLoader";
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
import "./app/mixins/getJsonData.mixin";
import "./app/mixins/template.mixin";

// =========================
// Bootstrap frameworks
// =========================
import "./app/main";

import TranslationService from "./app/services/TranslationService";
window.ceresTranslate = TranslationService.translate;

Vue.prototype.$translate = TranslationService.translate;
