import { isNullOrUndefined } from "../../helper/utils";

const ApiService          = require("services/ApiService");
const NotificationService = require("services/NotificationService");
const ModalService        = require("services/ModalService");

import ValidationService from "services/ValidationService";
import TranslationService from "services/TranslationService";
import { navigateTo } from "services/UrlService";

Vue.component("registration", {

    delimiters: ["${", "}"],

    props: {
        modalElement: String,
        guestMode: { type: Boolean, default: false },
        isSimpleRegistration: { type: Boolean, default: false },
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
                gender: "male"
            },
            isDisabled: false,
            privacyPolicyAccepted : false,
            privacyPolicyShowError: false,
            enableConfirmingPrivacyPolicy: App.config.global.registrationRequirePrivacyPolicyConfirmation
        };
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
                    if (!this.enableConfirmingPrivacyPolicy || this.privacyPolicyAccepted)
                    {
                        this.sendRegistration();
                    }
                    else
                    {
                        this.privacyPolicyShowError = true;

                        NotificationService.error(
                            TranslationService.translate("Ceres::Template.contactAcceptFormPrivacyPolicy", { hyphen: "&shy;" })
                        );
                    }
                })
                .fail(invalidFields =>
                {
                    if (!isNullOrUndefined(this.$refs.passwordHint) && invalidFields.indexOf(this.$refs.passwordInput) >= 0)
                    {
                        this.$refs.passwordHint.showPopper();
                    }
                    ValidationService.markInvalidFields(invalidFields, "error");

                    if (this.enableConfirmingPrivacyPolicy && !this.privacyPolicyAccepted)
                    {
                        this.privacyPolicyShowError = true;

                        NotificationService.error(
                            TranslationService.translate("Ceres::Template.contactAcceptFormPrivacyPolicy", { hyphen: "&shy;" })
                        );
                    }
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
                    document.dispatchEvent(new CustomEvent("onSignUpSuccess", { detail: userObject }));

                    if (!response.code)
                    {
                        NotificationService.success(
                            TranslationService.translate("Ceres::Template.regSuccessful")
                        ).closeAfter(3000);

                        if (document.getElementById(this.modalElement) !== null)
                        {
                            ModalService.findModal(document.getElementById(this.modalElement)).hide();
                        }

                        if (this.backlink !== null && this.backlink)
                        {
                            navigateTo(decodeURIComponent(this.backlink));
                        }
                        else
                        {
                            location.reload();
                        }
                    }
                    else
                    {
                        NotificationService.error(
                            TranslationService.translate("Ceres::Template.regError")
                        ).closeAfter(10000);
                    }

                    this.isDisabled = false;
                })
                .fail(() =>
                {
                    this.isDisabled = false;
                });
        },

        setAddressDataField({ field, value })
        {
            this.billingAddress[field] = value;
            this.billingAddress = Object.assign({}, this.billingAddress);
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
        },

        privacyPolicyValueChanged(value)
        {
            this.privacyPolicyAccepted = value;

            if (value)
            {
                this.privacyPolicyShowError = false;
            }
        }
    }
});
