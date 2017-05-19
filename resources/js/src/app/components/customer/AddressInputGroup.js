Vue.component("address-input-group", {

    props: [
        "addressData",
        "defaultCountry",
        "addressType",
        "modalType",
        "template"
    ],

    data: function()
    {
        return {
            stateList  : [],
            countryLocaleList: ["DE", "GB"],
            localeToShow: ""
        };
    },

    filters:{
        optionType:{

            read: function(value, optionType)
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

            write: function(value)
            {
                return value;
            }

        }
    },

    /**
     * Check whether the address data exists. Else, create an empty one
     */
    created: function()
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
         * @param value
         */
        onSelectedCountryChanged: function(value)
        {
            if (this.countryLocaleList.indexOf(value) > 0)
            {
                this.localeToShow = value;
            }
            else
            {
                this.localeToShow = this.defaultCountry;
            }
        },

        getOptionType: function(data, optionType)
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

        equalOptionValues: function(newValue, data, optionType)
    {
            var oldValue = this.getOptionType(data, optionType);

            if (typeof newValue === "undefined")
{
                return oldValue;
            }

            return oldValue === newValue;
        }
    }
});
