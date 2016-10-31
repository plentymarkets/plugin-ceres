var NotificationService = require("services/NotificationService");

Vue.component("notifications", {

    template: "#vue-notifications",

    props: [
        "initialNotifications"
    ],

    data: function()
    {
        return {
            notifications: []
        };
    },

    ready: function()
    {
        var self = this;

        NotificationService.listen(
            function(notifications)
            {
                self.$set("notifications", notifications);
            });

        self.showInitialNotifications();
    },

    methods : {
        /**
         * Dissmiss the notification
         * @param notification
         */
        dismiss: function(notification)
        {
            NotificationService.getNotifications().remove(notification);
        },

        /**
         * show initial notifications from server
         */
        showInitialNotifications: function()
        {
            for (var key in this.initialNotifications)
            {
                var type = this.initialNotifications[key].type;
                var message = this.initialNotifications[key].message;

                if (type && message)
                {
                    switch (type)
                    {
                    case "info":
                        NotificationService.info(message);
                        break;
                    case "warn":
                        NotificationService.warn(message);
                        break;
                    case "error":
                        NotificationService.error(message);
                        break;
                    case "success":
                        NotificationService.success(message);
                        break;
                    default:
                        NotificationService.log(message);
                    }
                }
            }
        }
    }
});
