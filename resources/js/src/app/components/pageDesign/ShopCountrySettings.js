const ApiService = require("services/ApiService");

Vue.component("shop-country-settings", {

    template: "<div><slot></slot></div>",

    props: [
        "localizationData"
    ],

    created()
    {
        this.$store.dispatch("initLocalization", {localizationData: this.localizationData});

        ApiService.listen("LocalizationChanged",
            localizationData =>
            {
                this.$store.dispatch("initLocalization", {localizationData: this.localizationData});
            });
    }
});

