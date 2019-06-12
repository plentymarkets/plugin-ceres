const ApiService          = require("services/ApiService");
const NotificationService = require("services/NotificationService");
const ModalService        = require("services/ModalService");
const AutoFocusService    = require("services/AutoFocusService");

import ValidationService from "services/ValidationService";
import TranslationService from "services/TranslationService";

Vue.component("login", {

    delimiters: ["${", "}"],

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
            isDisabled: false
        };
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.loginFields = $(".login-container").find(".input-unit");

            this.removeLoginModal();

            AutoFocusService.triggerAutoFocus();
        });
    },

    watch:
    {
        password(val, oldVal)
        {
            this.resetError();
        },

        username(val, oldVal)
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
            ValidationService.validate($("#login-form-" + this._uid))
                .done(() =>
                {
                    this.sendLogin();
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        removeLoginModal()
        {
            if (!this.modalElement)
            {
                const loginModal = document.getElementById("login");

                loginModal.parentNode.removeChild(loginModal);
            }
        },

        /**
         * Send the login data
         */
        sendLogin()
        {
            this.isDisabled = true;

            ApiService.post("/rest/io/customer/login", { email: this.username, password: this.password }, { supressNotifications: true })
                .done(response =>
                {
                    ApiService.setToken(response);

                    NotificationService.success(
                        TranslationService.translate("Ceres::Template.loginSuccessful")
                    ).closeAfter(10000);

                    if (this.backlink !== null && this.backlink)
                    {
                        location.assign(decodeURIComponent(this.backlink));
                    }
                    else if (this.hasToForward)
                    {
                        location.assign(location.origin);
                    }
                    else
                    {
                        location.reload();
                    }
                })
                .fail(response =>
                {
                    this.isDisabled = false;

                    switch (response.error.code)
                    {
                    case 401:
                        this.loginFields.addClass("has-login-error");

                        var translationKey = "Ceres::Template.loginFailed";

                        if (response.error.message.length > 0 && response.error.message === "user is blocked")
                        {
                            translationKey = "Ceres::Template.loginBlocked";
                        }
                        NotificationService.error(
                            TranslationService.translate(translationKey)
                        ).closeAfter(10000);
                        break;
                    default:
                        return;
                    }
                });
        },

        showResetPwdView()
        {
            this.resetError();

            if (this.modalElement)
            {
                ModalService
                    .findModal(document.getElementById(this.modalElement))
                    .hide()
                    .then(() =>
                    {
                        ModalService.findModal(document.getElementById("resetPwd")).show();
                    });
            }
            else
            {
                ModalService.findModal(document.getElementById("resetPwd")).show();
            }

        },

        resetError()
        {
            this.loginFields.removeClass("has-login-error");
            ValidationService.unmarkAllFields($("#login-form-" + this._uid));
        }
    }
});
