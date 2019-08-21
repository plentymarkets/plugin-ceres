import Vue from "vue";
import { mapState } from "vuex";

Vue.component("basket-totals", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-basket-totals"
        },
        visibleFields:
        {
            type: Array,
            default: () => [
                "basketValueNet",
                "basketValueGross",
                "rebate",
                "shippingCostsNet",
                "shippingCostsGross",
                "totalSumNet",
                "promotionCoupon",
                "vats",
                "totalSumGross",
                "salesCoupon",
                "openAmount"
            ]
        }
    },

    computed: mapState({
        basket: state => state.basket.data,
        isBasketLoading: state => state.basket.isBasketLoading,
        showNetPrices: state => state.basket.showNetPrices
    }),

    methods: {
        calculateBaseValue(value, percent)
        {
            return (value / (100 - percent)) * 100;
        }
    }
});
