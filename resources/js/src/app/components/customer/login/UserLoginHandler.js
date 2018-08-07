import {isDefined}from "../../../helper/utils";
const ApiService = require("services/ApiService");

import ValidationService from "services/ValidationService";

Vue.component("user-login-handler", {

    delimiters: ["${", "}"],

    props: {
        template: {
            type: String,
            default: "#vue-user-login-handler"
        },
        showRegistration: Boolean
    },

    computed: Vuex.mapGetters([
        "username",
        "isLoggedIn"
    ]),

    created()
    {
        this.$options.template = this.template;

        ApiService.get("/rest/io/customer", {}, {keepOriginalResponse: true})
            .done(response =>
            {
                if (isDefined(response.data))
                {
                    this.$store.commit("setUserData", response.data);
                }
            });
    },

    /**
     * Add the global event listener for login and logout
     */
    mounted()
    {
        this.$nextTick(() =>
        {
            this.addEventListeners();
        });
    },

    methods: {
        /**
         * Adds login/logout event listeners
         */
        addEventListeners()
        {
            ApiService.listen("AfterAccountAuthentication", userData =>
            {
                this.$store.commit("setUserData", userData.accountContact);
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
