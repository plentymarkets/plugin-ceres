Vue.component("address-input-group", {

    delimiters: ["${", "}"],

    props:
    {
        defaultCountry: {
            type: String,
            default: "DE"
        },
        addressType: String,
        modalType: String,
        template: String,
        value: {
            type: Object,
            default()
            {
                return {};
            }
        }
    },

    data()
    {
        return {
            stateList  : [],
            countryLocaleList: ["DE", "GB"],
            localeToShow: this.defaultCountry
        };
    },

    /**
     * Check whether the address data exists. Else, create an empty one
     */
    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
        /**
         * Update the address input group to show.
         * @param shippingCountry
         */
        onSelectedCountryChanged(shippingCountry)
        {
            if (this.countryLocaleList.indexOf(shippingCountry.isoCode2) >= 0)
            {
                this.localeToShow = shippingCountry.isoCode2;
            }
            else
            {
                this.localeToShow = this.defaultCountry;
            }

            this.emitInputEvent("countryId", shippingCountry.id);
        },

        /**
         * @param {string} field
         * @param {number} value
         */
        emitInputEvent(field, value)
        {
            this.$emit("input", {field, value});
        }
    }
});
