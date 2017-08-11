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
            cc      : false,
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
            this.onSendIcon();

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
                    this.disabledSend = false;
                    this.onSendIcon();
                    this.clearFields();
                    NotificationService.success(Translations.Template.contactSendSuccess);
                })
                .fail(response =>
                {
                    this.disabledSend = false;
                    this.onSendIcon();

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

        clearFields()
        {
            this.name = "";
            this.userMail = "";
            this.subject = "";
            this.message = "";
            this.orderId = "";
            this.cc = false;
        },

        onSendIcon()
        {
            const sendIcon = $(".send-btn i");

            if (this.disabledSend)
            {
                sendIcon.removeClass("fa-paper-plane-o").addClass("fa-spinner fa-spin");
            }
            else
            {
                sendIcon.removeClass("fa-spinner fa-spin").addClass("fa-paper-plane-o");
            }
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
