Vue.component("shipping-country-select", {

    delimiters: ["${", "}"],

    props: [
        "template",
        "selectable"
    ],

    created()
    {
        this.$options.template = this.template;
    },

    computed:
    {
        isCountrySelectionEnabled()
        {
            return !this.basket.customerInvoiceAddressId && !this.basket.customerShippingAddressId;
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
            if (!this.selectable)
            {
                this.$store.dispatch("selectShippingCountry", id);
            }
        }
    }
});
