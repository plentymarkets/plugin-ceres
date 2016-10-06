var ApiService = require("services/ApiService");

Vue.directive("place-order", function()
{
    params: ['trigger'],

    /**
     * TODO
     */
    $elem.click(function(event)
    {
        event.preventDefault();

        ApiService.post("/rest/order")
            .done(function(response)
            {
                var target = $elem.attr("href") || $elem.parents("form").attr("action");

                window.location.assign(target);
            });
    });
});
