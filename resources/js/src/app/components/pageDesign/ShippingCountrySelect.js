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
        }
    },

    created()
    {
        this.$options.template = this.template;
    },

    computed:
    {
        isDisabled()
        {
            return !!this.basket.customerInvoiceAddressId || !!this.basket.customerShippingAddressId || this.disableInput;
        },

        ...Vuex.mapState({
            localization: state => state.localization,
            basket: state => state.basket.data
        })
    },

    methods:
    {
        setShippingCountry(id)
        {
            if (!this.isDisabled)
            {
                this.$store.dispatch("selectShippingCountry", id);
            }
        }
    }
});
