var BasketService = require( 'services/BasketService' );

Vue.component( 'delete-from-basket', {

    template: '#vue-delete-from-basket',

    props: [
        'basketItem'
    ],

    methods: {

      deleteItem: function () {
        BasketService.deleteBasketItem(this.basketItem);
      }

    }

} );
