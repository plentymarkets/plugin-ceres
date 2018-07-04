import ApiService from "services/ApiService";

Vue.component("basket-preview", {

    delimiters: ["${", "}"],

    props: {
        template: {
            type: String,
            default: "#vue-basket-preview"
        }
    },

    computed: Vuex.mapState({
        basket: state => state.basket.data,
        basketItems: state => state.basket.items,
        basketNotifications: state => state.basket.basketNotifications
    }),

    created()
    {
        this.$options.template = this.template;

        const basketPromise = ApiService.get("/rest/io/basket/");
        const netPricesPromise = ApiService.get("/rest/io/customer/show_net_prices", {}, {supressNotifications: true, keepOriginalResponse: true});

        Promise.all([basketPromise, netPricesPromise]).then(([basket, showNetPrices]) =>
        {
            this.$store.commit("setBasket", basket);
            this.$store.dispatch("loadBasketData");
            this.$store.commit("setShowNetPrices", showNetPrices.data);
        });
    },

    /**
     * Bind to basket and bind the basket items
     */
    mounted()
    {
        this.$nextTick(() =>
        {
            ApiService.listen("AfterBasketChanged",
            data =>
            {
                this.$store.commit("setBasket", data.basket);
                this.$store.commit("setShowNetPrices", data.showNetPrices);
            });
        });
    }
});
