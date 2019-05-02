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
            isLoading           : false,
            oldPassword         : "",
            newPassword         : "",
            confirmPassword     : "",
            newMail             : "",
            newMail2            : "",
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
            return this.newMail2.length <= 0 || this.newMail === this.newMail2;
        },
        matchPassword()
        {
            return this.confirmPassword.length <= 0 || this.newPassword === this.confirmPassword;
        },

        isValidEmail()
        {
            return this.newMail.length > 0 && (this.newMail === this.newMail2) && this.newMail !== this.userData.email;
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
                this.isLoading = true;
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
                    })
                    .always(() =>
                    {
                        this.isLoading = false;
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
                this.isLoading = true;
                APIService.post("/rest/io/customer/mail", { newMail: this.newMail, newMail2: this.newMail2 })
                    .done(response =>
                    {
                        this.clearFieldsAndClose();
                        NotificationService.success(
                            TranslationService.translate("Ceres::Template.myAccountChangeEmailConfirmationSent")
                        ).closeAfter(3000);

                    }).fail((response, status) =>
                    {
                        let message = TranslationService.translate("Ceres::Template.myAccountChangeEmailFailed");

                        if (status === 400)
                        {
                            message = TranslationService.translate("Ceres::Template.regError");
                        }

                        NotificationService.error(message).closeAfter(5000);
                    })
                    .always(() =>
                    {
                        this.isLoading = false;
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
            this.newMail = "";
            this.newMail2 = "";
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
