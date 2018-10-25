import TranslationService from "services/TranslationService";
import ValidationService from "services/ValidationService";
const ApiService          = require("services/ApiService");
const NotificationService = require("services/NotificationService");

Vue.component("newsletter-input", {
    props: {
        template:
        {
            type: String,
            default: "#vue-newsletter-input"
        },
        title:
        {
            type: String,
            default: ""
        },
        subTitle:
        {
            type: String,
            default: ""
        },
        showNameInputs:
        {
            type: Boolean,
            default: false
        },
        showPrivacyPolicyCheckbox:
        {
            type: Boolean,
            default: true
        },
        appearance:
        {
            type: String,
            default: "primary"
        },
        emailFolder:
        {
            type: Number,
            default: 0
        }
    },

    data()
    {
        return {
            firstName: "",
            lastName: "",
            email: "",
            isDisabled: false,
            privacyPolicyValue: false
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods: {
        validateData()
        {
            this.isDisabled = true;

            ValidationService.validate($("#newsletter-input-form_" + this._uid))
                .done(() =>
                {
                    this.save();
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");

                    this.isDisabled = false;
                });
        },
        save()
        {
            ApiService.post("/rest/io/customer/newsletter", {email: this.email, firstName: this.firstName, lastName: this.lastName, emailFolder: this.emailFolder})
                .done(() =>
                {
                    NotificationService.success(
                        TranslationService.translate("Ceres::Template.newsletterSuccessMessage")
                    ).closeAfter(3000);
                    this.resetInputs();
                })
                .fail(() =>
                {
                    NotificationService.error(
                        TranslationService.translate("Ceres::Template.newsletterErrorMessage")
                    ).closeAfter(5000);
                })
                .always(() =>
                {
                    this.isDisabled = false;
                });
        },
        resetInputs()
        {
            this.firstName = "";
            this.lastName = "";
            this.email = "";
            this.privacyPolicyValue = false;
        }
    }
});
