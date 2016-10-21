var CheckoutService = require("services/CheckoutService");

Vue.component("invoice-address-select", {

    template: "<address-select v-on:address-changed=\"addressChanged\" address-type=\"1\" :address-list=\"addressList\" :selected-address-id=\"selectedAddressId\"></address-select>",

    props: ["addressList", "selectedAddressId"],

    /**
     * Initialise the event listener
     */
    created: function()
    {
        this.addEventListener();
        CheckoutService.init();
    },

    methods: {
        /**
         * Add the event listener
         */
        addEventListener: function()
        {
            // Listen for ApiService events and handle new data
        },

        /**
         * Update the invoice address
         * @param selectedAddress
         */
        addressChanged: function(selectedAddress)
        {
            CheckoutService.setBillingAddressId(selectedAddress.id);
        }
    }
});
