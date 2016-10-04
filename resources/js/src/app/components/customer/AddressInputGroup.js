Vue.component("address-input-group", {

    template: "#vue-address-input-group",

    props: [
        "addressData",
        "locale"
    ],

    /**
     * check if address data exist and create an empty one if not
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
