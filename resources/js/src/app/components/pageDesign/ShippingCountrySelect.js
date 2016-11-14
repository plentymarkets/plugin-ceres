var ResourceService = require("services/ResourceService");

Vue.component("shipping-country-select", {

    template: "#vue-shipping-country-select",

    data: function()
    {
        return {
            shippingCountryList: [],
            currentShippingCountryId: ""
        };
    },

    created: function()
    {
        ResourceService.bind("activeShippingCountries", this, "shippingCountryList");
        ResourceService.bind("currentShippingCountryId", this, "currentShippingCountryId");

        for (var i in this.shippingCountryList)
        {
            var country = this.shippingCountryList[i];

            country.countryFlagClass = "flag-icon-" + country.isoCode2.toLowerCase();
        }
    }
});
