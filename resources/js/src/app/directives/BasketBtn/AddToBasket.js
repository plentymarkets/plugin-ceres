var ResourceService     = require('services/ResourceService');
var NotificationService = require('services/NotificationService');

Vue.directive('add-to-basket', function(value)
{

    $(this.el).click(
        function(e)
        {
          ResourceService
              .getResource( 'basketItems' )
              .push(value);

          e.preventDefault();

        }.bind(this));

        //TODO let AddItemConfirm open

});
