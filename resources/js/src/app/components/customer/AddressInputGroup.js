Vue.component("address-input-group", {

    props: [
        "addressData",
        "defaultCountry",
        "addressType",
        "template"
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
        this.$options.template = this.template;

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
