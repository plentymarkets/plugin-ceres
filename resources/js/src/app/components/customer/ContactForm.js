const ApiService = require("services/ApiService");
const NotificationService = require("services/NotificationService");

import ValidationService from "services/ValidationService";

Vue.component("contact-form", {

    props: [
        "template"
    ],

    data()
    {
        return {
            name    : "",
            userMail: "",
            subject : "",
            message : "",
            orderId : "",
            disabledSend: false
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
                    if (useCapture)
                    {
                        grecaptcha.execute();
                    }
                    else
                    {
                        this.sendMail();
                    }
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        sendMail()
        {
            this.disabledSend = true;

            const mailObj =
                {
                    subject : this.subject,
                    name    : this.name,
                    message : this.message,
                    orderId : this.orderId,
                    userMail: this.userMail
                };

            ApiService.post("/rest/io/customer/contact/mail", {contactData: mailObj, template: "Ceres::Customer.Components.Contact.ContactMail"}, {supressNotifications: true})
                .done(response =>
                {
                    this.disabledSend = false;
                    NotificationService.success(Translations.Template.contactSendSuccess);
                })
                .fail(response =>
                {
                    this.disabledSend = false;

                    if (response.validation_errors)
                    {
                        this._handleValidationErrors(response.validation_errors);
                    }
                    else
                    {
                        NotificationService.error(Translations.Template.contactSendFail);
                    }
                });
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
        }
    }
});
