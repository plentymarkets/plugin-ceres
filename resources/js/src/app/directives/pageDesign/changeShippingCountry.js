var CheckoutService = require("services/CheckoutService");

Vue.directive("shipping-country",
    {
        bind(el)
        {
            el.onclick = function(event)
            {
                event.preventDefault();
                CheckoutService.setShippingCountryId(value);
            };
        }
    });
