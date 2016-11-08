var CheckoutService = require("services/CheckoutService");

Vue.directive("shipping-country", function(value)
{
    $(this.el).click(function(event)
    {
        event.preventDefault();
        CheckoutService.setShippingCountryId(value);
    });
});
