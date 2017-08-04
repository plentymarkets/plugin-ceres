var ApiService = require("services/ApiService");

Vue.component("contact-form", {

    props: [
        "template",
        "shopMail"
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
    },

    methods:
    {
        sendMail()
        {
            console.log("CAPTCHA WORK");

            const mailObj =
                {
                    contactData:
                    {
                        name    : this.name,
                        shopMail: this.shopMail,
                        subject : this.subject,
                        message : this.message,
                        userMail: this.userMail
                    }
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
