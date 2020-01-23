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

Vue.component("add-item-to-basket-overlay", function(resolve)
{
    require(["./app/components/basket/AddItemToBasketOverlay.vue"], resolve);
});
Vue.component("add-to-basket", function(resolve)
{
    require(["./app/components/basket/AddToBasket.vue"], resolve);
});
import BasketPreview from "./app/components/basket/BasketPreview.vue";
Vue.component("basket-preview", BasketPreview);
import BasketTotals from "./app/components/basket/BasketTotals.vue";
Vue.component("basket-totals", BasketTotals);
Vue.component("coupon", function(resolve)
{
    require(["./app/components/basket/Coupon.vue"], resolve);
});
import BasketList from "./app/components/basket/list/BasketList.vue";
Vue.component("basket-list", BasketList);

import StepByStepNavigation from "./app/components/category/StepByStepNavigation.vue";
Vue.component("step-by-step-navigation", StepByStepNavigation);

Vue.component("google-maps-widget", function(resolve)
{
    require(["./app/components/common/GoogleMaps.vue"], resolve);
});
import LazyImg from "./app/components/common/LazyImg.vue";
Vue.component("lazy-img", LazyImg);

Vue.component("tab-list", function(resolve)
{
    require(["./app/components/common/TabList.vue"], resolve);
});

Vue.component("last-seen-item-list", function(resolve)
{
    require(["./app/components/containers/LastSeenItemList.vue"], resolve);
});

Vue.component("change-email-form", function(resolve)
{
    require(["./app/components/customer/ChangeEmailForm.vue"], resolve);
});
import ReCaptcha from "./app/components/customer/ReCaptcha.vue";
Vue.component("recaptcha", ReCaptcha);

import Registration from "./app/components/customer/Registration.vue";
Vue.component("registration", Registration);
Vue.component("reset-password-form", function(resolve)
{
    require(["./app/components/customer/ResetPasswordForm.vue"], resolve);
});

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

Vue.component("item-bundle", function(resolve)
{
    require(["./app/components/item/ItemBundle.vue"], resolve);
});
Vue.component("order-property-value", function(resolve)
{
    require(["./app/components/item/OrderPropertyValue.vue"], resolve);
});
Vue.component("quantity-input", function(resolve)
{
    require(["./app/components/item/QuantityInput.vue"], resolve);
});

Vue.component("tag-list", function(resolve)
{
    require(["./app/components/item/TagList.vue"], resolve);
});

Vue.component("category-item", function(resolve)
{
    require(["./app/components/itemList/CategoryItem.vue"], resolve);
});

import ItemSearch from "./app/components/itemList/ItemSearch.vue";
Vue.component("item-search", ItemSearch);

Vue.component("item-filter-list", function(resolve)
{
    require(["./app/components/itemList/filter/ItemFilterList.vue"], resolve);
});
Vue.component("item-filter-tag-list", function(resolve)
{
    require(["./app/components/itemList/filter/ItemFilterTagList.vue"], resolve);
});

Vue.component("live-shopping-item", function(resolve)
{
    require(["./app/components/liveShopping/LiveShoppingItem.vue"], resolve);
});

Vue.component("newsletter-input", function(resolve)
{
    require(["./app/components/newsletter/NewsletterInput.vue"], resolve);
});
Vue.component("newsletter-unsubscribe-input", function(resolve)
{
    require(["./app/components/newsletter/NewsletterUnsubscribeInput.vue"], resolve);
});

Vue.component("order-return", function(resolve)
{
    require(["./app/components/orderReturn/OrderReturn.vue"], resolve);
});

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

Vue.component("wish-list", function(resolve)
{
    require(["./app/components/wishList/WishList.vue"], resolve);
});

Vue.component("wish-list-count", function(resolve)
{
    require(["./app/components/wishList/WishListCount.vue"], resolve);
});

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
Vue.prototype.$ceres = App;
