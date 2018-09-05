const ApiService = require("services/ApiService");
const NotificationService = require("services/NotificationService");

import ValidationService from "services/ValidationService";
import TranslationService from "services/TranslationService";

Vue.component("contact-form", {

    props: [
        "template"
    ],

    data()
    {
        return {
            name                  : "",
            userMail              : "",
            subject               : "",
            message               : "",
            orderId               : "",
            cc                    : false,
            waiting               : false,
            privacyPolicyAccepted : false,
            privacyPolicyShowError: false,
            enableConfirmingPrivacyPolicy: App.config.contact.enableConfirmingPrivacyPolicy
        };
    },

    created()
    {
        this.$options.template = this.template;

        window.sendMail = this.sendMail;
    },

    methods:
    {
        validate(useCapture)
        {
            ValidationService.validate($("#contact-form"))
                .done(() =>
                {
                    if (!this.enableConfirmingPrivacyPolicy || this.privacyPolicyAccepted)
                    {
                        if (useCapture)
                        {
                            grecaptcha.execute();
                        }
                        else
                        {
                            this.sendMail();
                        }
                    }
                    else
                    {
                        this.privacyPolicyShowError = true;

                        NotificationService.error(
                            TranslationService.translate("Ceres::Template.contactAcceptFormPrivacyPolicy")
                        );
                    }
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");

                    if (this.enableConfirmingPrivacyPolicy && !this.privacyPolicyAccepted)
                    {
                        this.privacyPolicyShowError = true;

                        NotificationService.error(
                            TranslationService.translate("Ceres::Template.contactAcceptFormPrivacyPolicy")
                        );
                    }

                    for (const invalidField of invalidFields)
                    {
                        NotificationService.error(
                            TranslationService.translate("Ceres::Template." + this._mapInvalidField(invalidField.dataset.model))
                        );
                    }

                });
        },

        sendMail()
        {
            this.waiting = true;

            const mailObj =
                {
                    subject : this.subject,
                    name    : this.name,
                    message : this.message,
                    orderId : this.orderId,
                    userMail: this.userMail,
                    cc      : this.cc
                };

            ApiService.post("/rest/io/customer/contact/mail", {contactData: mailObj, template: "Ceres::Customer.Components.Contact.ContactMail"}, {supressNotifications: true})
                .done(response =>
                {
                    this.waiting = false;
                    this.clearFields();
                    NotificationService.success(
                        TranslationService.translate("Ceres::Template.contactSendSuccess")
                    );
                })
                .fail(response =>
                {
                    this.waiting = false;

                    if (response.validation_errors)
                    {
                        this._handleValidationErrors(response.validation_errors);
                    }
                    else
                    {
                        NotificationService.error(
                            TranslationService.translate("Ceres::Template.contactSendFail")
                        );
                    }
                });
        },

        clearFields()
        {
            this.name = "";
            this.userMail = "";
            this.subject = "";
            this.message = "";
            this.orderId = "";
            this.cc = false;
            this.privacyPolicyAccepted = false;
        },

        _handleValidationErrors(validationErrors)
        {
            ValidationService.markFailedValidationFields($("#contact-form"), validationErrors);

            let errorMessage = "";

            for (const value of Object.values(validationErrors))
            {
                errorMessage += value + "<br>";
            }

            NotificationService.error(errorMessage);
        },

        _mapInvalidField(invalidFieldDatasetModel)
        {
            switch (invalidFieldDatasetModel)
            {
            case "userMail": return "contactEnterConfirmEmail";
            case "subject": return "contactEditSubject";
            case "message": return "contactEditMessage";
            default: return "contactCheckEntries";
            }
        },

        privacyPolicyValueChanged(value)
        {
            this.privacyPolicyAccepted = value;

            if (value)
            {
                this.privacyPolicyShowError = false;
            }
        }
    }
});
