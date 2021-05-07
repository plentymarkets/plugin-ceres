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

import jQuery from "jquery";
window.jQuery = jQuery;
window.$ = jQuery;

import "bootstrap";
import "owl.carousel";

import { getUrlParams } from "./app/services/UrlService";
window.ceresEnv = getUrlParams()["env"];

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

import StepByStepNavigation from "./app/components/category/StepByStepNavigation.vue";
Vue.component("step-by-step-navigation", StepByStepNavigation);
import GoogleMaps from "./app/components/common/GoogleMaps.vue";
Vue.component("google-maps-widget", GoogleMaps);
import LazyImg from "./app/components/common/LazyImg.vue";
Vue.component("lazy-img", LazyImg);
import Intersect from "./app/components/common/Intersect.vue";
Vue.component("intersect", Intersect);
import TabList from "./app/components/common/TabList.vue";
Vue.component("tab-list", TabList);
import TabItem from "./app/components/common/TabItem.vue";
Vue.component("tab-item", TabItem);
import LastSeenItemList from "./app/components/containers/LastSeenItemList.vue";
Vue.component("last-seen-item-list", LastSeenItemList);

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
Vue.component("form-attachment", () => import("./app/components/form/FormAttachment.vue"));

import ItemBundle from "./app/components/item/ItemBundle.vue";
Vue.component("item-bundle", ItemBundle);
import OrderPropertyValue from "./app/components/item/OrderPropertyValue.vue";
Vue.component("order-property-value", OrderPropertyValue);
import QuantityInput from "./app/components/item/QuantityInput.vue";
Vue.component("quantity-input", QuantityInput);

import TagList from "./app/components/item/TagList.vue";
Vue.component("tag-list", TagList);

import CategoryItem from "./app/components/itemList/CategoryItem.vue";
Vue.component("category-item", CategoryItem);
import ItemSearch from "./app/components/itemList/ItemSearch.vue";
Vue.component("item-search", ItemSearch);
import SearchSuggestionItem from "./app/components/itemList/SearchSuggestionItem.vue";
Vue.component("search-suggestion-item", SearchSuggestionItem);
import ItemFilterList from "./app/components/itemList/filter/ItemFilterList.vue";
Vue.component("item-filter-list", ItemFilterList);
import ItemFilterTagList from "./app/components/itemList/filter/ItemFilterTagList.vue";
Vue.component("item-filter-tag-list", ItemFilterTagList);

import LiveShoppingItem from "./app/components/liveShopping/LiveShoppingItem.vue";
Vue.component("live-shopping-item", LiveShoppingItem);

import NewsletterInput from "./app/components/newsletter/NewsletterInput.vue";
Vue.component("newsletter-input", NewsletterInput);
import NewsletterUnsubscribeInput from "./app/components/newsletter/NewsletterUnsubscribeInput.vue";
Vue.component("newsletter-unsubscribe-input", NewsletterUnsubscribeInput);

import OrderReturn from "./app/components/orderReturn/OrderReturn.vue";
Vue.component("order-return", OrderReturn);

import CookieBar from "./app/components/pageDesign/CookieBar.vue";
Vue.component("cookie-bar", CookieBar);
import PrivacySettings from "./app/components/pageDesign/PrivacySettings.vue";
Vue.component("privacy-settings", PrivacySettings);
import Carousel from "./app/components/pageDesign/Carousel.vue";
Vue.component("carousel", Carousel);
import Icon from "./app/components/pageDesign/Icon.vue";
Vue.component("icon", Icon);
import MobileNavigation from "./app/components/pageDesign/MobileNavigation.vue";
Vue.component("mobile-navigation", MobileNavigation);
import Notifications from "./app/components/pageDesign/Notifications.vue";
Vue.component("notifications", Notifications);
import Popper from "./app/components/pageDesign/Popper.vue";
Vue.component("popper", Popper);
import ShippingCountrySelect from "./app/components/pageDesign/ShippingCountrySelect.vue";
Vue.component("shipping-country-select", ShippingCountrySelect);
import LoadingAnimation from "./app/components/pageDesign/LoadingAnimation.vue";
Vue.component("loading-animation", LoadingAnimation);

import WishList from "./app/components/wishList/WishList.vue";
Vue.component("wish-list", WishList);
import WishListCount from "./app/components/wishList/WishListCount.vue";
Vue.component("wish-list-count", WishListCount);

import LazyLoad from "./app/components/common/LazyLoad.vue";
Vue.component("lazy-load", LazyLoad);

import AddToWishList from "./app/components/item/AddToWishList.vue";
Vue.component("add-to-wish-list", AddToWishList);
import GraduatedPrices from "./app/components/item/GraduatedPrices.vue";
Vue.component("graduated-prices", GraduatedPrices);
import ItemDataTable from "./app/components/item/ItemDataTable.vue";
Vue.component("item-data-table", ItemDataTable);
import ItemImageCarousel from "./app/components/item/ItemImageCarousel.vue";
Vue.component("item-image-carousel", ItemImageCarousel);
import ItemPrice from "./app/components/item/ItemPrice.vue";
Vue.component("item-price", ItemPrice);
import SetPrice from "./app/components/item/SetPrice.vue";
Vue.component("set-price", SetPrice);
import OrderPropertyList from "./app/components/item/OrderPropertyList.vue";
Vue.component("order-property-list", OrderPropertyList);
import VariationSelect from "./app/components/item/VariationSelect.vue";
Vue.component("variation-select", VariationSelect);
import ItemAvailability from "./app/components/item/ItemAvailability.vue";
Vue.component("item-availability", ItemAvailability);
import SingleItemBundle from "./app/components/item/SingleItemBundle.vue";
Vue.component("single-item-bundle", SingleItemBundle);
import SingleAddToBasket from "./app/components/item/SingleAddToBasket.vue";
Vue.component("single-add-to-basket", SingleAddToBasket);
import SetQuantityInput from "./app/components/item/SetQuantityInput.vue";
Vue.component("set-quantity-input", SetQuantityInput);
import SingleItem from "./app/components/item/SingleItem.vue";
Vue.component("single-item", SingleItem);
import SingleItemSetComponent from "./app/components/item/SingleItemSetComponent.vue";
Vue.component("single-item-set-component", SingleItemSetComponent);

import LazyHydrate from "vue-lazy-hydration";
Vue.component("lazy-hydrate", LazyHydrate);
import ClientOnly from "./app/components/common/ClientOnly.vue";
Vue.component("client-only", ClientOnly);

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

window.ceresTranslate = TranslationService.translate;

Vue.prototype.$translate = TranslationService.translate;
Vue.prototype.$ceres = App;

const store = createStore();

initServerStore(store);
initClientStore(store);
initClientListeners(store);
