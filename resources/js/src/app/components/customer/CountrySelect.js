var CountryService = require("services/CountryService");

Vue.component("country-select", {

    template: "#vue-country-select",

    props: [
        "countryData",
        "countryNameMap",
        "selectedCountryId",
        "selectedStateId"
    ],

    data: function()
    {
        return {
            countryList: [],
            stateList  : []
        };
    },

    /**
     * get shipping countries
     */
    created: function()
    {
        this.countryList = CountryService.parseShippingCountries(this.countryData, this.selectedCountryId ? this.selectedCountryId : 1);

        CountryService.translateCountryNames(this.countryNameMap, this.countryList);
        CountryService.sortCountries(this.countryList);
    },

    methods: {
        /**
         * method to fire when the country has changed
         */
        countryChanged: function()
        {
            this.selectedStateId = null;
        }
    },

    watch: {
        /**
         * add watcher to handle country changed
         */
        selectedCountryId: function()
        {
            this.countryList = CountryService.parseShippingCountries(this.countryData, this.selectedCountryId);
            this.stateList = CountryService.parseShippingStates(this.countryData, this.selectedCountryId);
        }
    }
});
