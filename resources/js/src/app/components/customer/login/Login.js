const ApiService          = require("services/ApiService");
const NotificationService = require("services/NotificationService");
const ModalService        = require("services/ModalService");

import ValidationService from "services/ValidationService";

Vue.component("login", {

    props: [
        "modalElement",
        "backlink",
        "hasToForward",
        "template"
    ],

    data()
    {
        return {
            password: "",
            username: "",
            loginFields: [],
            isDisabled: false,
            isPwdReset: false
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    ready()
    {
        this.loginFields = $(".login-container").find(".input-unit");
    },

    watch:
    {
        password: function(val, oldVal)
            {
            this.resetError();
        },

        username: function(val, oldVal)
            {
            this.resetError();
        }
    },

    methods: {
        /**
         * Open the login modal
         */
        showLogin()
        {
            ModalService.findModal(document.getElementById(this.modalElement)).show();
        },

        validateLogin()
        {
            if (!this.isPwdReset)
            {
                ValidationService.validate($("#login-form-" + this._uid))
                    .done(() =>
                    {
                        this.sendLogin();
                    })
                    .fail(invalidFields =>
                    {
                        ValidationService.markInvalidFields(invalidFields, "error");
                    });
            }
        },

        validateResetPwd()
        {
            if (this.isPwdReset)
            {
                ValidationService.validate($("#reset-pwd-form-" + this._uid))
                    .done(() =>
                    {
                        this.sendResetPwd();
                    })
                    .fail(invalidFields =>
                    {
                        ValidationService.markInvalidFields(invalidFields, "error");
                    });
            }
        },

        /**
         * Send the login data
         */
        sendLogin()
        {
            this.isDisabled = true;

            ApiService.post("/rest/io/customer/login", {email: this.username, password: this.password}, {supressNotifications: true})
                .done(response =>
                {
                    ApiService.setToken(response);

                    if (document.getElementById(this.modalElement) !== null)
                    {
                        ModalService.findModal(document.getElementById(this.modalElement)).hide();
                    }

                    NotificationService.success(Translations.Template.accLoginSuccessful).closeAfter(10000);

                    if (this.backlink !== null && this.backlink)
                    {
                        location.assign(this.backlink);
                    }
                    else if (this.hasToForward)
                    {
                        location.assign(location.origin);
                    }
                    else
                    {
                        location.reload();
                    }

                    this.isDisabled = false;
                })
                .fail(response =>
                {
                    this.isDisabled = false;

                    switch (response.error.code)
                    {
                    case 401:
                        this.loginFields.addClass("has-login-error");
                        NotificationService.error(Translations.Template.accLoginFailed).closeAfter(10000);
                        break;
                    default:
                        return;
                    }
                });
        },

        /**
         *  Reset password
         */
        sendResetPwd()
        {
            this.isDisabled = true;

            ApiService.post("/rest/io/customer/password_reset", {email: this.username, template: "Ceres::Customer.ResetPasswordMail"})
                .done(() =>
                {
                    if (document.getElementById(this.modalElement) !== null)
                    {
                        ModalService.findModal(document.getElementById(this.modalElement)).hide();

                        this.isDisabled = false;

                        this.cancelResetPwd();
                    }
                    else
                    {
                        window.location.assign(window.location.origin);
                    }

                    NotificationService.success(Translations.Template.generalSendEmailOk).closeAfter(5000);

                })
                .fail(() =>
                {
                    this.isDisabled = false;

                    NotificationService.error(Translations.Template.accResetPwDErrorOnSendEmail).closeAfter(5000);
                });
        },

        showResetPwdView()
        {
            this.resetError();
            this.isPwdReset = true;

            if (document.getElementById(this.modalElement) !== null)
            {
                $(".login-modal .modal-title").html(Translations.Template.accForgotPassword);
            }
            else
            {
                $(".login-view-title").html(Translations.Template.accForgotPassword);
            }

            $(".login-container").slideUp("fast", function()
            {
                $(".reset-pwd-container").slideDown("fast");
            });
        },

        cancelResetPwd()
        {
            this.resetError();
            this.isPwdReset = false;

            if (document.getElementById(this.modalElement) !== null)
            {
                $(".login-modal .modal-title").text(Translations.Template.accLogin);
            }
            else
            {
                $(".login-view-title").text(Translations.Template.accLogin);
            }

            $(".reset-pwd-container").slideUp("fast", function()
            {
                $(".login-container").slideDown("fast");
            });
        },

        resetError()
        {
            this.loginFields.removeClass("has-login-error");
            ValidationService.unmarkAllFields($("#login-form-" + this._uid));
            ValidationService.unmarkAllFields($("#reset-pwd-form-" + this._uid));
        }
    }
});
