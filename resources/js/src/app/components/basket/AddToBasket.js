var ResourceService       = require('services/ResourceService');
var ApiService          = require('services/ApiService');
var NotificationService = require('services/NotificationService');
var ModalService        = require('services/ModalService');

Vue.component('add-to-basket', {

    template: '#vue-add-to-basket',

    data: function()
    {
        return {
            quantity: 1
        };
    },

    methods:
    {
        updateQuantity: function( value )
        {
            this.quantity = value;
        },

        addToBasket: function()
        {
            var self = this;
            ResourceService
                .getResource( "basketItems" )
                .push({
                    variationId: ResourceService.getResource("currentVariation").val().variationBase.id,
                    quantity: this.quantity
                }).done( function() {
                    self.quantity = 1;
                });
        }
    }
});
