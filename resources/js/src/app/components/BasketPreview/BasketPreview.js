var BasketService         = require('services/BasketService');
var MonetaryFormatService = require('services/MonetaryFormatService');
var ModalService          = require('services/ModalService');

Vue.component('basket-preview', {

    activate: function( done )
    {
        var self = this;
        BasketService.watch(function( data ) {
            self.$set( 'basket', data.basket );
            self.$set( 'basketItems', data.basketItems );
            self.$set( 'items', data.items );
        });
        BasketService.init( jQuery.parseJSON(this.basketData) ).done(function()
        {
            done();
        });
    },

    template: '#vue-basket-preview',

    props: [
        "basketData",
        "baseUrl"
    ],

    data: function()
    {
        return {
            basket: {},
            basketItems: [],
            items: {}
        };
    },

    computed:
    {
        itemTotalSum: function ()
        {
          return MonetaryFormatService.formatMonetary(this.basket.itemSum, "EUR");
        },
        basketTotalSum: function ()
        {
          return MonetaryFormatService.formatMonetary(this.basket.basketAmount, "EUR");
        },
        shippingTotalSum: function ()
        {
          return MonetaryFormatService.formatMonetary(this.basket.shippingAmount, "EUR");
        },
        checkBasket: function ()
        {
          if(this.basketItems.length > 0)
          {
            if($('.basketBtn').hasClass('disabled'))
            {
              this.toggleBtnClasses();
            }
            return true;
          }
          else
          {
            this.toggleBtnClasses();
            return false;
          }
        }
    },

    methods:
    {
        toggleBtnClasses: function ()
        {
          $('.basketBtn').toggleClass('disabled');
          $('.checkOutBtn').toggleClass('disabled');
        }
    }
});
