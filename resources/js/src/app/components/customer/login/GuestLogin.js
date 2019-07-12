import ValidationService from "services/ValidationService";
import { navigateTo } from "services/UrlService";

const ApiService = require("services/ApiService");

Vue.component("guest-login", {

    delimiters: ["${", "}"],

    props: [
        "template",
        "backlink"
    ],

    data: function()
    {
        return {
            email: "",
            isDisabled: false
        };
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            $("#guestLogin").on("hidden.bs.modal", () =>
            {
                this.email = "";
                this.resetError();
            });
        });
    },

    methods: {
        validate: function()
        {
            ValidationService.validate($("#guest-login-form-" + this._uid))
                .done(function()
                {
                    this.sendEMail();
                }.bind(this))
                .fail(function(invalidFields)
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        sendEMail: function()
        {
            this.isDisabled = true;

            ApiService.post("/rest/io/guest", { email: this.email })
                .done(function()
                {
                    if (this.backlink !== null && this.backlink)
                    {
                        navigateTo(decodeURIComponent(this.backlink));
                    }
                    else
                    {
                        // Go back to Homepage
                        navigateTo(window.location.origin);
                    }

                }.bind(this));
        },

        resetError()
        {
            ValidationService.unmarkAllFields($("#guest-login-form-" + this._uid));
        }
    }
});
