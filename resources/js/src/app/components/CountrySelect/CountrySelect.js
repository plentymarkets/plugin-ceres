var CountryService = require('services/CountryService');

Vue.component('country-select', {

    template: '#vue-country-select',

    props: [
        'countryData',
        'countryNameMap',
        'selectedCountryId',
        'selectedStateId'
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
        countryChanged: function()
        {
            this.selectedStateId = null;
        }
    },

    watch: {
        'selectedCountryId': function()
        {
            this.countryList = CountryService.parseShippingCountries(this.countryData, this.selectedCountryId);
            this.stateList   = CountryService.parseShippingStates(this.countryData, this.selectedCountryId);
        }
    }
});
