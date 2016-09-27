var CheckoutService = require('services/CheckoutService');

Vue.component('shipping-address-select', {

    template: '<address-select v-on:address-changed="addressChanged" address-type="2" :address-list="addressList" :selected-address-id="selectedAddressId"></address-select>',

    props: ['addressList', 'selectedAddressId'],

    created: function()
    {
        this.addEventListener();
    },

    methods: {
        addEventListener: function()
        {
            //listen on APIService events and handle new data
        },

        addressChanged: function(selectedAddress)
        {
            CheckoutService.setDeliveryAddressId(selectedAddress.id);
        }
    }
});
