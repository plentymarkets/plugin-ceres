var ModalService        = require("services/ModalService");
var APIService          = require("services/ApiService");
var NotificationService = require("services/NotificationService");

import TranslationService from "services/TranslationService";

Vue.component("account-settings", {

    delimiters: ["${", "}"],

    props: [
        "userData",
        "template"
    ],

    data: function()
    {
        return {
            newPassword         : "",
            confirmPassword     : "",
            accountSettingsClass: "",
            accountSettingsModal: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    /**
     * Initialise the account settings modal
     */
    mounted: function()
    {
        this.$nextTick(() =>
        {
            this.accountSettingsModal = ModalService.findModal(this.$refs.accountSettingsModal);
        });
    },

    computed: {
        /**
         * Check whether the passwords match
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
         * Open the account settings modal
         */
        showChangeAccountSettings: function()
        {
            this.accountSettingsModal.show();
        },

        /**
         * Save the new password
         */
        saveAccountSettings: function()
        {
            var self = this;

            if (this.newPassword !== "" && (this.newPassword === this.confirmPassword))
            {
                APIService.post("/rest/io/customer/password", {password: this.newPassword, password2: this.confirmPassword})
                    .done(function(response)
                    {
                        self.clearFieldsAndClose();
                        NotificationService.success(
                            TranslationService.translate("Ceres::Template.accChangePasswordSuccessful")
                        ).closeAfter(3000);
                    }).fail(function(response)
                    {
                        self.clearFieldsAndClose();
                        NotificationService.error(
                            TranslationService.translate("Ceres::Template.accChangePasswordFailed")
                        ).closeAfter(5000);
                    });
            }
        },

        /**
         * Clear the password fields in the modal
         */
        clearFields: function()
        {
            this.newPassword = "";
            this.confirmPassword = "";
        },

        /**
         * Clear the fields and close the modal
         */
        clearFieldsAndClose: function()
        {
            this.accountSettingsModal.hide();
            this.clearFields();
        }
    }

});
