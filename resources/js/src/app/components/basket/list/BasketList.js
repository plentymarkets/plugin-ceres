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
        },
        isPreview:
        {
            type: Boolean,
            default: false
        }
    },

    computed: Vuex.mapState({
        basketItems: state => state.basket.items,
        isBasketInitiallyLoaded: state => state.basket.isBasketInitiallyLoaded
    })
});
