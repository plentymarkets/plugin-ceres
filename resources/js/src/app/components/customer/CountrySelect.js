var CountryService = require("services/CountryService");
var ResourceService = require("services/ResourceService");

Vue.component("country-select", {

    template: "#vue-country-select",

    props: [
        "countryList",
        "countryNameMap",
        "selectedCountryId",
        "selectedStateId"
    ],

    data: function()
    {
        return {
            stateList  : [],
            selectedCountry: {},
            checkout: {}
        };
    },

    /**
     * Get the shipping countries
     */
    created: function()
    {
        ResourceService.bind("checkout", this, "checkout");
        this.selectedCountryId = this.selectedCountryId || this.checkout.currentShippingCountryId;

        CountryService.translateCountryNames(this.countryNameMap, this.countryList);
        CountryService.sortCountries(this.countryList);
    },

    methods: {
        /**
         * Method to fire when the country has changed
         */
        countryChanged: function()
        {
            this.selectedStateId = null;
        },

        /**
         * @param countryId
         * @returns {*}
         */
        getCountryById: function(countryId)
        {
            return this.countryList.find(
                function(country)
                {
                    if (country.id === countryId)
                    {
                        return country;
                    }

                    return null;
                });
        }
    },

    watch: {
        /**
         * Add watcher to handle the country changed
         */
        selectedCountryId: function()
        {
            this.selectedCountryId = this.selectedCountryId || this.checkout.currentShippingCountryId;
            this.selectedCountry = this.getCountryById(this.selectedCountryId);

            if (this.selectedCountry)
            {
                this.stateList = CountryService.parseShippingStates(this.countryList, this.selectedCountryId);

                this.$dispatch("selected-country-changed", this.selectedCountry.isoCode2);
            }
        }
    }
});
