import TranslationService from "../../services/TranslationService";
import Vue from "vue";
import { mapState } from "vuex";
import { isDefined } from "../../helper/utils";
const NotificationService = require("../../services/NotificationService");

export default Vue.component("shipping-profile-select", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-shipping-profile-select"
        },
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        },
        paymentContainerIsOverwritten:
        {
            type: Boolean,
            default: false
        }
    },

    computed: mapState({
        shippingProfileList: state => state.checkout.shipping.shippingProfileList,
        maxDeliveryDays: state => state.checkout.shipping.maxDeliveryDays,
        shippingProfileId: state => state.checkout.shipping.shippingProfileId,
        showError: state => state.checkout.validation.shippingProfile.showError,
        isBasketLoading: state => state.basket.isBasketLoading,
        isCheckoutReadonly: state => state.checkout.readOnly,
        selectedPaymentMethodId: state => state.checkout.payment.methodOfPaymentId
    }),

    /**
     * Add a shipping provider
     * Initialise the event listener
     */
    created()
    {
        this.$store.commit("setShippingProfileValidator", this.validate);
    },

    methods:
    {
        /**
         * Method on shipping profile changed
         */
        onShippingProfileChange(shippingProfileId)
        {
            this.$store.dispatch("selectShippingProfile", this.shippingProfileList.find(shippingProfile => shippingProfile.parcelServicePresetId === shippingProfileId))
                .then(data =>
                {
                    document.dispatchEvent(new CustomEvent("afterShippingProfileChanged", { detail: this.shippingProfileId }));
                },
                error =>
                {
                    console.log("error");
                });

            this.validate();
        },

        validate()
        {
            const showError = this.shippingProfileId <= 0 || this.shippingProfileList.length <= 0;

            this.$store.commit("setShippingProfileShowError", showError);

            if (showError)
            {
                NotificationService.error(
                    TranslationService.translate("Ceres::Template.checkoutCheckShippingProfile")
                );
            }
        },

        getTooltip(shippingProfileId, methodOfPaymentId)
        {
            let translationKey = "";

            const params = {};

            for (let i = 0; i < this.shippingProfileList.length; i++)
            {
                const shippingProfile = this.shippingProfileList[i];

                if (shippingProfile.parcelServicePresetId === shippingProfileId)
                {
                    if (this.paymentContainerIsOverwritten)
                    {
                        translationKey = "Ceres::Template.checkoutChangePaymentMethodToHint";
                        params.paymentMethodNames = shippingProfile.allowedPaymentMethodNames.join(",");
                    }
                    else
                    {
                        translationKey = "Ceres::Template.checkoutChangePaymentMethodHint";
                    }
                    break;
                }
            }

            return TranslationService.translate(translationKey, params);
        },

        isPaymentMethodExcluded(shippingProfile, selectedPaymentMethodId)
        {
            if (isDefined(shippingProfile.excludedPaymentMethodIds))
            {
                return shippingProfile.excludedPaymentMethodIds.includes(selectedPaymentMethodId);
            }
            else
            {
                return false;
            }
        }
    }
});
