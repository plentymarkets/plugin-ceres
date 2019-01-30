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
        },
        optionalAddressFields: {
            type: Object,
            default: () =>
            {
                return {
                    de:[],
                    uk:[]
                };
            }
        },
        requiredAddressFields: {
            type: Object,
            default: () =>
            {
                return {
                    de:[],
                    uk:[]
                };
            }
        }
    },

    computed:
    {
        isPickupStation()
        {
            return this.value && this.value.address1 === "PACKSTATION" && this.isParcelBoxAvailable;
        },

        isPostOffice()
        {
            return this.value && this.value.address1 === "POSTFILIALE" && this.isPostOfficeAvailable;
        },

        isParcelOrOfficeAvailable()
        {
            return (this.isParcelBoxAvailable || this.isPostOfficeAvailable) && this.selectedCountry && this.selectedCountry.isoCode2 === "DE" && this.addressType === "2";
        },

        ...Vuex.mapState({
            isParcelBoxAvailable: state => state.checkout.shipping.isParcelBoxAvailable,
            isPostOfficeAvailable: state => state.checkout.shipping.isPostOfficeAvailable
        })
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

            if (this.isPickupStation || this.isPostOffice)
            {
                this.togglePickupStation(false);
            }
        },

        togglePickupStation(showPickupStation)
        {
            const emitInputs =
                {
                    address1: "",
                    address2: "",
                    address3: "",
                    showPickupStation: showPickupStation
                };

            if (showPickupStation)
            {
                emitInputs.address1 = this.isParcelBoxAvailable ? "PACKSTATION" : "POSTFILIALE";
            }

            for (const input in emitInputs)
            {
                this.emitInputEvent(input, emitInputs[input]);
            }
        },

        /**
         * @param {string} field
         * @param {number} value
         */
        emitInputEvent(field, value)
        {
            this.$emit("input", { field, value });
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
    }
});
