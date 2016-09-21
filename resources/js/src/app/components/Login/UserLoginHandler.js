var ApiService = require('services/ApiService');

Vue.component('user-login-handler', {

    template: '#vue-user-login-handler',

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
        },

        setUserLoggedOut: function()
        {
            this.$el.innerHTML = "<a data-toggle=\"modal\" href=\"#login\">Einloggen</a>" +
                "<small>oder</small>" +
                "<a data-toggle=\"modal\" href=\"#signup\">Registieren</a>";
        },

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
