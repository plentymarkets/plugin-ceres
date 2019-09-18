import ApiService from "../../services/ApiService";
import Vue from "vue";
import { mapState } from "vuex";

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

    computed: mapState({
        basket: state => state.basket.data,
        basketItems: state => state.basket.items,
        basketNotifications: state => state.basket.basketNotifications,
        isBasketItemQuantityUpdate: state => state.basket.isBasketItemQuantityUpdate
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
                    this.$store.commit("setWishListIds", data.basket.itemWishListIds);
                });
        });

        if (App.config.basket.addItemToBasketConfirm === "preview")
        {
            ApiService.listen("AfterBasketItemAdd", data =>
            {
                this.show();
            });

            ApiService.listen("AfterBasketItemUpdate", data =>
            {
                if (!this.isBasketItemQuantityUpdate)
                {
                    this.show();
                }
            });
        }
    },

    methods:
    {
        show()
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
});
