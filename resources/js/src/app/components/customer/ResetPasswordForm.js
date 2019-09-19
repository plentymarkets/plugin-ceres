import ValidationService from "../../services/ValidationService";
import TranslationService from "../../services/TranslationService";
import { navigateTo } from "../../services/UrlService";
import Vue from "vue";
import { isNullOrUndefined } from "../../helper/utils";

const ApiService          = require("../../services/ApiService");
const NotificationService = require("../../services/NotificationService");

Vue.component("reset-password-form", {

    props: {
        template:
        {
            type: String,
            default: "#vue-reset-password-form"
        },
        contactId:
        {
            type: Number,
            required: true
        },
        hash:
        {
            type: String,
            required: true
        }
    },

    data()
    {
        return {
            passwordFirst: "",
            passwordSecond: "",
            isDisabled: false
        };
    },

    methods: {

        validatePassword()
        {

            ValidationService.validate(this.$refs.resetPasswordForm)
                .done(() =>
                {
                    this.saveNewPassword();
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "has-error");
                    const validation = !isNullOrUndefined(invalidFields[0]) ? invalidFields[0].dataset.validate : null;

                    if (validation === "password")
                    {
                        NotificationService.error(
                            TranslationService.translate("Ceres::Template.resetPwInvalidPassword")
                        );
                    }
                    else if (validation === "ref")
                    {
                        NotificationService.error("Ceres::Template.resetPwRepeatNewPassword");
                    }
                });
        },

        saveNewPassword()
        {
            this.isDisabled = true;

            ApiService.post("/rest/io/customer/password", { password: this.passwordFirst, password2: this.passwordSecond, contactId: this.contactId, hash: this.hash })
                .done(() =>
                {

                    navigateTo(window.location.origin);

                    NotificationService.success(
                        TranslationService.translate("Ceres::Template.resetPwChangePasswordSuccessful")
                    ).closeAfter(3000);

                })
                .fail(() =>
                {
                    this.isDisabled = false;

                    NotificationService.error(
                        TranslationService.translate("Ceres::Template.resetPwChangePasswordFailed")
                    ).closeAfter(5000);
                });
        }
    }

});
