import Vue from "vue";

// =========================
// COMPONENTS
// =========================

// BASE
import AddItemToBasketOverlay from "./app/components/basket/AddItemToBasketOverlay.vue";


import AddToBasket from "./app/components/basket/AddToBasket.vue";
import BasketPreview from "./app/components/basket/BasketPreview.vue";
import BasketTotals from "./app/components/basket/BasketTotals.vue";
import Coupon from "./app/components/basket/Coupon.vue";
import BasketList from "./app/components/basket/list/BasketList.vue";

import StepByStepNavigation from "./app/components/category/StepByStepNavigation.vue";
import GoogleMaps from "./app/components/common/GoogleMaps.vue";
import LazyImg from "./app/components/common/LazyImg.vue";
import Intersect from "./app/components/common/Intersect.vue";
import TabList from "./app/components/common/TabList.vue";
import TabItem from "./app/components/common/TabItem.vue";
import LastSeenItemList from "./app/components/containers/LastSeenItemList.vue";

import ChangeEmailForm from "./app/components/customer/ChangeEmailForm.vue";
import ReCaptcha from "./app/components/customer/ReCaptcha.vue";
import Registration from "./app/components/customer/Registration.vue";
import ResetPasswordForm from "./app/components/customer/ResetPasswordForm.vue";
import ForgotPassword from "./app/components/customer/login/ForgotPassword.vue";
import GuestLogin from "./app/components/customer/login/GuestLogin.vue";
import Login from "./app/components/customer/login/Login.vue";
// legacy non-shopbuilder component
import LoginView from "./app/components/customer/login/LoginView.vue";
import UserLoginHandler from "./app/components/customer/login/UserLoginHandler.vue";

import ItemBundle from "./app/components/item/ItemBundle.vue";
import OrderPropertyValue from "./app/components/item/OrderPropertyValue.vue";
import QuantityInput from "./app/components/item/QuantityInput.vue";

import TagList from "./app/components/item/TagList.vue";

import CategoryItem from "./app/components/itemList/CategoryItem.vue";
import ItemSearch from "./app/components/itemList/ItemSearch.vue";
import SearchSuggestionItem from "./app/components/itemList/SearchSuggestionItem.vue";
import ItemFilterList from "./app/components/itemList/filter/ItemFilterList.vue";
import ItemFilterTagList from "./app/components/itemList/filter/ItemFilterTagList.vue";

import LiveShoppingItem from "./app/components/liveShopping/LiveShoppingItem.vue";

import NewsletterInput from "./app/components/newsletter/NewsletterInput.vue";
import NewsletterUnsubscribeInput from "./app/components/newsletter/NewsletterUnsubscribeInput.vue";

import OrderReturn from "./app/components/orderReturn/OrderReturn.vue";

import CookieBar from "./app/components/pageDesign/CookieBar.vue";
import PrivacySettings from "./app/components/pageDesign/PrivacySettings.vue";
import Carousel from "./app/components/pageDesign/Carousel.vue";
import Icon from "./app/components/pageDesign/Icon.vue";
import MobileNavigation from "./app/components/pageDesign/MobileNavigation.vue";
import Notifications from "./app/components/pageDesign/Notifications.vue";
import Popper from "./app/components/pageDesign/Popper.vue";
import ShippingCountrySelect from "./app/components/pageDesign/ShippingCountrySelect.vue";
import LoadingAnimation from "./app/components/pageDesign/LoadingAnimation.vue";

import WishList from "./app/components/wishList/WishList.vue";
import WishListCount from "./app/components/wishList/WishListCount.vue";

import LazyLoad from "./app/components/common/LazyLoad.vue";

import AddToWishList from "./app/components/item/AddToWishList.vue";
import GraduatedPrices from "./app/components/item/GraduatedPrices.vue";
import ItemDataTable from "./app/components/item/ItemDataTable.vue";
import ItemImageCarousel from "./app/components/item/ItemImageCarousel.vue";
import ItemPrice from "./app/components/item/ItemPrice.vue";
import SetPrice from "./app/components/item/SetPrice.vue";
import OrderPropertyList from "./app/components/item/OrderPropertyList.vue";
import VariationSelect from "./app/components/item/VariationSelect.vue";
import ItemAvailability from "./app/components/item/ItemAvailability.vue";
import SingleItemBundle from "./app/components/item/SingleItemBundle.vue";
import SingleAddToBasket from "./app/components/item/SingleAddToBasket.vue";
import SetQuantityInput from "./app/components/item/SetQuantityInput.vue";
import SingleItem from "./app/components/item/SingleItem.vue";
import SingleItemSetComponent from "./app/components/item/SingleItemSetComponent.vue";
import FormAttachment from "./app/components/form/FormAttachment.vue";

// CHECKOUT
// import "./app/components/checkout/AcceptGtcCheck";
// import "./app/components/checkout/Checkout";
// import "./app/components/checkout/ContactWishInput";
// import "./app/components/checkout/CustomerSignInput";
// import "./app/components/checkout/PaymentProviderSelect";
// import "./app/components/checkout/PlaceOrder";
// import "./app/components/checkout/ShippingPrivacyHintCheck";
// import "./app/components/checkout/ShippingProfileSelect";
// import "./app/components/checkout/SubscribeNewsletterCheck";

