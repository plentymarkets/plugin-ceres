import ValidationService from "services/ValidationService";
import {navigateTo}from "services/UrlService";

var ApiService = require("services/ApiService");

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

    created: function()
    {
        this.$options.template = this.template;
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

            ApiService.post("/rest/io/guest", {email: this.email})
                .done(function()
                {
                    if (this.backlink !== null && this.backlink)
                    {
                        navigateTo(this.backlink);
                    }
                    else
                    {
                        this.isDisabled = false;
                    }

                }.bind(this));
        }
    }
});
