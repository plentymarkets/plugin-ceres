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
Vue.component("basket-preview", function(resolve)
{
    require(["./app/components/basket/BasketPreview.vue"], resolve);
});
Vue.component("basket-totals", function(resolve)
{
    require(["./app/components/basket/BasketTotals.vue"], resolve);
});
Vue.component("coupon", function(resolve)
{
    require(["./app/components/basket/Coupon.vue"], resolve);
});
Vue.component("basket-list", function(resolve)
{
    require(["./app/components/basket/list/BasketList.vue"], resolve);
});

Vue.component("step-by-step-navigation", function(resolve)
{
    require(["./app/components/category/StepByStepNavigation.vue"], resolve);
});

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
Vue.component("recaptcha", function(resolve)
{
    require(["./app/components/customer/ReCaptcha.vue"], resolve);
});
Vue.component("registration", function(resolve)
{
    require(["./app/components/customer/Registration.vue"], resolve);
});
Vue.component("reset-password-form", function(resolve)
{
    require(["./app/components/customer/ResetPasswordForm.vue"], resolve);
});
Vue.component("forgot-password-modal", function(resolve)
{
    require(["./app/components/customer/login/ForgotPassword.vue"], resolve);
});
Vue.component("guest-login", function(resolve)
{
    require(["./app/components/customer/login/GuestLogin.vue"], resolve);
});
Vue.component("login", function(resolve)
{
    require(["./app/components/customer/login/Login.vue"], resolve);
});
// legacy non-shopbuilder component
Vue.component("login-view", function(resolve)
{
    require(["./app/components/customer/login/LoginView.vue"], resolve);
});
Vue.component("user-login-handler", function(resolve)
{
    require(["./app/components/customer/login/UserLoginHandler.vue"], resolve);
});

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

Vue.component("item-search", function(resolve)
{
    require(["./app/components/itemList/ItemSearch.vue"], resolve);
});

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

Vue.component("cookie-bar", function(resolve)
{
    require(["./app/components/pageDesign/CookieBar.vue"], resolve);
});
Vue.component("privacy-settings", function(resolve)
{
    require(["./app/components/pageDesign/PrivacySettings.vue"], resolve);
});
Vue.component("carousel", function(resolve)
{
    require(["./app/components/pageDesign/Carousel.vue"], resolve);
});
Vue.component("mobile-navigation", function(resolve)
{
    require(["./app/components/pageDesign/MobileNavigation.vue"], resolve);
});
Vue.component("notifications", function(resolve)
{
    require(["./app/components/pageDesign/Notifications.vue"], resolve);
});
Vue.component("popper", function(resolve)
{
    require(["./app/components/pageDesign/Popper.vue"], resolve);
});
Vue.component("shipping-country-select", function(resolve)
{
    require(["./app/components/pageDesign/ShippingCountrySelect.vue"], resolve);
});

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
