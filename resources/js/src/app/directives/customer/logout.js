var ApiService          = require("services/ApiService");
var NotificationService = require("services/NotificationService");

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
                        NotificationService.success(Translations.Callisto.accLogoutSuccessful).closeAfter(3000);

                        // Remove the address IDs from the session after logout
                        ApiService.post("/rest/customer/address_selection/0/?typeId=-1")
                            .fail(function(error)
                            {
                                // console.warn(error);
                            });
                    }
                );

            event.preventDefault();

        });

});
