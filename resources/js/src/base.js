import "./app/publicPath";
// =========================
// Polyfill's
// =========================

import "custom-event-polyfill";

// =========================
// Framework's
// =========================

import Vue from "vue";
import Vuex from "vuex";
import { mount } from "./mount";

Vue.prototype.$mount = mount;

window.Vue = Vue;
window.Vuex = Vuex;

import script2 from "./app/plugins/script2";
Vue.use(script2);

import "./app/jQuery";

import "bootstrap";
import "owl.carousel";

import { getUrlParams } from "./app/services/UrlService";
window.ceresEnv = getUrlParams()["env"];

// =========================
// COMPONENTS
// =========================
Vue.component("add-item-to-basket-overlay", () => import("./app/components/basket/AddItemToBasketOverlay.vue"));

Vue.component("add-to-basket", () => import("./app/components/basket/AddToBasket.vue"));
Vue.component("basket-preview", () => import("./app/components/basket/BasketPreview.vue"));
Vue.component("basket-totals", () => import("./app/components/basket/BasketTotals.vue"));
Vue.component("mail-changed-info", () => import("./app/components/basket/MailChangedInfo.vue"));
Vue.component("coupon", () => import("./app/components/basket/Coupon.vue"));
Vue.component("basket-list", () => import("./app/components/basket/list/BasketList.vue"));

Vue.component("step-by-step-navigation", () => import("./app/components/category/StepByStepNavigation.vue"));
Vue.component("google-maps-widget", () => import("./app/components/common/GoogleMaps.vue"));
import LazyImg from "./app/components/common/LazyImg.vue";
Vue.component("lazy-img", LazyImg);
import Intersect from "./app/components/common/Intersect.vue";
Vue.component("intersect", Intersect);
import TabList from "./app/components/common/TabList.vue";
Vue.component("tab-list", TabList);
import TabItem from "./app/components/common/TabItem.vue";
Vue.component("tab-item", TabItem);
Vue.component("last-seen-item-list", () => import("./app/components/containers/LastSeenItemList.vue"));

Vue.component("change-email-form", () => import("./app/components/customer/ChangeEmailForm.vue"));
import ReCaptcha from "./app/components/customer/ReCaptcha.vue";
Vue.component("recaptcha", ReCaptcha);
Vue.component("registration", () => import("./app/components/customer/Registration.vue"));
Vue.component("reset-password-form", () => import("./app/components/customer/ResetPasswordForm.vue"));
Vue.component("forgot-password-modal", () => import("./app/components/customer/login/ForgotPassword.vue"));
Vue.component("guest-login", () => import("./app/components/customer/login/GuestLogin.vue"));
Vue.component("login", () => import("./app/components/customer/login/Login.vue"));
// legacy non-shopbuilder component
Vue.component("login-view", () => import("./app/components/customer/login/LoginView.vue"));
import UserLoginHandler from "./app/components/customer/login/UserLoginHandler.vue";
Vue.component("user-login-handler", UserLoginHandler);
Vue.component("form-attachment", () => import("./app/components/form/FormAttachment.vue"));

Vue.component("item-bundle", () => import("./app/components/item/ItemBundle.vue"));
Vue.component("order-property-value", () => import("./app/components/item/OrderPropertyValue.vue"));
Vue.component("quantity-input", () => import("./app/components/item/QuantityInput.vue"));

Vue.component("tag-list", () => import("./app/components/item/TagList.vue"));

Vue.component("category-item", () => import("./app/components/itemList/CategoryItem.vue"));
import ItemSearch from "./app/components/itemList/ItemSearch.vue";
Vue.component("item-search", ItemSearch);
Vue.component("search-suggestion-item", () => import("./app/components/itemList/SearchSuggestionItem.vue"));
Vue.component("item-filter-list", () => import("./app/components/itemList/filter/ItemFilterList.vue"));
Vue.component("item-filter-tag-list", () => import("./app/components/itemList/filter/ItemFilterTagList.vue"));

Vue.component("live-shopping-item", () => import("./app/components/liveShopping/LiveShoppingItem.vue"));

