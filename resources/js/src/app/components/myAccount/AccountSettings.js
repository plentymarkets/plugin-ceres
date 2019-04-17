const ModalService        = require("services/ModalService");
const APIService          = require("services/ApiService");
const NotificationService = require("services/NotificationService");

import TranslationService from "services/TranslationService";

Vue.component("account-settings", {

    props: {
        template:
        {
            type: String,
            default: "#vue-account-settings"
        },
        userData:
        {
            type: Object,
            // eslint-disable-next-line
            default: () => {}
        }
    },

    data()
    {
        return {
            oldPassword         : "",
            newPassword         : "",
            confirmPassword     : "",
            oldEmail            : "",
            newEmail            : "",
            confirmEmail        : "",
            accountSettingsClass: "",
            accountEmailModal: {},
            accountPasswordModal: {}
        };
    },

    /**
     * Initialise the account settings modal
     */
    mounted()
    {
        this.$nextTick(() =>
        {
            this.accountEmailModal = ModalService.findModal(this.$refs.accountEmailModal);
            this.accountPasswordModal = ModalService.findModal(this.$refs.accountPasswordModal);
        });
    },

    computed: {
        /**
         * Check whether the data matches
         * @returns {boolean}
         */
        matchEmail()
        {
            return this.confirmEmail.length <= 0 || this.newEmail === this.confirmEmail;
        },
        matchPassword()
        {
            return this.confirmPassword.length <= 0 || this.newPassword === this.confirmPassword;
        },

        isValidEmail()
        {
            return this.oldEmail.length > 0 && this.newEmail.length > 0 && (this.newEmail === this.confirmEmail);
        },
        isValidPassword()
        {
            return this.oldPassword.length > 0 && this.newPassword.length > 0 && (this.newPassword === this.confirmPassword);
        }
    },

    methods: {

        /**
         * Open the change mail modal
         */
        showChangeAccountEmail: function()
        {
            this.accountEmailModal.show();
        },

        /**
         * Open the change password modal
         */
        showChangeAccountPassword: function()
        {
            this.accountPasswordModal.show();
        },

        /**
         * Save the new password
         */
        saveAccountPassword: function()
        {
            if (this.isValidPassword)
            {
                APIService.post("/rest/io/customer/password", { oldPassword: this.oldPassword, password: this.newPassword, password2: this.confirmPassword })
                    .done(response =>
                    {
                        this.clearFieldsAndClose();
                        NotificationService.success(
                            TranslationService.translate("Ceres::Template.myAccountChangePasswordSuccessful")
                        ).closeAfter(3000);
                    }).fail(response =>
                    {
                        NotificationService.error(
                            TranslationService.translate("Ceres::Template.myAccountChangePasswordFailed")
                        ).closeAfter(5000);
                    });
            }
        },
        /**
         * Save the new email
         */
        saveAccountEmail: function()
        {
            if (this.isValidEmail)
            {
                APIService.post("/rest/io/customer/mail", { oldMail: this.oldMail, email: this.newEmail, email2: this.confirmEmail })
                    .done(response =>
                    {
                        this.clearFieldsAndClose();
                        NotificationService.success(
                            TranslationService.translate("Ceres::Template.myAccountChangeEmailSuccessful")
                        ).closeAfter(3000);
                    }).fail(response =>
                    {
                        NotificationService.error(
                            TranslationService.translate("Ceres::Template.myAccountChangeEmailFailed")
                        ).closeAfter(5000);
                    });
            }
        },


        /**
         * Clear the password fields in the modal
         */
        clearFields: function()
        {
            this.oldPassword = "";
            this.newPassword = "";
            this.confirmPassword = "";
            this.oldEmail = "";
            this.newEmail = "";
            this.confirmEmail = "";
        },

        /**
         * Clear the fields and close the modal
         */
        clearFieldsAndClose: function()
        {
            this.accountEmailModal.hide();
            this.accountPasswordModal.hide();
            this.clearFields();
        }
    }

});
