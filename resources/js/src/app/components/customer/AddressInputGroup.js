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

    computed:
    {
        isPickupStation()
        {
            return this.value && this.value.address1 === "PACKSTATION";
        },

        isPostOffice()
        {
            return this.value && this.value.address1 === "POSTFILIALE";
        }
    },

    data()
    {
        return {
            stateList  : [],
            countryLocaleList: ["DE", "GB"],
            localeToShow: this.defaultCountry,
            selectedCountry: null
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
            this.selectedCountry = shippingCountry;
            
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

        togglePickupStation(showPickupStation)
        {
            if (showPickupStation &&
                (!this.isPickupStation ||
                !this.isPostOffice))
            {
                this.emitInputEvent("address1", "PACKSTATION");
            }

            this.emitInputEvent("showPickupStation", showPickupStation);
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
