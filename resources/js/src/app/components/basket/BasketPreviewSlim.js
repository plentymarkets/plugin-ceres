Vue.component("basket-preview-slim", {

    props: {
        template:
        {
            type: String,
            default: "#vue-basket-preview-slim"
        }
    },

    data()
    {
        return {

        };
    },

    computed: Vuex.mapState({
        basketItems: state => state.basket.items
    }),

    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {

    }
});
