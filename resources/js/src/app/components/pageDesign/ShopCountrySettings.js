const ApiService = require("services/ApiService");

Vue.component("shop-country-settings", {

    template: "<div><slot></slot></div>",

    props: {
        shippingCountries: Array,
        shippingCountryId: Number
    },

    created()
    {
        this.$store.commit("setShippingCountries", this.shippingCountries);
        this.$store.commit("setShippingCountryId", this.shippingCountryId);

        ApiService.listen("LocalizationChanged",
            localizationData =>
            {
                this.$store.commit("setShippingCountries", localizationData.activeShippingCountries);
                this.$store.commit("setShippingCountryId", localizationData.currentShippingCountryId);
            });
    }
});

