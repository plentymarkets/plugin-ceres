var ApiService          = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ModalService        = require("services/ModalService");

import ValidationService from "services/ValidationService";

Vue.component("login", {

    props: [
        "modalElement",
        "backlink",
        "hasToForward",
        "template"
    ],

    data: function()
    {
        return {
            password: "",
            username: "",
            isDisabled: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    methods: {
        /**
         * Open the login modal
         */
        showLogin: function()
        {
            ModalService.findModal(document.getElementById(this.modalElement)).show();
        },

        validateLogin: function()
        {
            var self = this;

            ValidationService.validate($("#login-form-" + this._uid))
                .done(function()
                {
                    self.sendLogin();
                })
                .fail(function(invalidFields)
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        /**
         * Send the login data
         */
        sendLogin: function()
        {
            var self = this;

            this.isDisabled = true;

            ApiService.post("/rest/io/customer/login", {email: this.username, password: this.password}, {supressNotifications: true})
                .done(function(response)
                {
                    ApiService.setToken(response);

                    if (document.getElementById(self.modalElement) !== null)
                    {
                        ModalService.findModal(document.getElementById(self.modalElement)).hide();
                    }

                    NotificationService.success(Translations.Template.accLoginSuccessful).closeAfter(10000);

                    if (self.backlink !== null && self.backlink)
                    {
                        location.assign(self.backlink);
                    }
                    else if (self.hasToForward)
                    {
                        location.assign(location.origin);
                    }
                    else
                    {
                        location.reload();
                    }

                    self.isDisabled = false;
                })
                .fail(function(response)
                {
                    switch (response.code)
                    {
                    case 401:
                        NotificationService.error(Translations.Template.accLoginFailed).closeAfter(10000);
                        break;
                    default:
                        return;
                    }

                    self.isDisabled = false;
                });
        }
    }
});
