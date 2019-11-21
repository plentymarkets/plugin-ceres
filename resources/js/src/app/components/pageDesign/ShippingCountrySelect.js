import { removeUrlParam } from "../../services/UrlService";
import Vue from "vue";
import { mapState, mapGetters } from "vuex";

Vue.component("shipping-country-select", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-shipping-country-select"
        },

        disableInput:
        {
            type: Boolean
        },

        openBasketPreview:
        {
            type: Boolean
        }
    },

    computed:
    {
        isDisabled()
        {
            return !!this.basket.customerInvoiceAddressId || !!this.basket.customerShippingAddressId || this.disableInput;
        },

        ...mapState({
            localization: state => state.localization,
            basket: state => state.basket.data
        }),
        ...mapGetters([
            "getCountryName"
        ])
    },

    created()
    {
        removeUrlParam("openBasketPreview");
    },

    methods:
    {
        setShippingCountry(id)
        {
            if (!this.isDisabled)
            {
                this.$store.dispatch("selectShippingCountry", { shippingCountryId: id, openBasketPreview: this.openBasketPreview });
            }
        }
    }
});
