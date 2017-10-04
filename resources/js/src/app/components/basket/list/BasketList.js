Vue.component("basket-list", {

    props: [
        "size",
        "template"
    ],

    data()
    {
        return {
            basketItems: []
        };
    },

    computed: Vuex.mapState({
        basketItems: state => state.basket.items
    }),

    created()
    {
        this.$options.template = this.template;
    }
});
