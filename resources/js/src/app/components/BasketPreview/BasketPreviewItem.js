var ResourceService       = require('services/ResourceService');
var MonetaryFormatService = require('services/MonetaryFormatService');

Vue.component('basket-preview-item', {

    template: '#vue-basket-preview-item',

    props: [
        "basketItem"
    ],

    data: function()
    {
        return {
            waiting: false,
            deleteConfirmed: false,
            deleteConfirmedTimeout: null
        };
    },

    methods: {

        deleteItem: function()
        {
            var self = this;
            if( !this.deleteConfirmed )
            {
                this.deleteConfirmed = true;
                this.deleteConfirmedTimeout = window.setTimeout(
                    function()
                    {
                        self.resetDelete();
                    },
                    5000
                );
            }
            else
            {
                this.waiting = true;
                ResourceService
                    .getResource( "basketItems" )
                    .remove( this.basketItem.id )
                    .done( function() {
                        self.resetDelete();
                    });
            }
        },

        updateQuantity: function( quantity )
        {
            if( this.basketItem.quantity === quantity )
            {
                return;
            }

            this.basketItem.quantity = quantity;
            this.waiting = true;
            var self = this;

            ResourceService
                .getResource( 'basketItems' )
                .set( this.basketItem.id, this.basketItem )
                .done( function() {
                    self.waiting = false;
                });
        },

        resetDelete: function()
        {
            this.deleteConfirmed = false;
            if( !!this.deleteConfirmedTimeout )
            {
                window.clearTimeout( this.deleteConfirmedTimeout );
            }
        }
    }
});
