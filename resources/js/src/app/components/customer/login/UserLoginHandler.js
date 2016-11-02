var ApiService = require("services/ApiService");

Vue.component("user-login-handler", {

    template: "#vue-user-login-handler",

    props: [
        "username"
    ],

    /**
     * Add the global event listener for login and logout
     */
    ready: function()
    {
        var self = this;

        ApiService.listen("AfterAccountAuthentication",
            function(userData)
            {
                self.setUsername(userData);
            });

        ApiService.listen("AfterAccountContactLogout",
            function()
            {
                self.username = "";
            });
    },

    methods: {
        /**
         * Set the current user logged in
         * @param userData
         */
        setUsername: function(userData)
        {
            if (userData.accountContact.firstName.length > 0 && userData.accountContact.lastName.length > 0)
            {
                this.username = userData.accountContact.firstName + " " + userData.accountContact.lastName;
            }
            else
            {
                this.username = userData.accountContact.options[0].value;
            }
        }
    }
});
