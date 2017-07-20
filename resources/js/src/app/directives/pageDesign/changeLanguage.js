const ApiService = require("services/ApiService");

Vue.directive("change-lang", function(value)
{
    $(this.el).click(function(event)
    {
        ApiService.put("/rest/io/localization/language/" + value.lang)
            .done(function(response)
            {
                window.location.reload();
            })
            .fail(function(response)
            {

            });
    });
});
