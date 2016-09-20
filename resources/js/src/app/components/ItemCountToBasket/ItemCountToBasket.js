var BasketService = require('services/BasketService');

Vue.component('item-count-to-basket', {

    template: '#vue-item-count-to-basket',

    props: [
        'basketItem',
        'quantity'
    ],

    methods: {

        quantityPlus: function()
        {
            this.quantity++;

            this.basketItem.quantity = this.quantity;
            BasketService.updateBasketItem(this.basketItem);
        },

        quantityMinus: function()
        {
            if (this.quantity > 1)
            {
                this.quantity--;

                this.basketItem.quantity = this.quantity;
                BasketService.updateBasketItem(this.basketItem);
            }
        }
    }
});