// import "./app/components/customer/AddressSelect/AddressHeader";
// import "./app/components/customer/AddressSelect/InvoiceAddressSelect";
// import "./app/components/customer/AddressSelect/ShippingAddressSelect";

// import "./app/components/myAccount/AccountSettings";
// import "./app/components/myAccount/BankDataSelect";
// import "./app/components/myAccount/ChangePaymentMethod";
// import "./app/components/myAccount/MyAccount";
// import "./app/components/myAccount/OrderDocuments";

// // legacy non-shopbuilder components
// import "./app/components/myAccount/History";

// // new shopbuilder-only component
// import EditCouponOverlay from "./app/components/myAccount/EditCouponOverlay.vue";
// import "./app/components/myAccount/OrderHistoryList";
// import "./app/components/myAccount/OrderReturnHistoryList";

// =========================
// SERVICES
// =========================
import TranslationService from "./app/services/TranslationService";

// =========================
// DIRECTIVES
// =========================
import "./app/directives/basket/basketItemQuantity";
import "./app/directives/basket/basketItemSum";
import "./app/directives/basket/toggleBasketPreview";
import "./app/directives/category/openFilterToolbar";
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
import "./app/filters/propertyFileUrl.filter";
import "./app/filters/translate.filter";
import "./app/filters/truncate.filter";

import { createStore } from "./app/store/index";

export function createApp(options)
{
    // =========================
    // COMPONENTS
    // =========================

    // BASE
    Vue.component("add-item-to-basket-overlay", AddItemToBasketOverlay);
    Vue.component("add-to-basket", AddToBasket);
    Vue.component("basket-preview", BasketPreview);
    Vue.component("basket-totals", BasketTotals);
    Vue.component("coupon", Coupon);
    Vue.component("basket-list", BasketList);
    Vue.component("step-by-step-navigation", StepByStepNavigation);
    Vue.component("google-maps-widget", GoogleMaps);
    Vue.component("lazy-img", LazyImg);
    Vue.component("intersect", Intersect);
    Vue.component("tab-list", TabList);
    Vue.component("tab-item", TabItem);
    Vue.component("last-seen-item-list", LastSeenItemList);
    Vue.component("change-email-form", ChangeEmailForm);
    Vue.component("recaptcha", ReCaptcha);
    Vue.component("registration", Registration);
    Vue.component("reset-password-form", ResetPasswordForm);
    Vue.component("forgot-password-modal", ForgotPassword);
    Vue.component("guest-login", GuestLogin);
    Vue.component("login", Login);
    Vue.component("login-view", LoginView);
    Vue.component("user-login-handler", UserLoginHandler);
    Vue.component("item-bundle", ItemBundle);
    Vue.component("order-property-value", OrderPropertyValue);
    Vue.component("quantity-input", QuantityInput);
    Vue.component("tag-list", TagList);
    Vue.component("category-item", CategoryItem);
    Vue.component("item-search", ItemSearch);
    Vue.component("search-suggestion-item", SearchSuggestionItem);
    Vue.component("item-filter-list", ItemFilterList);
    Vue.component("item-filter-tag-list", ItemFilterTagList);
    Vue.component("live-shopping-item", LiveShoppingItem);
    Vue.component("newsletter-input", NewsletterInput);
    Vue.component("newsletter-unsubscribe-input", NewsletterUnsubscribeInput);
    Vue.component("order-return", OrderReturn);
    Vue.component("cookie-bar", CookieBar);
    Vue.component("privacy-settings", PrivacySettings);
    Vue.component("carousel", Carousel);
    Vue.component("icon", Icon);
    Vue.component("mobile-navigation", MobileNavigation);
    Vue.component("notifications", Notifications);
    Vue.component("popper", Popper);
    Vue.component("shipping-country-select", ShippingCountrySelect);
    Vue.component("loading-animation", LoadingAnimation);
    Vue.component("wish-list", WishList);
    Vue.component("wish-list-count", WishListCount);
    Vue.component("lazy-load", LazyLoad);
    Vue.component("add-to-wish-list", AddToWishList);
    Vue.component("graduated-prices", GraduatedPrices);
    Vue.component("item-data-table", ItemDataTable);
    Vue.component("item-image-carousel", ItemImageCarousel);
    Vue.component("item-price", ItemPrice);
    Vue.component("set-price", SetPrice);
    Vue.component("order-property-list", OrderPropertyList);
    Vue.component("variation-select", VariationSelect);
    Vue.component("item-availability", ItemAvailability);
    Vue.component("single-item-bundle", SingleItemBundle);
    Vue.component("single-add-to-basket", SingleAddToBasket);
    Vue.component("set-quantity-input", SetQuantityInput);
    Vue.component("single-item", SingleItem);
    Vue.component("single-item-set-component", SingleItemSetComponent);
    Vue.component("form-attachment", FormAttachment);

    // CHECKOUT
    // Vue.component("edit-coupon-overlay", EditCouponOverlay);

    window.ceresTranslate = TranslationService.translate;

    Vue.prototype.$translate = TranslationService.translate;
    Vue.prototype.$ceres = App;

    const store = createStore();

    const defaultOptions = {
        store,
        ...options
    };

    const app = new Vue(defaultOptions);

    return { app, store };
}
