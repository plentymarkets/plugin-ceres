import ValidationService from "services/ValidationService";

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
            pwdFields: [],
            isDisabled: false
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    ready()
    {
        this.pwdFields = $("#reset-password-form-" + this._uid).find(".input-unit");
    },

    watch:
    {
        passwordFirst(val, oldVal)
        {
            this.resetError();
        },

        passwordSecond(val, oldVal)
        {
            this.resetError();
        }
    },

    methods: {

        validatePassword()
        {

            ValidationService.validate($("#reset-password-form-" + this._uid))
                .done(() =>
                {
                    if (this.checkPasswordEquals())
                    {
                        this.saveNewPassword();
                    }
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        resetError()
        {
            ValidationService.unmarkAllFields($("#reset-password-form-" + this._uid));
            this.pwdFields.removeClass("check-pwds-error");
            $(".error-save-pwd-msg").hide();
        },

        checkPasswordEquals()
        {
            if (this.passwordFirst !== this.passwordSecond)
            {
                this.pwdFields.addClass("check-pwds-error");
                $(".error-save-pwd-msg").show();

                return false;
            }

            return true;
        },

        saveNewPassword()
        {
            this.isDisabled = true;

            ApiService.post("/rest/io/customer/password", {password: this.passwordFirst, password2: this.passwordSecond, contactId: this.contactId, hash: this.hash})
                .done(() =>
                {
                    this.resetFields();

                    this.isDisabled = false;

                    window.location.assign(window.location.origin);

                    NotificationService.success(Translations.Template.accChangePasswordSuccessful).closeAfter(3000);

                })
                .fail(() =>
                {
                    this.isDisabled = false;

                    NotificationService.error(Translations.Template.accChangePasswordFailed).closeAfter(5000);
                });
        },

        resetFields()
        {
            this.passwordFirst = "";
            this.passwordSecond = "";
            this.contactId = 0;
            this.hash = "";
        }
    }

});
