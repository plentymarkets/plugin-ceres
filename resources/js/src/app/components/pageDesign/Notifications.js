import ErrorMap from "notifications/ErrorMap";
import WarningMap from "notifications/WarningMap";
import SuccessMap from "notifications/SuccessMap";
import InfoMap from "notifications/InfoMap";
import TranslationService from "services/TranslationService";

var NotificationService = require("services/NotificationService");

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

    created: function()
    {
        this.$options.template = this.template;
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
            for (var key in this.initialNotifications)
            {
                // set default type top 'log'
                var type = this.initialNotifications[key].type || "log";
                var message = this.initialNotifications[key].message;
                var messageCode = this.initialNotifications[key].code;

                if (messageCode > 0)
                {
                    switch (type)
                    {
                    case "error":
                        message = TranslationService.translate(
                            "Ceres::Template." + ErrorMap.get(messageCode.toString())
                        );
                        break;
                    case "warn":
                        message = TranslationService.translate(
                            "Ceres::Template." + WarningMap.get(messageCode.toString())
                        );
                        break;
                    case "success":
                        message = TranslationService.translate(
                            "Ceres::Template." + SuccessMap.get(messageCode.toString())
                        );
                        break;
                    case "info":
                        message = TranslationService.translate(
                            "Ceres::Template." + InfoMap.get(messageCode.toString())
                        );
                        break;
                    default:
                        message = messageCode.toString();
                        break;
                    }
                }

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
