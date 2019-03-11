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
        },
        appearance:
        {
            type: String,
            default: "primary"
        }
    },

    data()
    {
        return {
            oldPassword         : "",
            newPassword         : "",
            confirmPassword     : "",
            accountSettingsClass: "",
            accountSettingsModal: {}
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    /**
     * Initialise the account settings modal
     */
    mounted()
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
        matchPassword()
        {
            return this.confirmPassword.length <= 0 || this.newPassword === this.confirmPassword;
        },

        isValid()
        {
            return this.oldPassword.length > 0 && this.newPassword.length > 0 && (this.newPassword === this.confirmPassword);
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
            if (this.isValid)
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
         * Clear the password fields in the modal
         */
        clearFields: function()
        {
            this.oldPassword = "";
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
