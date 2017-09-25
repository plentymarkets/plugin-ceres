const ApiService = require("services/ApiService");

Vue.component("shop-country-settings", {

    template: "<div><slot></slot></div>",

    props: [
        "localizationData",
        "countryFlagPrefix"
    ],

    created()
    {
        this.$store.dispatch("initLocalization", {localizationData: this.localizationData, countryFlagPrefix: this.countryFlagPrefix});

        ApiService.listen("LocalizationChanged",
            localizationData =>
            {
                this.$store.dispatch("initLocalization", {localizationData: this.localizationData, countryFlagPrefix: this.countryFlagPrefix});
            });
    }
});

