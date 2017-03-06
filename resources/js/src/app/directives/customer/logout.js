var ApiService = require("services/ApiService");

Vue.directive("logout", function()
{
    /**
     * Logout the current user
     */
    $(this.el).click(
        function(event)
        {
            $(this.el).addClass("disabled");

            ApiService.post("/rest/io/customer/logout")
                .done(
                    function()
                    {
                        window.location.assign(window.location.origin);
                    })
                .fail(
                    function()
                    {
                        $(this.el).removeClass("disabled");
                    }.bind(this));

            event.preventDefault();
        }.bind(this));
});
