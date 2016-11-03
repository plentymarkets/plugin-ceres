var CountryService = require("services/CountryService");

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
            selectedCountry: {}
        };
    },

    /**
     * Get the shipping countries
     */
    created: function()
    {
        // TODO change to session/default country
        this.selectedCountryId = this.selectedCountryId || 1;

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
            this.selectedCountry = this.getCountryById(this.selectedCountryId);

            if (this.selectedCountry)
            {
                this.stateList = CountryService.parseShippingStates(this.countryList, this.selectedCountryId);

                this.$dispatch("selected-country-changed", this.selectedCountry.isoCode2);
            }
        }
    }
});
