var ResourceService       = require('services/ResourceService');
var ModalService          = require('services/ModalService');

Vue.component('basket-preview', {

    template: '#vue-basket-preview',

    data: function()
    {
        return {
            basket: {},
            basketItems: []
        };
    },
    
    ready: function()
    {
        ResourceService.bind( "basket", this );
        ResourceService.bind( "basketItems", this );
    }
});