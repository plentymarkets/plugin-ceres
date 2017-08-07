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
                    userMail: this.userMail
                };

            ApiService.post("/rest/io/customer/contact/mail", {contactData: mailObj, template: "Ceres::Customer.Components.Contact.ContactMail"})
                .done(response =>
                {
                    this.disabledSend = false;
                    NotificationService.success(Translations.Template.contactSendSuccess);
                })
                .fail(() =>
                {
                    this.disabledSend = false;
                    NotificationService.error(Translations.Template.contactSendFail);
                });
        }
    }
});
