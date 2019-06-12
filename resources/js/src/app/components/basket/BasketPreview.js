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
        basketNotifications: state => state.basket.basketNotifications,
        latestBasketEntry: state => state.basket.latestEntry
    }),

    created()
    {
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
        });
    },

    watch:
    {
        latestBasketEntry()
        {
            if (App.config.basket.addItemToBasketConfirm === "preview" && Object.keys(this.latestBasketEntry.item).length !== 0)
            {
                setTimeout(function()
                {
                    const vueApp = document.querySelector("#vue-app");
                    const basketOpenClass = (App.config.basket.previewType === "right") ? "open-right" : "open-hover";

                    if (vueApp)
                    {
                        vueApp.classList.add(basketOpenClass);
                    }
                }, 1);
            }
        }
    }
});
