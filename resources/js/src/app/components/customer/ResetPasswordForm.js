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
            passwordSecond: ""
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods: {

        saveNewPassword()
        {
            if (this.passwordFirst !== "" && (this.passwordFirst === this.passwordSecond))
            {
                ApiService.post("/rest/io/customer/password", {password: this.passwordFirst, contactId: this.contactId, hash: this.hash})
                    .done(() =>
                    {

                        this.passwordFirst = "";
                        this.passwordSecond = "";
                        this.contactId = 0;
                        this.hash = "";

                        NotificationService.success(Translations.Template.accChangePasswordSuccessful).closeAfter(3000);
                    })
                    .fail(() =>
                    {
                        NotificationService.error(Translations.Template.accChangePasswordFailed).closeAfter(5000);
                    });
            }
        }
    }

});
