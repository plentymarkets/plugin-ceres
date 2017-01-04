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
                // set default type top 'log'
                var type = this.initialNotifications[key].type || "log";
                var message = this.initialNotifications[key].message;

                // type cannot be undefined
                if (message)
                {
                    if (NotificationService[type] && typeof NotificationService[type] === "function")
                    {
                        NotificationService[type](message);
                    }
                    else
                    {
                        // unkown type
                        NotificationService.log(message);
                    }
                }
            }
        }
    }
});
