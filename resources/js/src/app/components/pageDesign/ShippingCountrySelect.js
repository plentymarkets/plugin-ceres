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

    computed: Vuex.mapState({
        localization: state => state.localization
    }),

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

