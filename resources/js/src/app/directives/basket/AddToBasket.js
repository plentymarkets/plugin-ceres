var ResourceService     = require("services/ResourceService");

Vue.directive("add-to-basket", function(value)
{
    /**
     * add the item to the basket
     */
    $(this.el).click(
        function(event)
        {
            ResourceService
              .getResource("basketItems")
              .push(value);

            event.preventDefault();

        });

        // TODO let AddItemConfirm open

});
