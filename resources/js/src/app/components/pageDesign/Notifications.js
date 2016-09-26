var NotificationService = require('services/NotificationService');
var WaitScreenService   = require('services/WaitScreenService');

Vue.component('notifications', {

    template: '#vue-notifications',

    data    : function()
    {
        return {
            notifications: NotificationService.getNotifications().all()
        };
    },

    methods : {
        dismiss: function(notification)
        {
            NotificationService.getNotifications().remove(notification);
        },

        test   : function()
        {
            NotificationService.error('Test').closeAfter(3000);
            WaitScreenService.showWaitScreen();
        }
    }
});
