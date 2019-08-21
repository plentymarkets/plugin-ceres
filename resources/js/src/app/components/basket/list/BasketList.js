import Vue from "vue";
import { mapState } from "vuex";

Vue.component("basket-list", {
    props:
    {
        template:
        {
            type: String,
            default: "#vue-basket-list"
        },
        size:
        {
            type: String,
            default: "small"
        },
        isPreview:
        {
            type: Boolean,
            default: false
        }
    },

    computed: mapState({
        basketItems: state => state.basket.items,
        isBasketInitiallyLoaded: state => state.basket.isBasketInitiallyLoaded
    })
});
