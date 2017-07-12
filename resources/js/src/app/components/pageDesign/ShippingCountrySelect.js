var ResourceService = require("services/ResourceService");
var CheckoutService = require("services/CheckoutService");

Vue.component("shipping-country-select", {

    props: [
        "countryFlagPrefix",
        "template",
        "selectable"
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
    },

    methods:
    {
        setShippingCountry: function(id)
        {
            if (!this.selectable)
            {
                this.localization.currentShippingCountryId = id;
                CheckoutService.setShippingCountryId(id);
            }
        }
    }
});

