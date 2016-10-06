var ResourceService      = require("services/ResourceService");

Vue.component("add-to-basket", {

    template: "#vue-add-to-basket",

    data: function()
    {
        return {
            quantity: 1
        };
    },

    methods:
    {
        updateQuantity: function(value)
        {
            this.quantity = value;
        },

        addToBasket: function()
        {
            var self = this;

            ResourceService
                .getResource("basketItems")
                .push({
                    variationId: ResourceService.getResource("currentVariation").val().variationBase.id,
                    quantity: this.quantity
                }).done(function()
                {
                    self.quantity = 1;
                });
        }
    }
});
