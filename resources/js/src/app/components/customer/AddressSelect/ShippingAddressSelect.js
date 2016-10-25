var CheckoutService = require("services/CheckoutService");

Vue.component("shipping-address-select", {

    template: "<address-select v-on:address-changed=\"addressChanged\" address-type=\"2\" :address-list=\"addressList\" :selected-address-id=\"selectedAddressId\"></address-select>",

    props: ["addressList", "selectedAddressId"],

    /**
     * Initialise the event listener
     */
    created: function()
    {
        this.addEventListener();
    },

    /**
     * Adds the dummy entry for "delivery address same as invoice address"
     */
    ready: function()
    {
        if (!this.addressList)
        {
            this.addressList = [];
        }

        this.addressList.unshift({
            id: -99
        });
    },

    methods: {
        /**
         * Add the event listener
         */
        addEventListener: function()
        {
            // Listen on ApiService events and handle new data
        },

        /**
         * Update the delivery address
         * @param selectedAddress
         */
        addressChanged: function(selectedAddress)
        {
            CheckoutService.setDeliveryAddressId(selectedAddress.id);
        }
    }
});
