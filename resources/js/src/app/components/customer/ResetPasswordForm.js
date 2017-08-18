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
                        this.resetFields();

                        NotificationService.success(Translations.Template.accChangePasswordSuccessful).closeAfter(3000);

                        window.location.assign(window.location.origin);

                    })
                    .fail(() =>
                    {
                        NotificationService.error(Translations.Template.accChangePasswordFailed).closeAfter(5000);
                    });
            }
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
