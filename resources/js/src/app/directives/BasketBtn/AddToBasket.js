var BasketService       = require('services/BasketService');
var NotificationService = require('services/NotificationService');

Vue.directive('add-to-basket', function(value)
{

    $(this.el).click(
        function(e)
        {
          BasketService.addBasketItem({
              variationId: value.id,
              quantity   : value.quantity
          });

          e.preventDefault();

        }.bind(this));

        //TODO let AddItemConfirm open 

});
