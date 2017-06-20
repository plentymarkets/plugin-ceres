var ApiService          = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ModalService        = require("services/ModalService");

import ValidationService from "services/ValidationService";

Vue.component("registration", {

    props: {
        modalElement: String,
        guestMode: {type: Boolean, default: false},
        isSimpleRegistration: {type: Boolean, default: false},
        template: String,
        backlink: String
    },

    data: function()
    {
        return {
            password      : "",
            passwordRepeat: "",
            username      : "",
            billingAddress: {},
            isDisabled: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    methods: {
        /**
         * Validate the registration form
         */
        validateRegistration: function()
        {
            var self = this;

            ValidationService.validate($("#registration" + this._uid))
                .done(function()
                {
                    self.sendRegistration();
                })
                .fail(function(invalidFields)
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        /**
         * Send the registration
         */
        sendRegistration: function()
        {
            var userObject = this.getUserObject();
            var component  = this;

            this.isDisabled = true;

            ApiService.post("/rest/io/customer", userObject)
                .done(function(response)
                {
                    ApiService.setToken(response);

                    if (typeof response === "object")
                    {
                        NotificationService.success(Translations.Template.accRegistrationSuccessful).closeAfter(3000);

                        if (document.getElementById(component.modalElement) !== null)
                        {
                            ModalService.findModal(document.getElementById(component.modalElement)).hide();
                        }
                    }
                    else
                    {
                        NotificationService.error(Translations.Template.accRegistrationError).closeAfter(3000);
                    }

                    if (component.backlink !== null && component.backlink)
                    {
                        window.location.assign(component.backlink);
                    }

                    component.isDisabled = false;
                })
                .fail(function()
                {
                    component.isDisabled = false;
                });
        },

        /**
         * Handle the user object which is send to the server
         * @returns {{contact: {referrerId: number, typeId: number, options: {typeId: {typeId: number, subTypeId: number, value: *, priority: number}}}}|{contact: {referrerId: number, typeId: number, password: *, options: {typeId: {typeId: number, subTypeId: number, value: *, priority: number}}}}}
         */
        getUserObject: function()
        {
            var userObject =
                {
                    contact: {
                        referrerId: 1,
                        typeId    : 1,
                        options   : {
                            typeId: {
                                typeId   : 2,
                                subTypeId: 4,
                                value    : this.username,
                                priority : 0
                            }
                        }
                    }
                };

            if (!this.guestMode)
            {
                userObject.contact.password = this.password;
            }

            if (!this.isSimpleRegistration)
            {
                userObject.billingAddress = this.billingAddress;
            }

            return userObject;
        }
    }
});
