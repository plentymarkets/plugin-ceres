const ApiService          = require("services/ApiService");
const NotificationService = require("services/NotificationService");
const ModalService        = require("services/ModalService");

import ValidationService from "services/ValidationService";
import TranslationService from "services/TranslationService";

Vue.component("forgot-password-modal", {

    delimiters: ["${", "}"],

    props: [
        "template"
    ],

    data()
    {
        return {
            password: "",
            username: "",
            isDisabled: false
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            $("#resetPwd").on("hidden.bs.modal", () =>
			{
                this.username = "";
            });
        });
    },

    watch:
    {
        username(val, oldVal)
        {
            this.resetError();
        }
    },

    methods:
    {
        validateResetPwd()
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
        },

        /**
         *  Reset password
         */
        sendResetPwd()
        {
            this.isDisabled = true;

            ApiService.post("/rest/io/customer/password_reset", {email: this.username, template: "Ceres::Customer.ResetPasswordMail", subject: "Ceres::Template.resetPwMailSubject"})
                .done(() =>
                {
                    ModalService.findModal(document.getElementById("resetPwd")).hide();
                    this.isDisabled = false;

                    NotificationService.success(
                        TranslationService.translate("Ceres::Template.loginSendEmailOk")
                    ).closeAfter(5000);

                })
                .fail(() =>
                {
                    this.isDisabled = false;

                    NotificationService.error(
                        TranslationService.translate("Ceres::Template.loginResetPwDErrorOnSendEmail")
                    ).closeAfter(5000);
                });
        },

        cancelResetPwd()
        {
            this.resetError();

            ModalService.findModal(document.getElementById("resetPwd")).hide();
            ModalService.findModal(document.getElementById("login")).show();
        },

        resetError()
        {
            ValidationService.unmarkAllFields($("#reset-pwd-form-" + this._uid));
        }
    }
});
