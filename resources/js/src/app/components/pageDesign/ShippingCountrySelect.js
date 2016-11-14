var ResourceService = require("services/ResourceService");

Vue.component("shipping-country-select", {

    template: "#vue-shipping-country-select",

    data: function()
    {
        return {
            checkout: {}
        };
    },

    created: function()
    {
        ResourceService.bind("checkout", this, "checkout");

        for (var i in this.checkout.activeShippingCountries)
        {
            var country = this.checkout.activeShippingCountries[i];

            country.countryFlagClass = "flag-icon-" + country.isoCode2.toLowerCase();
        }
    }
});
