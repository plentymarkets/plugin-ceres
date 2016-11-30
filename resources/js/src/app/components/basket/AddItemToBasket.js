var ResourceService     = require("services/ResourceService");

Vue.component("add-item-to-basket", {

    props: [
        "item",
        "showQuantity"
    ],

    template: "#vue-add-item-to-basket",

    data: function()
    {
        return {
            quantity: 1
        };
    },

    methods: {

        addToBasket: function()
        {
            var basketObject = {variationId: this.item.variationBase.id, quantity: this.quantity};

            ResourceService
                .getResource("basketItems")
                .push(basketObject);

            var currentBasketObject = {currentBasketItem: this.item, quantity: this.quantity};

            ResourceService
                .getResource("basketItem")
                .set(currentBasketObject);
        },

        updateQuantity: function(value)
        {
            this.quantity = value;
        }
    }
});
