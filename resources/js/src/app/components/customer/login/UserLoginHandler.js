const ApiService = require("services/ApiService");

import ValidationService from "services/ValidationService";

Vue.component("user-login-handler", {

    props: [
        "userData",
        "template"
    ],

    computed: Vuex.mapGetters([
        "username",
        "isLoggedIn"
    ]),

    created()
    {
        this.$options.template = this.template;
        this.$store.commit("setUserData", this.userData);
    },

    /**
     * Add the global event listener for login and logout
     */
    ready()
    {
        this.addEventListeners();
    },

    methods: {
        /**
         * Adds login/logout event listeners
         */
        addEventListeners()
        {
            ApiService.listen("AfterAccountAuthentication", userData =>
            {
                this.$store.commit("setUserData", userData);
            });

            ApiService.listen("AfterAccountContactLogout", () =>
            {
                this.$store.commit("setUserData", null);
            });
        },

        unmarkInputFields()
        {
            ValidationService.unmarkAllFields($("#login"));
            ValidationService.unmarkAllFields($("#registration"));
        }
    }
});
