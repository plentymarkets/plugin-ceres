var NotificationService = require("services/NotificationService");

Vue.component("notifications", {

    template: "#vue-notifications",

    data: function()
    {
        return {
            notifications: NotificationService.getNotifications().all()
        };
    },

    methods : {
        /**
         * dissmiss the notification
         * @param notification
         */
        dismiss: function(notification)
        {
            NotificationService.getNotifications().remove(notification);
        }
    }
});
