var NotificationService = require("services/NotificationService");
var WaitScreenService   = require("services/WaitScreenService");

Vue.component("notifications", {

    template: "#vue-notifications",

    data    : function()
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
