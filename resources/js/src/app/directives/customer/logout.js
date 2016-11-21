var ApiService = require("services/ApiService");

Vue.directive("logout", function()
{
    /**
     * Logout the current user
     */
    $(this.el).click(
        function(event)
        {
            ApiService.post("/rest/customer/logout")
                .done(
                    function(response)
                    {
                        window.location.assign(window.location.origin);
                    }
                );

            event.preventDefault();
        });
});
