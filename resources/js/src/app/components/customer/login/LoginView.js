Vue.component("login-view", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            isGuestMode: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    }
});
