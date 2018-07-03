import ApiService from "services/ApiService";

Vue.component("basket-preview", {

    delimiters: ["${", "}"],

    props: {
        template: String,
        basketData: Object,
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
        this.$store.commit("setBasket", this.basketData);
        this.$store.commit("setShowNetPrices", this.showNetPrices);
        this.$store.dispatch("loadBasketData");
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
