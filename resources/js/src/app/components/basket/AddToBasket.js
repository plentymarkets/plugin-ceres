var BasketService       = require('services/BasketService');
var ApiService          = require('services/ApiService');
var NotificationService = require('services/NotificationService');
var ModalService        = require('services/ModalService');

Vue.component('add-to-basket', {

    template: '#vue-add-to-basket',

    props: [
        "basketItem",
        "baseUrl"
    ],

    data: function()
    {
        return {
            quantity: 1
        };
    },

    methods: {

        addToBasket: function(quantity)
        {
            var addItemModal = ModalService.findModal($(this.$el.parentElement));
            addItemModal.setTimeout(10000);

            $(".wrapper-bottom").append(addItemModal.getModalContainer());

            BasketService.addBasketItem({
                variationId: this.basketItem.variationBase.id,
                quantity   : this.quantity
            }).done(function()
            {
                addItemModal.show();
            })
                .fail(function()
                {
                    NotificationService.error(Translations.Callisto.basketItemNotAdded).closeAfter(10000);
                });
        },

        quantityPlus: function()
        {
            this.quantity++;
        },

        quantityMinus: function()
        {
            if (this.quantity > 1)
            {
                this.quantity--;
            }
        }
    }
});
