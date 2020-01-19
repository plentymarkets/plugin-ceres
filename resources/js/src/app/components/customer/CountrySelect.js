import TranslationService from "../../services/TranslationService";
import { isNullOrUndefined } from "../../helper/utils";
import Vue from "vue";
import { mapState } from "vuex";

Vue.component("country-select", {

    delimiters: ["${", "}"],

    props:
    {
        selectedCountryId: Number,
        selectedStateId: Number,
        template: {
            type: String,
            default: "#vue-country-select"
        },
        addressType: {
            type: String,
            required: true
        },
        optionalAddressFields: {
            type: Object,
            default: () =>
            {}
        },
        requiredAddressFields: {
            type: Object,
            default: () =>
            {}
        }
    },

    data()
    {
        return {
            stateList  : [],
            selectedCountry: {}
        };
    },

    computed:
    {
        addressKeyPrefix()
        {
            return this.addressType === "1" ? "billing_address." : "delivery_address.";
        },

        optionalFields()
        {
            const iso = this.selectedCountry.isoCode2.toLowerCase();

            if (isNullOrUndefined(this.optionalAddressFields[iso]))
            {
                return this.optionalAddressFields.de;
            }

            return this.optionalAddressFields[iso];
        },

        requiredFields()
        {
            const iso = this.selectedCountry.isoCode2.toLowerCase();

            if (isNullOrUndefined(this.requiredAddressFields[iso]))
            {
                return this.requiredAddressFields.de;
            }

            return this.requiredAddressFields[iso];
        },

        ...mapState({
            shippingCountryId: state => state.localization.shippingCountryId,
            countryList: state => state.localization.shippingCountries
        })
    },

    /**
     * Get the shipping countries
     */
    created()
    {
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

        isInOptionalFields(key)
        {
            return this.optionalFields.includes(this.addressKeyPrefix + key);
        },

        isInRequiredFields(key)
        {
            return this.requiredFields.includes(this.addressKeyPrefix + key);
        },

        transformTranslation(translationKey, addressKey)
        {
            const translation = TranslationService.translate(translationKey);
            const isRequired = this.isInRequiredFields(addressKey);

            return translation + (isRequired ? "*" : "");
        }
    },

    watch: {
        selectedCountryId()
        {
            this.updateSelectedCountry();
        }
    }
});
