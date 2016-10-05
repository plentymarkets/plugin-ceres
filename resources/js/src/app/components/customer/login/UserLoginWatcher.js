var NotificationService = require("services/NotificationService");

Vue.component("user-login-watcher", {

    props: [
        "userLoggedIn",
        "route",
        "isUserLoggedIn"
    ],

    /**
     * Check whether the user is logged in or logged out
     * Route to the new route
     */
    ready: function()
        {
        if (this.route.length > 0)
            {
            if (this.userLoggedIn == this.isUserLoggedIn)
                {
                if (this.userLoggedIn == "false")
                    {
                    NotificationService.error(Translations.Callisto.accPleaseLogin).closeAfter(3000);
                }
                else
                    {
                    NotificationService.error(Translations.Callisto.accAlreadyLoggedIn).closeAfter(3000);
                }

                window.location.pathname = this.route;
            }
        }
    }
});
