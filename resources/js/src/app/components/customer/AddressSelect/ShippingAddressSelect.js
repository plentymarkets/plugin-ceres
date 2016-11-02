var ApiService = require("services/ApiService");
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

        var self = this;

        ApiService.listen("AfterAccountContactLogout",
            function()
            {
                var i = 0;

                while (i < self.addressList.length)
                {
                    var address = self.addressList[i];

                    if (address.id !== -99)
                    {
                        self.addressList.splice(i, 1);
                    }
                    else
                    {
                        ++i;
                    }
                }
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
