import ValidationService from "services/ValidationService";
import TranslationService from "services/TranslationService";
import { navigateTo } from "services/UrlService";

const ApiService          = require("services/ApiService");
const NotificationService = require("services/NotificationService");

Vue.component("reset-password-form", {

    props: [
        "contactId",
        "hash",
        "template"
    ],

    data()
    {
        return {
            passwordFirst: "",
            passwordSecond: "",
            isDisabled: false
        };
    },

    created()
    {
        this.$options.template = this.template;
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
