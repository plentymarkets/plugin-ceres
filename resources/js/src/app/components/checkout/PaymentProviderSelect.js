import TranslationService from "../../services/TranslationService";
import Vue from "vue";
import { mapState } from "vuex";
const NotificationService = require("../../services/NotificationService");

Vue.component("payment-provider-select", {
    props:
    {
        template:
        {
            type: String,
            default: "#vue-payment-provider-select"
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
        }
    },

    computed: mapState({
        methodOfPaymentList: state => state.checkout.payment.methodOfPaymentList,
        methodOfPaymentId: state => state.checkout.payment.methodOfPaymentId,
        showError: state => state.checkout.validation.paymentProvider.showError,
        isBasketLoading: state => state.basket.isBasketLoading,
        isCheckoutReadonly: state => state.checkout.readOnly
    }),

    /**
     * Initialise the event listener
     */
    created()
    {
        this.$store.commit("setPaymentProviderValidator", this.validate);
    },

    methods: {
        /**
         * Event when changing the payment provider
         */
        onPaymentProviderChange(newMethodOfPayment)
        {
            this.$store.dispatch("selectMethodOfPayment", newMethodOfPayment.id)
                .then(data =>
                {
                    document.dispatchEvent(new CustomEvent("afterPaymentMethodChanged", { detail: this.methodOfPaymentId }));
                },
                error =>
                {
                    console.log("error");
                });

            this.validate();
        },

        validate()
        {
            const showError = !(this.methodOfPaymentId > 0);

            this.$store.commit("setPaymentProviderShowError", showError);

            if (showError)
            {
                NotificationService.error(
                    TranslationService.translate("Ceres::Template.checkoutCheckPaymentProvider")
                );
            }
        }
    }
});
