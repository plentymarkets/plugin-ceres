Vue.component("basket-list", {
    props:
    {
        template:
        {
            type: String,
            default: "#vue-basket-list"
        },
        size:
        {
            type: String,
            default: "small"
        }
    },

    computed: Vuex.mapState({
        basketItems: state => state.basket.items,
        isBasketInitiallyLoaded: state => state.basket.isBasketInitiallyLoaded
    }),

    created()
    {
        this.$options.template = this.template;
    }
});
