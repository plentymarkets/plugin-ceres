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
     * Add a shipping provider
     * Initialise the event listener
     */
    created: function()
    {
        // Use when real data is implemented
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
         * Method on shipping profile changed
         */
        onShippingProfileChange: function()
        {
            // TODO remove log
            console.log(this.shippingProfileList);
            console.log(this.selectedShippingProfile);
        },

        /**
         * Format the price
         * @param price
         * @param currency
         * @returns {*}
         */
        formatPrice: function(price, currency)
        {
            return MonetaryFormatService.formatMonetary(price, currency);
        },

        /**
         * Add the event listener
         */
        addEventListener: function()
        {
            // Listen for ApiService events and handle new data
        }
    }
});
