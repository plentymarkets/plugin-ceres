const ApiService = require("services/ApiService");
const ResourceService = require("services/ResourceService");

import ValidationService from "services/ValidationService";

Vue.component("user-login-handler", {

    props: [
        "userData",
        "template"
    ],

    data()
    {
        return {
            username: "",
            isLoggedIn: {}
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    /**
     * Add the global event listener for login and logout
     */
    ready()
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
        setUsername(userData)
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
        addEventListeners()
        {
            ApiService.listen("AfterAccountAuthentication", userData =>
            {
                this.setUsername(userData.accountContact);
                ResourceService.getResource("user").set({isLoggedIn: true});
            });

            ApiService.listen("AfterAccountContactLogout", () =>
            {
                this.username = "";
                ResourceService.getResource("user").set({isLoggedIn: false});
            });
        },

        unmarkInputFields()
        {
            ValidationService.unmarkAllFields($("#login"));
            ValidationService.unmarkAllFields($("#registration"));
        }
    }
});
