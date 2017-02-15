var ResourceService = require("services/ResourceService");

Vue.component("add-to-basket", {

    props: [
        "item",
        "showQuantity",
        "itemUrl",
        "template"
    ],

    data: function()
    {
        return {
            quantity: 1
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    computed:
    {
        /**
         * returns item.variation.id
         */
        variationId: function()
        {
            return this.item.variation.id;
        }
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

        // directToItem: function()
        // {
        //     window.location.assign(this.itemUrl);
        // },

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
    }
});
