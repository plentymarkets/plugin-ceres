Vue.component("basket-totals", {

    delimiters: ["${", "}"],

    props:
    {
        template:
        {
            type: String
        },
        config:
        {
            type: Array
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
    },

    methods: {
        /**
         * TODO
         * @param name
         * @returns {boolean}
         */
        showProperty(name)
        {
            return !this.config || this.config.indexOf(name) >= 0 || this.config.indexOf("all") >= 0;
        }
    }
});
