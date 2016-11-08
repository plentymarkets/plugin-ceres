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

        if (!this.addressList)
        {
            this.addressList = [];
        }

        // Adds the dummy entry for "delivery address same as invoice address"
        this.addressList.unshift({
            id: -99
        });

        // if there is no selection for delivery address, the dummy entry will be selected
        if (this.selectedAddressId === 0)
        {
            this.selectedAddressId = -99;
            CheckoutService.setDeliveryAddressId(-99);
        }
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
