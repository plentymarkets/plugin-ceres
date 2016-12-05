Vue.component("address-input-group", {

    template: "#vue-address-input-group",

    props: [
        "addressData",
        "defaultCountry"
    ],

    data: function()
    {
        return {
            stateList  : [],
            countryLocaleList: ["DE", "GB"],
            localeToShow: ""
        };
    },

    /**
     * Check whether the address data exists. Else, create an empty one
     */
    created: function()
    {
        if (!this.addressData)
        {
            this.addressData = {};
        }

        this.defaultCountry = "DE";
    },

    methods:
    {
        /**
         * Update the address input group to show.
         * @param value
         */
        onSelectedCountryChanged: function(value)
        {
            if (this.countryLocaleList.indexOf(value) > 0)
            {
                this.localeToShow = value;
            }
            else
            {
                this.localeToShow = this.defaultCountry;
            }
        }
    }
});
