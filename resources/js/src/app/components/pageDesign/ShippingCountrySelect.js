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
            localization: {},
            checkout: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("localization", this);
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
