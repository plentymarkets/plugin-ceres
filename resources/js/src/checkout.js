// checkout script extends category script
import "./base";

import "./app/components/checkout/AcceptGtcCheck";
import "./app/components/checkout/Checkout";
import "./app/components/checkout/ContactWishInput";
import "./app/components/checkout/CustomerSignInput";
import "./app/components/checkout/PaymentProviderSelect";
import "./app/components/checkout/PlaceOrder";
import "./app/components/checkout/ShippingPrivacyHintCheck";
import "./app/components/checkout/ShippingProfileSelect";
import "./app/components/checkout/SubscribeNewsletterCheck";

import "./app/components/customer/AddressSelect/AddressHeader";
import "./app/components/customer/AddressSelect/InvoiceAddressSelect";
import "./app/components/customer/AddressSelect/ShippingAddressSelect";

import "./app/components/myAccount/AccountSettings";
import "./app/components/myAccount/BankDataSelect";
import "./app/components/myAccount/ChangePaymentMethod";
import "./app/components/myAccount/MyAccount";
import "./app/components/myAccount/OrderDocuments";

// legacy non-shopbuilder components
import "./app/components/myAccount/History";

// new shopbuilder-only component
import EditCouponOverlay from "./app/components/myAccount/EditCouponOverlay.vue";
Vue.component("edit-coupon-overlay", EditCouponOverlay);
import "./app/components/myAccount/OrderHistoryList";
import "./app/components/myAccount/OrderReturnHistoryList";
