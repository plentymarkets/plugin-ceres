const ModalService        = require("services/ModalService");
const APIService          = require("services/ApiService");
const NotificationService = require("services/NotificationService");
const ValidationService   = require("services/ValidationService");

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
            accountEmailModal: null,
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
            if (this.$refs.accountEmailModal)
            {
                this.accountEmailModal = ModalService.findModal(this.$refs.accountEmailModal);
            }

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
        showChangeAccountEmail()
        {
            this.accountEmailModal.show();
        },

        /**
         * Open the change password modal
         */
        showChangeAccountPassword()
        {
            this.accountPasswordModal.show();
        },

        /**
         * Checks the new password to see if it meets the password requirements
         */
        validatePassword: function()
        {
            ValidationService.validate(this.$refs.passwordFormControl)
                .done(() =>
                {
                    this.saveAccountPassword();
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                    NotificationService.error(
                        TranslationService.translate("Ceres::Template.resetPwInvalidPassword")
                    ).closeAfter(5000);
                    this.$refs.passwordHint.showPopper();
                });
        },

        /**
         * Save the new password
         */
        saveAccountPassword()
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
        saveAccountEmail()
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
        clearFields()
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
        clearFieldsAndClose()
        {
            if (this.accountEmailModal)
            {
                this.accountEmailModal.hide();
            }

            this.accountPasswordModal.hide();
            this.clearFields();
        }
    }

});
