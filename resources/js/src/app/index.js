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

import "./components/basket/AddItemToBasketOverlay";
import "./components/basket/AddToBasket";
import "./components/basket/BasketPreview";
import "./components/basket/BasketTotals";
import "./components/basket/Coupon";
import "./components/basket/list/BasketList";

// TODO: Move to list component
import "./components/basket/list/BasketListItem";

import "./components/checkout/AcceptGtcCheck";
import "./components/checkout/Checkout";
import "./components/checkout/ContactWishInput";
import "./components/checkout/PaymentProviderSelect";
import "./components/checkout/PlaceOrder";
import "./components/checkout/ShippingPrivacyHintCheck";
import "./components/checkout/ShippingProfileSelect";
import "./components/checkout/SubscribeNewsletterCheck";

import "./components/common/GoogleMaps";
import "./components/common/TabItem";
import "./components/common/TabList";

import "./components/containers/LastSeenItemList";

import "./components/customer/AcceptPrivacyPolicyCheck";
import "./components/customer/AddressInputGroup";
import "./components/customer/ChangeEmailForm";
import "./components/customer/ContactMap";
import "./components/customer/CountrySelect";
import "./components/customer/ReCaptcha";
import "./components/customer/Registration";
import "./components/customer/ResetPasswordForm";
import "./components/customer/SalutationSelect";
import "./components/customer/AddressSelect/AddressSelect";

// TODO: Move to parent component
import "./components/customer/AddressSelect/AddressHeader";
import "./components/customer/AddressSelect/InvoiceAddressSelect";
import "./components/customer/AddressSelect/ShippingAddressSelect";
import "./components/customer/AddressSelect/CreateUpdateAddress/CreateUpdateAddress";

import "./components/customer/login/ForgotPassword";
import "./components/customer/login/GuestLogin";
import "./components/customer/login/Login";
import "./components/customer/login/LoginView";
import "./components/customer/login/UserLoginHandler";

import "./components/item/AddToWishList";
import "./components/item/GraduatedPrices";
import "./components/item/ItemBundle";
import "./components/item/ItemDataTable";
import "./components/item/ItemImageCarousel";
import "./components/item/OrderProperties";

// TODO: Move to parent component
import "./components/item/OrderPropertyList";
import "./components/item/OrderPropertyListGroup";
import "./components/item/OrderPropertyListItem";
import "./components/item/OrderPropertyValue";
import "./components/item/QuantityInput";
import "./components/item/SingleItem";
import "./components/item/VariationSelect";


import "./components/itemList/CategoryImageCarousel";
import "./components/itemList/CategoryItem";
import "./components/itemList/ItemLazyImg";
import "./components/itemList/ItemSearch";
import "./components/itemList/ItemStoreSpecial";
import "./components/itemList/filter/ItemFilter";

// TODO: Move to parent component
import "./components/itemList/filter/ItemFilterList";
import "./components/itemList/filter/ItemFilterPrice";
import "./components/itemList/filter/ItemFilterTagList";

// TODO: Move to parent component
import "./components/liveShopping/LiveShoppingDetails";
import "./components/liveShopping/LiveShoppingItem";

import "./components/myAccount/AccountSettings";
import "./components/myAccount/BankDataSelect";
import "./components/myAccount/ChangePaymentMethod";
import "./components/myAccount/History";
import "./components/myAccount/MyAccount";
import "./components/myAccount/OrderDocuments";
import "./components/myAccount/OrderHistory";

// TODO: Move to parent component
import "./components/myAccount/OrderHistoryList";
import "./components/myAccount/OrderHistoryListItem";

import "./components/myAccount/OrderReturnHistory";

// TODO: Move to parent component
import "./components/myAccount/OrderReturnHistoryItem";
import "./components/myAccount/OrderReturnHistoryList";
import "./components/myAccount/OrderReturnHistoryListItem";

import "./components/newsletter/NewsletterInput";
import "./components/newsletter/NewsletterUnsubscribeInput";

import "./components/orderReturn/OrderReturn";
import "./components/orderReturn/OrderReturnItem";

import "./components/pageDesign/Carousel";
import "./components/pageDesign/CookieBar";
import "./components/pageDesign/PrivacySettings";
import "./components/pageDesign/MobileNavigation";
import "./components/pageDesign/Notifications";
import "./components/pageDesign/Popper";
import "./components/pageDesign/ShippingCountrySelect";
import "./components/pageDesign/WaitScreen";

// TODO: Move to parent component
import "./components/wishList/WishList";
import "./components/wishList/WishListCount";


// =========================
// DIRECTIVES
// =========================

import "./directives/basket/basketItemQuantity";
import "./directives/basket/basketItemSum";
import "./directives/basket/toggleBasketPreview";

import "./directives/common/truncateTooltip";

import "./directives/customer/logout";

import "./directives/helper/populateStore";
import "./directives/helper/validate";
import "./directives/helper/waitingAnimation";
import "./directives/helper/waitingAnimationInfinite";

import "./directives/navigation/navigationTouchHandler";
import "./directives/navigation/openMobileNavigation";

import "./directives/pageDesign/ieObjectfitPolyfill";
import "./directives/pageDesign/scrollToTop";
import "./directives/pageDesign/stickInParent";
import "./directives/pageDesign/tooltip";


// =========================
// FILTERS
// =========================

import "./filters/ageRestriction.filter";
import "./filters/arrayFirst.filter";
import "./filters/attachText.filter";
import "./filters/currency.filter";
import "./filters/date.filter";
import "./filters/fileName.filter";
import "./filters/fileUploadPath.filter";
import "./filters/graduatedPrice.filter";
import "./filters/hasItemDefaultPrice.filter";
import "./filters/inputUnit.filter";
import "./filters/itemBundleName.filter";
import "./filters/itemCrossPrice.filter";
import "./filters/itemImage.filter";
import "./filters/itemImageAlternativeText.filter";
import "./filters/itemImages.filter";
import "./filters/itemName.filter";
import "./filters/itemPrice.filter";
import "./filters/itemUrl.filter";
import "./filters/numberFormat.filter";
import "./filters/propertySurcharge.filter";
import "./filters/propertySurchargeSum.filter";
import "./filters/propertyFileUrl.filter";
import "./filters/translate.filter";
import "./filters/truncate.filter";


// =========================
// MIXINS
// =========================

import "./mixins/buttonSizeProperty.mixin";
import "./mixins/getJsonData.mixin";
import "./mixins/template.mixin";


// =========================
// Bootstrap frameworks
// =========================

import "./main";
