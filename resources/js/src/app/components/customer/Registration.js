const ApiService          = require("services/ApiService");
const NotificationService = require("services/NotificationService");
const ModalService        = require("services/ModalService");

import ValidationService from "services/ValidationService";
import TranslationService from "services/TranslationService";

Vue.component("registration", {

    delimiters: ["${", "}"],

    props: {
        modalElement: String,
        guestMode: {type: Boolean, default: false},
        isSimpleRegistration: {type: Boolean, default: false},
        template: String,
        backlink: String
    },

    data()
    {
        return {
            password      : "",
            passwordRepeat: "",
            username      : "",
            billingAddress: {
                countryId: null,
                stateId: null,
                addressSalutation: 0
            },
            isDisabled: false
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods: {
        /**
         * Validate the registration form
         */
        validateRegistration()
        {
            ValidationService.validate($("#registration" + this._uid))
                .done(() =>
                {
                    this.sendRegistration();
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        /**
         * Send the registration
         */
        sendRegistration()
        {
            const userObject = this.getUserObject();

            this.isDisabled = true;

            ApiService.post("/rest/io/customer", userObject)
                .done(response =>
                {
                    ApiService.setToken(response);

                    if (!response.code)
                    {
                        NotificationService.success(
                            TranslationService.translate("Ceres::Template.accRegistrationSuccessful")
                        ).closeAfter(3000);

                        if (document.getElementById(this.modalElement) !== null)
                        {
                            ModalService.findModal(document.getElementById(this.modalElement)).hide();
                        }

                        if (this.backlink !== null && this.backlink)
                        {
                            window.location.assign(this.backlink);
                        }
                        else
                        {
                            location.reload();
                        }
                    }
                    else
                    {
                        NotificationService.error(
                            TranslationService.translate("Ceres::Template.accRegistrationError")
                        ).closeAfter(3000);
                    }

                    this.isDisabled = false;
                })
                .fail(() =>
                {
                    this.isDisabled = false;
                });
        },

        setAddressDataField({field, value})
        {
            this.billingAddress[field] = value;
        },

        /**
         * Handle the user object which is send to the server
         * @returns {{contact: {referrerId: number, typeId: number, options: {typeId: {typeId: number, subTypeId: number, value: *, priority: number}}}}|{contact: {referrerId: number, typeId: number, password: *, options: {typeId: {typeId: number, subTypeId: number, value: *, priority: number}}}}}
         */
        getUserObject()
        {
            const userObject =
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
