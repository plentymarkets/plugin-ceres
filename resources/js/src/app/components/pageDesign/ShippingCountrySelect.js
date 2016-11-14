Vue.component("shipping-country-select", {

    template: "#vue-shipping-country-select",

    props: [
        "shippingCountryList",
        "currentShippingCountryId"
    ],

    created: function()
    {
        for (var i in this.shippingCountryList)
        {
            var country = this.shippingCountryList[i];

            country.countryFlagClass = "flag-icon-" + country.isoCode2.toLowerCase();
        }
    }
});
