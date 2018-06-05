import ExceptionMap from "exceptions/ExceptionMap";
import TranslationService from "services/TranslationService";
import exceptionMap from "../../exceptions/ExceptionMap";
import {isNullOrUndefined}from "../../helper/utils";

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
            for (const type in this.initialNotifications)
            {
                const notification = this.initialNotifications[type];

                if (isNullOrUndefined(notification))
                {
                    continue;
                }

                if (notification.code > 0 && exceptionMap.has(notification.code))
                {
                    notification.message = TranslationService.translate(
                        "Ceres::Template." + ExceptionMap.get(notification.code.toString())
                    );
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
