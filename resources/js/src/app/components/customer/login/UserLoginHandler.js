var ApiService = require("services/ApiService");
var ResourceService = require("services/ResourceService");

Vue.component("user-login-handler", {

    props: [
        "userData",
        "template"
    ],

    data: function()
    {
        return {
            username: "",
            isLoggedIn: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    /**
     * Add the global event listener for login and logout
     */
    ready: function()
    {
        ResourceService.bind("user", this, "isLoggedIn");

        this.setUsername(this.userData);
        this.addEventListeners();
    },

    methods: {
        /**
         * Set the current user logged in
         * @param userData
         */
        setUsername: function(userData)
        {
            if (userData)
            {
                if (userData.firstName.length > 0 && userData.lastName.length > 0)
                {
                    this.username = userData.firstName + " " + userData.lastName;
                }
                else
                {
                    this.username = userData.options[0].value;
                }
            }
        },

        /**
         * Adds login/logout event listeners
         */
        addEventListeners: function()
        {
            var self = this;

            ApiService.listen("AfterAccountAuthentication",
                function(userData)
                {
                    self.setUsername(userData.accountContact);
                    ResourceService.getResource("user").set({isLoggedIn: true});
                });

            ApiService.listen("AfterAccountContactLogout",
                function()
                {
                    self.username = "";
                    ResourceService.getResource("user").set({isLoggedIn: false});
                });
        }
    }
});
