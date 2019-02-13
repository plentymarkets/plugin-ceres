Vue.component("address-header", {

    props: {
        template: {
            type: String,
            default: "#vue-address-header"
        },
        address: {
            type: Object,
            required: true
        }
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
        getCountryName(countryId)
        {
            return this.$store.getters.getCountryName(countryId);
        }
    },

    filters:
    {
        optionType(selectedAddress, typeId)
        {
            // TODO DUPLICATE (Address Select) - move to vuex
            if (selectedAddress && selectedAddress.options)
            {
                for (const optionType of selectedAddress.options)
                {
                    if (optionType.typeId === typeId)
                    {
                        return optionType.value;
                    }
                }
            }

            return "";
        }
    }
});
