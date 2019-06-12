const ApiService          = require("services/ApiService");
const NotificationService = require("services/NotificationService");
const ModalService        = require("services/ModalService");

import ValidationService from "services/ValidationService";
import TranslationService from "services/TranslationService";
import UrlService from "services/UrlService";
import { isNullOrUndefined } from "../../../helper/utils";

Vue.component("forgot-password-modal", {

    delimiters: ["${", "}"],

    props:
    {
        template:
        {
            type: String,
            default: "#vue-forgot-password-modal"
        }
    },

    data()
    {
        return {
            password: "",
            username: "",
            isDisabled: false
        };
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            $(this.$refs.pwdModal).on("hidden.bs.modal", () =>
            {
                this.username = "";
            });

            const urlParams = UrlService.getUrlParams(document.location.search);

            if (!isNullOrUndefined(urlParams.show) && urlParams.show === "forgotPassword")
            {
                ModalService.findModal(this.$refs.pwdModal).show();

                this.username = !isNullOrUndefined(urlParams.email) ? urlParams.email : "";
            }
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
            ValidationService
                .validate(this.$refs.pwdModal)
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

            ApiService.post("/rest/io/customer/password_reset", { email: this.username })
                .done(() =>
                {
                    ModalService.findModal(this.$refs.pwdModal).hide();
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

            ModalService
                .findModal(this.$refs.pwdModal)
                .hide()
                .then(() =>
                {
                    ModalService
                        .findModal(document.getElementById("login"))
                        .show();
                });
        },

        resetError()
        {
            ValidationService.unmarkAllFields(this.$refs.pwdModal);
        }
    }
});
