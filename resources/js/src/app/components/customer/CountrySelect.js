Vue.component("country-select", {

    delimiters: ["${", "}"],

    props: [
        "countryList",
        "selectedCountryId",
        "selectedStateId",
        "template",
        "addressType",
        "optionalAddressFields",
        "requiredAddressFields"
    ],

    data()
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

        this.countryList.sort(function(first, second)
        {
            if (first.currLangName < second.currLangName)
            {
                return -1;
            }
            if (first.currLangName > second.currLangName)
            {
                return 1;
            }
            return 0;
        });
        this.updateSelectedCountry();
    },

    methods: {
        /**
         * Method to fire when the country has changed
         */
        countryChanged(value)
        {
            this.$emit("country-changed", this.getCountryById(parseInt(value)));
            this.$emit("state-changed", null);
        },

        /**
         * @param {*} value
         */
        stateChanged(value)
        {
            this.$emit("state-changed", parseInt(value));
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
        },

        updateSelectedCountry()
        {
            const countryId = this.selectedCountryId || this.shippingCountryId;

            this.selectedCountry = this.getCountryById(countryId);

            if (this.selectedCountry)
            {
                this.stateList = this.selectedCountry.states || [];
            }

            this.countryChanged(countryId);
        },

        isInOptionalFields(locale, key)
        {
            return this.optionalAddressFields[locale].includes(key);
        },

        isInRequiredFields(locale, key)
        {
            return (this.requiredAddressFields && this.requiredAddressFields[locale] && this.requiredAddressFields[locale].includes(key));
        }
    },

    filters: {
        transformRequiredLabel(label, shouldMarkRequired)
        {
            return shouldMarkRequired ? label + "*" : label;
        }
    },

    directives: {
        "data-validate": {
            inserted(el, binding)
            {
                if (binding.value.shouldAddProperty)
                {
                    el.dataset.validate = binding.value.validateType;
                }
            }
        }
    },

    watch: {
        selectedCountryId()
        {
            this.updateSelectedCountry();
        }
    }
});
