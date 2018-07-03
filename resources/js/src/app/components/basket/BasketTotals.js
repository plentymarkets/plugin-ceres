Vue.component("basket-totals", {

    delimiters: ["${", "}"],

    props:
    {
        template:
        {
            type: String
        }
    },

    computed: Vuex.mapState({
        basket: state => state.basket.data,
        isBasketLoading: state => state.basket.isBasketLoading,
        showNetPrices: state => state.basket.showNetPrices
    }),

    created()
    {
        this.$options.template = this.template;
    }
});
