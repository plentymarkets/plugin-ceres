var ModalService        = require("services/ModalService");
var APIService          = require("services/APIService");
var NotificationService = require("services/NotificationService");

Vue.component("account-settings", {

    template: "#vue-account-settings",

    props: [
        "userData"
    ],

    data: function()
    {
        return {
            newPassword         : "",
            confirmPassword     : "",
            accountSettingsClass: ""
        };
    },

    /**
     * initialize the account settings modal
     */
    ready: function()
    {
        this.accountSettingsClass = "accountSettingsModal" + this._uid;
    },

    computed: {
        /**
         * check if the passwords equal
         * @returns {boolean}
         */
        matchPassword: function()
        {
            if (this.confirmPassword !== "")
            {
                return this.newPassword === this.confirmPassword;
            }
            return true;
        }
    },

    methods: {

        /**
         * open the account settingsmodal
         */
        showChangeAccountSettings: function()
        {
            var accountModal = ModalService.findModal($("." + this.accountSettingsClass));

            $(".wrapper-bottom").append($("." + this.accountSettingsClass));

            accountModal.show();
        },

        /**
         * save the new password
         */
        saveAccountSettings: function()
        {
            var self = this;

            if (this.newPassword !== "" && (this.newPassword === this.confirmPassword))
            {
                APIService.post("/rest/customer/password", {password: this.newPassword})
                    .done(function(response)
                    {
                        self.clearFieldsAndClose();
                        NotificationService.success(Translations.Callisto.accChangePasswordSuccessful).closeAfter(3000);
                    }).fail(function(response)
                {
                        self.clearFieldsAndClose();
                        NotificationService.error(Translations.Callisto.accChangePasswordFailed).closeAfter(5000);
                    });
            }
        },

        /**
         * clear the password fields in the modal
         */
        clearFields: function()
        {
            this.newPassword = "";
            this.confirmPassword = "";
        },

        /**
         * clear the fields and close the modal
         */
        clearFieldsAndClose: function()
        {
            ModalService.findModal($("." + this.accountSettingsClass)).hide();
            this.clearFields();
        },

        /**
         * get the current mail of the user
         * @returns {*}
         */
        getEmail: function()
        {
            return this.userData.options[0].value;
        }
    }

});
