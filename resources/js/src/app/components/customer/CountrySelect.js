var CountryService = require("services/CountryService");
var ResourceService = require("services/ResourceService");

Vue.component("country-select", {

    props: [
        "countryList",
        "countryNameMap",
        "selectedCountryId",
        "selectedStateId",
        "template",
        "addressType"
    ],

    data: function()
    {
        return {
            stateList  : [],
            selectedCountry: {},
            localization: {}
        };
    },

    /**
     * Get the shipping countries
     */
    created()
    {
        this.$options.template = this.template;

        ResourceService.bind("localization", this);
        this.selectedCountryId = this.selectedCountryId || this.localization.currentShippingCountryId;

        CountryService.translateCountryNames(this.countryNameMap, this.countryList);
        CountryService.sortCountries(this.countryList);
    },

    methods: {
        /**
         * Method to fire when the country has changed
         */
        countryChanged()
        {
            this.selectedStateId = null;
        },

        /**
         * @param countryId
         * @returns {*}
         */
        getCountryById(countryId)
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
        selectedCountryId()
        {
            this.selectedCountryId = this.selectedCountryId || this.localization.currentShippingCountryId;
            this.selectedCountry = this.getCountryById(this.selectedCountryId);

            if (this.selectedCountry)
            {
                this.stateList = CountryService.parseShippingStates(this.countryList, this.selectedCountryId);

                this.$dispatch("selected-country-changed", this.selectedCountry);
            }
        }
    }
});
