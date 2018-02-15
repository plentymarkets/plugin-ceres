Vue.component("basket-list", {

    delimiters: ["${", "}"],

    props: [
        "size",
        "template"
    ],

    computed: Vuex.mapState({
        basketItems: state => state.basket.items,
        isBasketInitiallyLoaded: state => state.basket.isBasketInitiallyLoaded
    }),

    created()
    {
        this.$options.template = this.template;
    }
});
