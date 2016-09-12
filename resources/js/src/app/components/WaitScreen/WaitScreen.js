var WaitScreenService = require('services/WaitScreenService');

Vue.component('wait-screen', {

    template: '#vue-wait-screen',

    data    : function()
    {
        return {
            overlay: WaitScreenService.getOverlay()
        };
    },

    computed: {
        visible: function()
        {
            return this.overlay.count > 0;
        }
    }
});
