Vue.component("address-input-group", {

    template: "#vue-address-input-group",

    props: [
        "addressData",
        "locale"
    ],

    /**
     * Check whether the address data exists. Else, create an empty one
     */
    created: function()
    {
        if (!this.addressData)
        {
            this.addressData = {};
        }

        this.locale = "DE";
    }
});
