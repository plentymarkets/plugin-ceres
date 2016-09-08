var BasketService         = require( 'services/BasketService' );
var MonetaryFormatService = require( 'services/MonetaryFormatService' );
var ModalService          = require( 'services/ModalService' );

Vue.component( 'basket-item-list', {

    template: '#vue-basket-item-list',

    props   : [
        "baseUrl"
    ],

    data: function()
    {
        return {
            basket     : {},
            basketItems: [],
            items      : {}
        };
    },

    activate: function( done )
    {
        var self = this;
        BasketService.watch( function( data )
        {
            self.$set( 'basket', data.basket );
            self.$set( 'basketItems', data.basketItems );
            self.$set( 'items', data.items );
        } );
        BasketService.init().done( function()
        {
            done();
        } );
    },

    methods:
    {
        deleteItem: function( basketItem )
        {
            $(".art-" + basketItem.variationId).toggleClass('wait');

            BasketService.deleteBasketItem(basketItem);
        },
        calcPrice : function( basketItem )
        {
            var currency    = this.items[basketItem.variationId].variationRetailPrice.currency;
            var priceSum    = basketItem.quantity * this.items[basketItem.variationId].variationRetailPrice.price;

            return MonetaryFormatService.formatMonetary( priceSum, currency );
        },
        formatRetailPrice: function (basketItem)
        {
          var currency    = this.items[basketItem.variationId].variationRetailPrice.currency;
          var retailPrice = this.items[basketItem.variationId].variationRetailPrice.price;

          return MonetaryFormatService.formatMonetary( retailPrice, currency );
        },
        checkName: function (basketItem, name)
        {
          if(name !== '' )
          {
            return name + " " + this.items[basketItem.variationId].variationBase.variationName;
          }
          else
          {
            return this.items[basketItem.variationId].itemDescription.name1 + " " + this.items[basketItem.variationId].variationBase.variationName;
          }
        },

        setLinkToItem: function (basketItem)
        {
          var urlContent = this.items[basketItem.variationId].itemDescription.urlContent.split("/");
          var i = urlContent.length - 1;

          return "/" + urlContent[i] + "/" + this.items[basketItem.variationId].itemBase.id + "/" + this.items[basketItem.variationId].variationBase.id;
        },

        getImage: function (image)
        {
          return this.baseUrl + "/" + image;
        }
    }
})
