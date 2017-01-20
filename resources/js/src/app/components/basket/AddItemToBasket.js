var ResourceService     = require("services/ResourceService");

Vue.component("add-item-to-basket", {

    props: [
        "item",
        "showQuantity",
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
