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
                "promotionCoupon",
                "totalSumNet",
                "vats",
                "totalSumGross",
                "salesCoupon",
                "openAmount"
            ]
        }
    },

    computed:
    {
        currentShippingCountry()
        {
            const shippingCountryId = this.basket.shippingCountryId;

            return this.shippingCountries.find(country => country.id === shippingCountryId);
        },

        shopCountry()
        {
            const shopCountryId = this.basket.shopCountryId;

            return this.shippingCountries.find(country => country.id === shopCountryId);
        },

        ...mapState({
            basket: state => state.basket.data,
            isBasketLoading: state => state.basket.isBasketLoading,
            shippingCountries: state => state.localization.shippingCountries,
            showNetPrices: state => state.basket.showNetPrices
        })
    },

    methods: {
        calculateBaseValue(value, percent)
        {
            return (value / (100 - percent)) * 100;
        }
    }
});
