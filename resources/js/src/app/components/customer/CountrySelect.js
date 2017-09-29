var CountryService = require("services/CountryService");

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
            selectedCountry: {}
        };
    },

    computed: Vuex.mapState({
        shippingCountryId: state => state.localization.shippingCountryId
    }),

    /**
     * Get the shipping countries
     */
    created()
    {
        this.$options.template = this.template;

        this.selectedCountryId = this.selectedCountryId || this.shippingCountryId;

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
            this.selectedCountryId = this.selectedCountryId || this.shippingCountryId;
            this.selectedCountry = this.getCountryById(this.selectedCountryId);

            if (this.selectedCountry)
            {
                this.stateList = CountryService.parseShippingStates(this.countryList, this.selectedCountryId);

                this.$dispatch("selected-country-changed", this.selectedCountry);
            }
        }
    }
});
