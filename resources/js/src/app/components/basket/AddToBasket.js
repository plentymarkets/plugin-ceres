var ResourceService = require("services/ResourceService");

Vue.component("add-to-basket", {

    template: "#vue-add-to-basket",

    props: [
        "item",
        "showQuantity"
    ],

    data: function()
    {
        return {
            quantity: 1
        };
    },

    methods:
    {
        /**
         * add an item to basket-resource
         */
        addToBasket: function()
        {
            var basketObject =
                {
                    variationId: this.variationId,
                    quantity   : this.quantity
                };

            ResourceService
                .getResource("basketItems")
                .push(basketObject);

            this.openAddToBasketOverlay();
        },

        /**
         * open the AddItemToBasketOverlay
         */
        openAddToBasketOverlay: function()
        {
            var currentBasketObject =
                {
                    currentBasketItem: this.item,
                    quantity         : this.quantity
                };

            ResourceService
                .getResource("basketItem")
                .set(currentBasketObject);
        },

        /**
         * update the property quantity of the current instance
         * @param value
         */
        updateQuantity: function(value)
        {
            this.quantity = value;
        }
    },

    computed:
    {
        /**
         * returns item.variation.categoryVariationId
         */
        variationId: function()
        {
            return this.item.variation.categoryVariationId;
        }
    }
});
