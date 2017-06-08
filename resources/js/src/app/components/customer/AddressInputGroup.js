Vue.component("address-input-group", {

    props: [
        "addressData",
        "defaultCountry",
        "addressType",
        "modalType",
        "template"
    ],

    data()
    {
        return {
            stateList  : [],
            countryLocaleList: ["DE", "GB"],
            localeToShow: ""
        };
    },

    /**
     * Check whether the address data exists. Else, create an empty one
     */
    created()
    {
        this.$options.template = this.template;

        if (!this.addressData)
        {
            this.addressData = {};
        }

        this.defaultCountry = "DE";
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
        },

        getOptionType(data, optionType)
        {
            for (var i = 0; i < data.length; i++)
            {
                if (optionType === data[i].typeId)
                {
                    return data[i].value;
                }
            }
            return "";
        },

        equalOptionValues(newValue, data, optionType)
        {
            var oldValue = this.getOptionType(data, optionType);

            if (typeof newValue === "undefined")
            {
                return oldValue;
            }

            return oldValue === newValue;
        }
    },

    filters: {
        optionType:{

            read(value, optionType)
            {
                var data = this.addressData.options;

                if (typeof data === "undefined")
                {
                    return value;
                }
                else if (this.modalType === "update" && !this.equalOptionValues(value, data, optionType))
                {
                    return value;
                }

                return this.getOptionType(data, optionType);

            },

            write(value)
            {
                return value;
            }
        }
    }
});
