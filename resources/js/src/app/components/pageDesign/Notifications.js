import { isNullOrUndefined } from "../../helper/utils";

const NotificationService = require("services/NotificationService");

Vue.component("notifications", {

    delimiters: ["${", "}"],

    props: [
        "initialNotifications",
        "template"
    ],

    data: function()
    {
        return {
            notifications: []
        };
    },

    mounted: function()
    {
        this.$nextTick(() =>
        {
            NotificationService.listen(
                notifications =>
                {
                    Vue.set(this, "notifications", notifications);
                });

            this.showInitialNotifications();
        });
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
            for (const type in this.initialNotifications)
            {
                const notification = this.initialNotifications[type];

                if (isNullOrUndefined(notification))
                {
                    continue;
                }

                // type cannot be undefined
                if (!isNullOrUndefined(NotificationService[type]) && typeof NotificationService[type] === "function")
                {
                    NotificationService[type](notification);
                }
                else
                {
                    // unkown type
                    NotificationService.log(notification);
                }
            }
        }
    }
});
