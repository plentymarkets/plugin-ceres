Vue.component("login-view", {

    template: "#vue-login-view",

    data: function()
    {
        return {
            loginMode: "login"
        };
    },

    methods:
    {
        toggleLoginMode: function()
        {
            this.loginMode = this.loginMode == "login" ? "guestLogin" : "login";
        }
    }
});
