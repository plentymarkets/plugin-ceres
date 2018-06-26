import ApiService from "services/ApiService";

Vue.component("basket-preview", {

    delimiters: ["${", "}"],

    props: {
        template: {
            type: String,
            default: "#vue-basket-preview"
        },
        showNetPrices:
        {
            type: Boolean,
            default: false
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

        ApiService.get("/rest/io/basket/")
            .done(basket =>
            {
                this.$store.commit("setBasket", basket);
                this.$store.dispatch("loadBasketData");
            });

        this.$store.commit("setShowNetPrices", this.showNetPrices);
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
