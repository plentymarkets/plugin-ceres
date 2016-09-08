var NotificationService = require('services/NotificationService');

Vue.component('user-login-watcher',
{
    props:
    [
        "userLoggedIn",
        "route",
        "isUserLoggedIn"
    ],

    ready: function()
    {
        if(this.route.length > 0)
        {
            if(this.userLoggedIn == this.isUserLoggedIn)
            {
                if(this.userLoggedIn == "false")
                {
                    NotificationService.error("Bitte einloggen").closeAfter(3000);
                }
                else
                {
                    NotificationService.error("Du bist bereits eingeloggt").closeAfter(3000);
                }

                window.location.pathname = this.route;
            }
        }
    },
});
