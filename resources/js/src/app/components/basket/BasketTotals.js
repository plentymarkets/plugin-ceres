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

    methods: {
        calculateBaseValue: function(value, percent)
        {
            return (value / (100 - percent)) * 100;
        }
    },

    created()
    {
        this.$options.template = this.template;
    }
});