Vue.component("newsletter-input", () => import("./app/components/newsletter/NewsletterInput.vue"));
Vue.component("newsletter-unsubscribe-input", () => import("./app/components/newsletter/NewsletterUnsubscribeInput.vue"));

Vue.component("order-return", () => import("./app/components/orderReturn/OrderReturn.vue"));

Vue.component("cookie-bar", () => import("./app/components/pageDesign/CookieBar.vue"));
Vue.component("privacy-settings", () => import("./app/components/pageDesign/PrivacySettings.vue"));
Vue.component("carousel", () => import("./app/components/pageDesign/Carousel.vue"));
import Icon from "./app/components/pageDesign/Icon.vue";
Vue.component("icon", Icon);
import LanguageDetection from "./app/components/pageDesign/LanguageDetection.vue";
Vue.component("language-detection", LanguageDetection);
import MobileNavigation from "./app/components/pageDesign/MobileNavigation.vue";
Vue.component("mobile-navigation", MobileNavigation);
import Notifications from "./app/components/pageDesign/Notifications.vue";
Vue.component("notifications", Notifications);
Vue.component("popper", () => import("./app/components/pageDesign/Popper.vue"));
Vue.component("shipping-country-select", () => import("./app/components/pageDesign/ShippingCountrySelect.vue"));
Vue.component("loading-animation", () => import("./app/components/pageDesign/LoadingAnimation.vue"));

Vue.component("wish-list", () => import("./app/components/wishList/WishList.vue"));
import WishListCount from "./app/components/wishList/WishListCount.vue";
Vue.component("wish-list-count", WishListCount);

import LazyLoad from "./app/components/common/LazyLoad.vue";
Vue.component("lazy-load", LazyLoad);

Vue.component("add-to-wish-list", () => import("./app/components/item/AddToWishList.vue"));
Vue.component("graduated-prices", () => import("./app/components/item/GraduatedPrices.vue"));
Vue.component("item-data-table", () => import("./app/components/item/ItemDataTable.vue"));
Vue.component("item-image-carousel", () => import("./app/components/item/ItemImageCarousel.vue"));
Vue.component("item-price", () => import("./app/components/item/ItemPrice.vue"));
Vue.component("set-price", () => import("./app/components/item/SetPrice.vue"));
Vue.component("order-property-list", () => import("./app/components/item/OrderPropertyList.vue"));
Vue.component("variation-select", () => import("./app/components/item/VariationSelect.vue"));
Vue.component("item-availability", () => import("./app/components/item/ItemAvailability.vue"));
Vue.component("single-item-bundle", () => import("./app/components/item/SingleItemBundle.vue"));
Vue.component("single-add-to-basket", () => import("./app/components/item/SingleAddToBasket.vue"));
Vue.component("set-quantity-input", () => import("./app/components/item/SetQuantityInput.vue"));
import SingleItem from "./app/components/item/SingleItem.vue";
Vue.component("single-item", SingleItem);
import SingleItemSetComponent from "./app/components/item/SingleItemSetComponent.vue";
Vue.component("single-item-set-component", SingleItemSetComponent);


import LazyHydrate from "vue-lazy-hydration";
Vue.component("lazy-hydrate", LazyHydrate);
import ClientOnly from "./app/components/common/ClientOnly.vue";
Vue.component("client-only", ClientOnly);
import BackgroundImg from "./app/components/common/BackgroundImg.vue";
Vue.component("background-img", BackgroundImg);

// =========================
// DIRECTIVES
// =========================
import "./app/directives/basket/basketItemQuantity";
import "./app/directives/basket/basketItemSum";
import "./app/directives/basket/toggleBasketPreview";

import "./app/directives/category/openFilterToolbar";

import "./app/directives/common/truncateTooltip";

import "./app/directives/customer/logout";

import "./app/directives/helper/testingAttr";
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
import { createStore, initClientListeners, initClientStore, initServerStore } from "./app/store";
import { initListener } from "./app/services/ApiService";

window.ceresTranslate = TranslationService.translate;

Vue.prototype.$translate = TranslationService.translate;
Vue.prototype.$ceres = App;

const store = createStore();

window.ceresStore = store;

initServerStore(store);
initClientStore(store);
initClientListeners(store);
initListener();
