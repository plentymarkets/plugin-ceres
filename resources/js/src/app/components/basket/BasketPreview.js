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

    data()
    {
        return {
            splitBasketView: false
        };
    },

    computed: Vuex.mapState({
        basket: state => state.basket.data,
        basketItems: state => state.basket.items,
        basketNotifications: state => state.basket.basketNotifications
    }),

    created()
    {
        this.$options.template = this.template;

        this.$store.dispatch("loadBasketData");
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

            window.addEventListener("orientationchange", this.calcSplitBasketView());
        });
    },

    methods:
    {
        calcSplitBasketView()
        {
            this.splitBasketView = (window.matchMedia("(max-width: 767px)").matches && (window.orientation == -90 || window.orientation == 90));
        }
    }
});
