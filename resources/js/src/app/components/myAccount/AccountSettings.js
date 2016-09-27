var ModalService        = require('services/ModalService');
var APIService          = require('services/APIService');
var NotificationService = require('services/NotificationService');

Vue.component('account-settings', {

    template: '#vue-account-settings',

    props: [
        "userData"
    ],

    data: function()
    {
        return {
            newPassword         : '',
            confirmPassword     : '',
            accountSettingsClass: ''
        };
    },

    ready: function()
    {
        this.accountSettingsClass = "accountSettingsModal" + this._uid;
    },

    computed: {
        matchPassword: function()
        {
            if (this.confirmPassword != '')
            {
                return this.newPassword === this.confirmPassword;
            }
            return true;
        }
    },

    methods: {

        showChangeAccountSettings: function()
        {
            var accountModal = ModalService.findModal($('.' + this.accountSettingsClass));

            $(".wrapper-bottom").append($('.' + this.accountSettingsClass));

            accountModal.show();
        },

        saveAccountSettings: function()
        {
            var self = this;
            if (this.newPassword != '' && (this.newPassword === this.confirmPassword))
            {
                APIService.post('/rest/customer/password', {password: this.newPassword})
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

        clearFields: function()
        {
            this.newPassword     = '';
            this.confirmPassword = '';
        },

        clearFieldsAndClose: function()
        {
            ModalService.findModal($('.' + this.accountSettingsClass)).hide();
            this.clearFields();
        },

        getEmail: function()
        {
            return this.userData.options[0].value;
        }
    }

});
