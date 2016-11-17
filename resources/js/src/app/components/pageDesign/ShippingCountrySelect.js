var ResourceService = require("services/ResourceService");

Vue.component("shipping-country-select", {

    template: "#vue-shipping-country-select",

    props:
    [
        "countryFlagPrefix"
    ],

    data: function()
    {
        return {
            localization: {}
        };
    },

    created: function()
    {
        ResourceService.bind("localization", this);

        for (var i in this.localization.activeShippingCountries)
        {
            var country = this.localization.activeShippingCountries[i];

            country.countryFlagClass = this.countryFlagPrefix + country.isoCode2.toLowerCase();
        }
    }
});
