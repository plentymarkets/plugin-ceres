const ApiService = require("services/ApiService");
const NotificationService = require("services/NotificationService");

Vue.component("checkout", {

    props: [
        "template",
        "initialCheckout"
    ],

    computed: Vuex.mapState({
        checkout: state => state.checkout
    }),

    created: function()
    {
        this.$options.template = this.template;
        this.$store.dispatch("setCheckout", this.initialCheckout);
        this.addEventHandler();
    },

    methods:
    {
        addEventHandler()
        {
            ApiService.listen("CheckoutChanged",
                checkout =>
                {
                    this.handleCheckoutChangedEvent(checkout.checkout);
                });
        },

        handleCheckoutChangedEvent(checkout)
        {
            if (this.isEquals(this.checkout.payment.methodOfPaymentList, checkout.paymentDataList, "id"))
            {
                NotificationService.info(Translations.Template.orderMethodOfPaymentListChanged);
                this.$store.commit("setMethodOfPaymentList", checkout.paymentDataList);
            }

            if (this.isEquals(this.checkout.shipping.shippingProfileList, checkout.shippingProfileList, "parcelServicePresetId"))
            {
                NotificationService.info(Translations.Template.orderShippingProfileListChanged);
                this.$store.commit("setShippingProfileList", checkout.shippingProfileList);
            }

            if (this.checkout.payment.methodOfPaymentId !== checkout.methodOfPaymentId)
            {
                NotificationService.warn(Translations.Template.orderMethodOfPaymentChanged);
                this.$store.commit("setMethodOfPayment", checkout.methodOfPaymentId);
            }

            if (this.checkout.shipping.shippingProfileId !== checkout.shippingProfileId)
            {
                NotificationService.warn(Translations.Template.orderShippingProfileChanged);
                this.$store.commit("setShippingProfile", checkout.shippingProfileId);
            }

            if (this.checkout.shipping.shippingCountryId !== checkout.shippingCountryId)
            {
                this.$store.commit("setShippingCountryId", checkout.shippingCountryId);
            }
        },

        isEquals(oldList, newList, fieldToCompare)
        {
            if (oldList.length !== newList.length)
            {
                return true;
            }

            for (const oldListItem of oldList)
            {
                if (newList.findIndex(newListItem => newListItem[fieldToCompare] === oldListItem[fieldToCompare]) === -1)
                {
                    return true;
                }
            }

            return false;
        }
    }
});
