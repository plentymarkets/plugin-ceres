<template>
    <div class="notification-wrapper">
        <div v-for="notification in filteredNotifications"
            :key="notification.id"
            :class="'alert alert-dismissible fade in show alert-' + notification.context"
            role="alert"
        >
            <button type="button" class="close" :aria-label="$translate('Ceres::Template.closeIcon')" @click="notification.close()">
                <span aria-hidden="true">&times;</span>
            </button>

            <strong v-if="showErrorCode">{{ notification.code }}</strong>

            <div v-html="notification.message"></div>

            <p class="small" v-for="(trace, index) in notification.stackTrace" :key="index">
                {{ trace.message }}
            </p>
        </div>
    </div>
</template>

<script>
import NotificationService from "../../services/NotificationService";
import { isNullOrUndefined } from "../../helper/utils";
import Vue from "vue";

export default {

    props: {
        initialNotifications: Object
    },

    data()
    {
        return {
            notifications: []
        };
    },

    computed: {
        showErrorCode()
        {
            const logData = this.$ceres.config.log.data;

            return logData.includes("show_error_code") || logData.includes("all");
        },

        filteredNotifications()
        {
            return this.notifications.filter(notification => !!notification.message);
        }
    },

    mounted()
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
        dismiss(notification)
        {
            NotificationService.getNotifications().remove(notification);
        },

        /**
         * show initial notifications from server
         */
        showInitialNotifications()
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
}
</script>
