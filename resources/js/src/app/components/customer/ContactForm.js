var ApiService = require("services/ApiService");

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
            message : ""
        };
    },

    created()
    {
        this.$options.template = this.template;

        window.sendMail = this.sendMail;
    },

    methods:
    {
        validate()
        {
            ValidationService.validate($("#contact-form"))
                .done(() =>
                {
                    grecaptcha.execute();
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        sendMail()
        {
            console.log("CAPTCHA WORK");

            const mailObj =
                {
                    subject : this.subject,
                    name    : this.name,
                    message : this.message,
                    userMail: this.userMail
                };

            ApiService.post("/rest/io/customer/contact/mail", {contactData: mailObj, template: "Ceres::Customer.Components.Contact.ContactMail"})
                .done(function(response)
                {
                    // success message

                })
                .fail(function()
                {
                    // error message
                });
        }
    }
});
