Vue.component("shipping-profile-select", {

    template: "#vue-shipping-profile-select",

    props: ["shippingProfileData"],

    data: function()
    {
        return {
            shippingProfileList    : [],
            selectedShippingProfile: {}
        };
    },

    /**
     * add shipping provider
     * init event listener
     */
    created: function()
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

    methods: {
        /**
         * method on shipping profile changed
         */
        onShippingProfileChange: function()
        {
            // TODO remove log
            // console.log(this.shippingProfileList);
            // console.log(this.selectedShippingProfile);
        },

        /**
         * format price
         * @param price
         * @param currency
         * @returns {*}
         */
        formatPrice: function(price, currency)
        {
            return MonetaryFormatService.formatMonetary(price, currency);
        },

        /**
         * add event listener
         */
        addEventListener: function()
        {
            // listen on APIService events and handle new data
        }
    }
});
