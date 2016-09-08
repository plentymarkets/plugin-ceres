var MonetaryFormatService = require('services/MonetaryFormatService');

Vue.component('shipping-profile-select',
{
    template: '#vue-shipping-profile-select',

    props: ['shippingProfileData'],

    data: function () {
        return {
            shippingProfileList: [],
            selectedShippingProfile: {}
        }
    },

    created: function ()
    {
        // use when real data is implemented
        // if(this.shippingProfileData)
        // {
        //     this.shippingProfileList = jQuery.parseJSON(this.shippingProfileData);
        // }

        this.shippingProfileList =
            [
                {id: "1", name: "DHL", price: 3.99},
                {id: "2", name: "Hermes", price: 2.99},
                {id: "3", name: "UPS", price: 5}
            ];

        this.addEventListener();
    },

    methods:
    {
        onShippingProfileChange: function()
        {
            console.log(this.shippingProfileList);
            console.log(this.selectedShippingProfile);
        },

        formatPrice: function (price, currency)
        {
            return MonetaryFormatService.formatMonetary(price, currency);
        },

        addEventListener: function ()
        {
            //listen on APIService events and handle new data
        }
    }
});
