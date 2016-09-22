var ResourceService       = require('services/ResourceService');

Vue.component('basket-list', {

    template: '#vue-basket-list',

    data: function()
    {
        return {
            basketItems: []
        };
    },

    ready: function()
    {
        ResourceService.bind( "basketItems", this );
    }
});
