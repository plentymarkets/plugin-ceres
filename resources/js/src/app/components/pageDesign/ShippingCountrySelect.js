const ResourceService = require("services/ResourceService");
const CheckoutService = require("services/CheckoutService");

Vue.component("shipping-country-select", {

    props: [
        "countryFlagPrefix",
        "template",
        "selectable"
    ],

    data()
    {
        return {
            localization: {}
        };
    },

    created()
    {
        this.$options.template = this.template;

        ResourceService.bind("localization", this);

        for (const i in this.localization.activeShippingCountries)
        {
            const country = this.localization.activeShippingCountries[i];

            country.countryFlagClass = this.countryFlagPrefix + country.isoCode2.toLowerCase();
        }
    },

    methods:
    {
        setShippingCountry(id)
        {
            if (!this.selectable)
            {
                this.localization.currentShippingCountryId = id;
                CheckoutService.setShippingCountryId(id);
            }
        }
    }
});

