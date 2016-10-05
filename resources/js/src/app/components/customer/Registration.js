var ApiService          = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ModalService        = require("services/ModalService");

var ValidationService = require("services/ValidationService");

Vue.component("registration", {

    template: "#vue-registration",

    props: [
        "modalElement",
        "guestMode",
        "isSimpleRegistration"
    ],

    data: function()
    {
        return {
            password      : "",
            passwordRepeat: "",
            username      : "",
            billingAddress: {}
        };
    },

    /**
     * check if the component should be a normal registration or the guest registration
     */
    created: function()
    {
        if (this.guestMode === null || this.guestMode == "")
        {
            this.guestMode = false;
        }
        else
        {
            this.guestMode = true;
        }
    },

    methods: {
        /**
         * validate the registration form
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
         * send the registration
         */
        sendRegistration: function()
        {
            var userObject = this.getUserObject();
            var component  = this;

            ApiService.post("/rest/customer", userObject)
                .done(function(response)
                {
                    ApiService.setToken(response);

                    if (document.getElementById(component.modalElement) !== null)
                    {
                        ModalService.findModal(document.getElementById(component.modalElement)).hide();
                    }

                    NotificationService.success(Translations.Callisto.accRegistrationSuccessful).closeAfter(3000);
                });

        },

        /**
         * handle the userobject which is send to the server
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
