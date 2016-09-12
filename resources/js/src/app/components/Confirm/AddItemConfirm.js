var BasketService         = require('services/BasketService');
var ApiService            = require('services/ApiService');
var NotificationService   = require('services/NotificationService');
var ModalService          = require('services/ModalService');
var MonetaryFormatService = require('services/MonetaryFormatService');

Vue.component('add-item-confirm', {

    props: [
        "basketItem",
        "baseUrl",
        "quantity"
    ],

    template: '#vue-add-item-confirm',

    methods: {

        getImage: function()
        {
            var path = '';

            for (var i = 0; i < this.basketItem.variationImageList.length; i++)
            {
                if (this.basketItem.variationImageList[i].path !== '')
                {
                    path = this.basketItem.variationImageList[i].path;
                }
            }
            return this.baseUrl + "/" + path;
        }

    }
});
