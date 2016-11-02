var ApiService = require("services/ApiService");

Vue.component("user-login-handler", {

    template: "#vue-user-login-handler",

    /**
     * Add the global event listener for login and logout
     */
    ready: function()
    {
        var self = this;

        ApiService.listen("AfterAccountAuthentication",
            function(userData)
            {
                self.setUserLoggedIn(userData);
            });

        ApiService.listen("AfterAccountContactLogout",
            function()
            {
                self.setUserLoggedOut();
            });
    },

    methods: {
        /**
         * Set the current user logged in
         * @param userData
         */
        setUserLoggedIn: function(userData)
        {
            if (userData.accountContact.firstName.length > 0 && userData.accountContact.lastName.length > 0)
            {
                this.$el.innerHTML = this.getUserHTML(userData.accountContact.firstName + " " + userData.accountContact.lastName);
            }
            else
            {
                this.$el.innerHTML = this.getUserHTML(userData.accountContact.options[0].value);
            }

            this.$compile(this.$el);

            // Remove when data reload after login in checkout is implemented
            if (location.pathname === "/checkout")
            {
                location.reload();
            }
        },

        /**
         * Set the current user logged out
         */
        setUserLoggedOut: function()
        {
            this.$el.innerHTML = "<a data-toggle=\"modal\" href=\"#login\">" +
                                    "<i class=\"fa fa-user\" aria-hidden=\"true\"></i>" +
                                    "<span class=\"hidden-xs-down\">" + Translations.Callisto.accLogin + "</span>" +
                                 "</a>" +
                                 "<span class=\"pipe\"></span>" +
                                 "<a data-toggle=\"modal\" href=\"#registration\">" +
                                    "<i class=\"fa fa-user-plus\" aria-hidden=\"true\"></i>" +
                                    "<span class=\"hidden-xs-down\">" + Translations.Callisto.accRegister + "</span>" +
                                 "</a>";
        },

        /**
         * Build the new user HTML for the head dynamically (no page reload required)
         * @param username
         * @returns {string}
         */
        getUserHTML: function(username)
        {
            return "<a href=\"#\" class=\"dropdown-toggle\" id=\"accountMenuList\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">" +
                Translations.Callisto.generalHello + " " + username +
                "</a>" +
                "<div class=\"country-settings account-menu dropdown-menu dropdown-menu-right small\">" +
                "<div class=\"list-group\" aria-labelledby=\"accountMenuList\">" +
                "<a href=\"/my-account\" class=\"list-group-item small\"><i class=\"fa fa-user\"></i> " + Translations.Callisto.accMyAccount + "</a>" +
                "<a href=\"#\" class=\"list-group-item small\" v-logout><i class=\"fa fa-sign-out\"></i> " + Translations.Callisto.accLogout + "</a>" +
                "</div>" +
                "</div>";
        }
    }
});
