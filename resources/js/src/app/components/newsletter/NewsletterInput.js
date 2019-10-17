import TranslationService from "../../services/TranslationService";
import ValidationService from "../../services/ValidationService";
import Vue from "vue";
import { ButtonSizePropertyMixin } from "../../mixins/buttonSizeProperty.mixin";

const ApiService          = require("../../services/ApiService");
const NotificationService = require("../../services/NotificationService");

Vue.component("newsletter-input", {

    mixins: [ButtonSizePropertyMixin],

    props: {
        template:
        {
            type: String,
            default: "#vue-newsletter-input"
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
            ApiService.post("/rest/io/customer/newsletter", { email: this.email, firstName: this.firstName, lastName: this.lastName, emailFolder: this.emailFolder })
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
