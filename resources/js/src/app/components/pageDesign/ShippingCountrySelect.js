var ResourceService = require("services/ResourceService");

Vue.component("shipping-country-select", {

    props: [
        "countryFlagPrefix",
        "template"
    ],

    data: function()
    {
        return {
            localization: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("localization", this);

        for (var i in this.localization.activeShippingCountries)
        {
            var country = this.localization.activeShippingCountries[i];

            country.countryFlagClass = this.countryFlagPrefix + country.isoCode2.toLowerCase();
        }
    }
});
