Vue.component("basket-totals", {

    delimiters: ["${", "}"],

    props:
    {
        template:
        {
            type: String
        },
        showNetPrices:
        {
            type: Boolean,
            default: true
        }
    },

    computed: Vuex.mapState({
        basket: state => state.basket.data,
        isBasketLoading: state => state.basket.isBasketLoading
    }),

    created()
    {
        this.$options.template = this.template;
    }
});
