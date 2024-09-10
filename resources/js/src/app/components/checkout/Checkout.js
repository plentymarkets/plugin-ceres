const ApiService = require("../../services/ApiService");
const NotificationService = require("../../services/NotificationService");
const _isEqual = require("lodash/isEqual");

import TranslationService from "../../services/TranslationService";
import { removeUrlParam } from "../../services/UrlService";
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.component("checkout", {

    props: {
        template: {
            type: String,
            default: "#vue-checkout"
        },
        initialCheckout: {
            type: Object,
            required: true
        },
        deliveryAddressList:
        {
            type: Array,
            default: () => []
        },
        selectedDeliveryAddress:
        {
            type: Number,
            default: -99
        },
        billingAddressList:
        {
            type: Array,
            default: () => []
        },
        selectedBillingAddress:
        {
            type: Number,
            default: 0
        }
    },

    computed: mapState({
        checkout: state => state.checkout,
        deliveryAddressId: state => state.address.deliveryAddressId,
        basket: state => state.basket.data
    }),

    created()
    {
        this.$store.dispatch("setCheckout", this.initialCheckout);
        this.$store.dispatch("initBillingAddress", { id: this.selectedBillingAddress, addressList: this.billingAddressList });
        this.$store.dispatch("initDeliveryAddress", { id: this.selectedDeliveryAddress, addressList: this.deliveryAddressList });

        console.log("here");

        this.addEventHandler();
    },

    mounted()
    {
        removeUrlParam("readonlyCheckout");
    },

    methods:
    {
        addEventHandler()
        {
            console.log("addEventHandler");

            ApiService.listen("CheckoutChanged",
                checkout =>
                {
                    this.handleCheckoutChangedEvent(checkout.checkout);
                });

            document.addEventListener("afterPaymentMethodChanged", event =>
            {
                const newMethodOfPaymentId = event.detail;

                if (newMethodOfPaymentId !== this.checkout.payment.methodOfPaymentId)
                {
                    this.updateCheckoutAndBasket();
                }
            });
        },

        updateCheckoutAndBasket()
        {
            this.$store.commit("setIsBasketLoading", true);

            const reloadBasketPromise = this.$store.dispatch("refreshBasket");
            const reloadCheckoutPromise = this.$store.dispatch("refreshCheckout");

            Promise.all([reloadBasketPromise, reloadCheckoutPromise])
                .then(data =>
                {
                    this.$store.commit("setIsBasketLoading", false);
                });
        },

        handleCheckoutChangedEvent(checkout)
        {
            console.log("checkout", checkout);

            if (!this.isEquals(this.checkout.payment.methodOfPaymentList, checkout.paymentDataList, "id"))
            {
                console.log("1");
                NotificationService.info(
                    TranslationService.translate("Ceres::Template.checkoutMethodOfPaymentListChanged")
                );
                this.$store.commit("setMethodOfPaymentList", checkout.paymentDataList);
            }

            if (this.hasShippingProfileListChanged(this.checkout.shipping.shippingProfileList, checkout.shippingProfileList.slice()))
            {
                console.log("2");
                this.$store.commit("setShippingProfileList", checkout.shippingProfileList);
            }

            if (this.checkout.payment.methodOfPaymentId !== checkout.methodOfPaymentId)
            {
                console.log("3");
                NotificationService.warn(
                    TranslationService.translate("Ceres::Template.checkoutMethodOfPaymentChanged")
                );
                this.$store.commit("setMethodOfPayment", checkout.methodOfPaymentId);
            }

            if (this.checkout.shipping.shippingProfileId !== checkout.shippingProfileId)
            {
                console.log("4");
                NotificationService.warn(
                    TranslationService.translate("Ceres::Template.checkoutShippingProfileChanged")
                );
                this.$store.commit("setShippingProfile", checkout.shippingProfileId);
            }

            if (this.checkout.shipping.shippingCountryId !== checkout.shippingCountryId)
            {
                console.log("5");
                this.$store.commit("setShippingCountryId", checkout.shippingCountryId);
            }

            const responseDeliveryAddressId = checkout.deliveryAddressId !== 0
                ? checkout.deliveryAddressId
                : this.basket.customerShippingAddressId || -99;

            if (this.deliveryAddressId !== responseDeliveryAddressId)
            {
                console.log("6", this.deliveryAddressId);
                NotificationService.warn(
                    TranslationService.translate("Ceres::Template.addressChangedWarning")
                );
                this.$store.commit("selectDeliveryAddressById", responseDeliveryAddressId);
            }

            if (!_isEqual(this.checkout.shipping.maxDeliveryDays, checkout.maxDeliveryDays))
            {
                this.$store.commit("setMaxDeliveryDays", checkout.maxDeliveryDays);
            }

            if (this.checkout.readOnly !== checkout.readOnly)
            {
                this.$store.commit("setIsCheckoutReadonly", checkout.readOnly);

                window.location.href = App.urls.checkout;
            }
        },

        hasShippingProfileListChanged(oldList, newList)
        {
            if (oldList.length !== newList.length)
            {
                NotificationService.info(
                    TranslationService.translate("Ceres::Template.checkoutShippingProfileListChanged")
                );
                return true;
            }

            this.sortList(oldList, "parcelServicePresetId");
            this.sortList(newList, "parcelServicePresetId");

            for (const index in oldList)
            {
                if (oldList[index].parcelServicePresetId !== newList[index].parcelServicePresetId)
                {
                    NotificationService.info(
                        TranslationService.translate("Ceres::Template.checkoutShippingProfileListChanged")
                    );
                    return true;
                }
                else if (oldList[index].shippingAmount !== newList[index].shippingAmount)
                {
                    NotificationService.info(
                        TranslationService.translate("Ceres::Template.checkoutShippingProfilePriceChanged")
                    );
                    return true;
                }
                else if (oldList[index].shippingPrivacyInformation !== newList[index].shippingPrivacyInformation)
                {
                    return true;
                }
            }

            return false;
        },

        isEquals(oldList, newList, fieldToCompare)
        {
            if (oldList.length !== newList.length)
            {
                return false;
            }

            for (const oldListItem of oldList)
            {
                if (newList.findIndex(newListItem => newListItem[fieldToCompare] === oldListItem[fieldToCompare]) === -1)
                {
                    return false;
                }
            }

            return true;
        },

        sortList(list, field)
        {
            list.sort((valueA, valueB) =>
            {
                if (valueA[field] > valueB[field])
                {
                    return 1;
                }

                if (valueA[field] < valueB[field])
                {
                    return -1;
                }

                return 0;
            });
        },

        showModal(content)
        {
            $(this.$refs.checkoutModalContent).html(content);
            $(this.$refs.checkoutModal).modal("show");
        }
    }
});
