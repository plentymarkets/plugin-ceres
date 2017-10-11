Vue.component("basket-list", {

    delimiters: ["${", "}"],

    props: [
        "size",
        "template"
    ],

    computed: Vuex.mapState({
        basketItems: state => state.basket.items
    }),

    created()
    {
        this.$options.template = this.template;
    }
});
