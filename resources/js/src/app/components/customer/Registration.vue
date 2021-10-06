<template>
    <form class="w-100" autocomplete="on" method="post" @submit.prevent="validateRegistration()" ref="registrationForm">
        <div class="row">
            <div class="col-sm-12">
                <div class="input-unit" data-validate="mail">
                    <input data-testing="mail-register" type="email" name="email" autocomplete="email" :id="'email'+_uid" v-model="username" data-autofocus>
                    <label :for="'email'+_uid">{{ $translate("Ceres::Template.regEmail") }}*</label>
                </div>
            </div>

            <div class="col-sm-6" v-if="!guestMode">
                <div class="input-unit" :class="{'no-bottom media-xs-d': modalElement}" data-validate="password" ref="passwordInput">
                    <popper v-cloak trigger="focus" placement="bottom" ref="passwordHint">
                        <template #handle>
                            <input data-testing="password-register" type="password" name="password" autocomplete="new-password" :id="'new-password-' + _uid" v-model="password">
                        </template>

                        <template #title>
                            <div>
                                {{ $translate("Ceres::Template.regPasswordHintTitle") }}
                            </div>
                        </template>

                        <template #content>
                            <ul class="pl-3">
                                <li>{{ $translate("Ceres::Template.regPasswordHintLength") }}</li>
                                <li>{{ $translate("Ceres::Template.regPasswordHintDigit") }}</li>
                                <li>{{ $translate("Ceres::Template.regPasswordHintChar") }}</li>
                            </ul>
                        </template>
                    </popper>

                    <label :for="'new-password-' + _uid">{{ $translate("Ceres::Template.regPassword") }}*</label>
                </div>
            </div>

            <div class="col-sm-6 input-unit-group" v-if="!guestMode">
                <div class="input-unit" :class="{'no-bottom': modalElement}" data-validate="ref">
                    <input type="password" name="password-repeat" autocomplete="new-password" :id="'new-password-repeat-' + _uid" v-model="passwordRepeat" :data-validate-ref="'#new-password-' + _uid" data-testing="repeat-password-register">
                    <label :for="'new-password-repeat-' + _uid">{{ $translate("Ceres::Template.regRepeatPassword") }}*</label>
                </div>
            </div>

            <input class="honey" type="text" name="username" autocomplete="new-password" tabindex="-1" v-model="honeypot">

            <div class="col-12">
                <address-input-group
                    template="#vue-address-input-group"
                    v-if="!isSimpleRegistration"
                    address-type="1"
                    :value="billingAddress"
                    @input="setAddressDataField($event)"
                    :optional-address-fields="shownFields"
                    :required-address-fields="requiredFields"
                    :default-salutation="defaultSalutation">
                    <template #custom-address-fields>
                        <slot name="custom-address-fields"></slot>
                    </template>
                </address-input-group>
            </div>

            <div class="col-12" v-if="enableConfirmingPrivacyPolicy">
                <accept-privacy-policy-check
                        class="mt-3 mb-0"
                        v-model="privacyPolicyAccepted"
                        @input="privacyPolicyValueChanged($event)"
                        :show-error="privacyPolicyShowError">
                </accept-privacy-policy-check>
            </div>
        </div>
        <div class="border-top mt-2 text-right">
            <slot name="extend-overlay-buttons"></slot>

            <button :disabled="isDisabled" class="btn btn-appearance btn-primary btn-medium mt-3" :class="buttonSizeClass" data-testing="register-submit">
                {{ $translate("Ceres::Template.regRegister") }}
                <icon icon="user-plus" class="default-float" :loading="isDisabled"></icon>
            </button>
        </div>

        <recaptcha v-if="!!googleRecaptchaApiKey && (modalShown || !isSimpleRegistration)"></recaptcha>
    </form>
</template>

<script>
import ValidationService from "../../services/ValidationService";
import { navigateTo } from "../../services/UrlService";
import { executeReCaptcha } from "../../helper/executeReCaptcha";
import { isNullOrUndefined, isDefined } from "../../helper/utils";
import { ButtonSizePropertyMixin } from "../../mixins/buttonSizeProperty.mixin";
import AddressInputGroup from "./AddressInputGroup.vue";
import ApiService from "../../services/ApiService";
import NotificationService from "../../services/NotificationService";
import ModalService from "../../services/ModalService";
import AcceptPrivacyPolicyCheck from "./AcceptPrivacyPolicyCheck.vue";

export default {

    name: "registration",

    components:
    {
        AddressInputGroup,
        AcceptPrivacyPolicyCheck
    },

    mixins: [ButtonSizePropertyMixin],

    props: {
        modalElement: String,
        guestMode: { type: Boolean, default: false },
        isSimpleRegistration: { type: Boolean, default: false },
        template: String,
        backlink: String,
        shownFields: Object,
        requiredFields: Object,
        defaultSalutation:  {
            type: String,
            default: App.config.addresses.defaultSalutation
        }
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
                gender: this.defaultSalutation
            },
            isDisabled: false,
            privacyPolicyAccepted : false,
            privacyPolicyShowError: false,
            enableConfirmingPrivacyPolicy: App.config.global.registrationRequirePrivacyPolicyConfirmation,
            googleRecaptchaApiKey: App.config.global.googleRecaptchaApiKey,
            modalShown: false,
            honeypot: ""
        };
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            if (this.modalElement)
            {
                this.initModalEventListeners();
            }
        });
    },

    methods: {
        /**
         * Validate the registration form
         */
        validateRegistration()
        {
            executeReCaptcha(this.$refs.registrationForm)
                .then((recaptchaToken) =>
                {
                    ValidationService.validate(this.$refs.registrationForm)
                        .done(() =>
                        {
                            if (!this.enableConfirmingPrivacyPolicy || this.privacyPolicyAccepted)
                            {
                                this.sendRegistration(recaptchaToken);
                            }
                            else
                            {
                                this.privacyPolicyShowError = true;

                                NotificationService.error(
                                    this.$translate("Ceres::Template.contactAcceptFormPrivacyPolicy", { hyphen: "&shy;" })
                                );
                                this.resetRecaptcha();
                            }
                        })
                        .fail(invalidFields =>
                        {
                            this.resetRecaptcha();

                            if (!isNullOrUndefined(this.$refs.passwordHint) && invalidFields.indexOf(this.$refs.passwordInput) >= 0)
                            {
                                this.$refs.passwordHint.showPopper();
                            }

                            const invalidFieldNames = this.getInvalidFieldNames(invalidFields);

                            if (invalidFieldNames.length > 0)
                            {
                                NotificationService.error(
                                    this.$translate("Ceres::Template.checkoutCheckAddressFormFields", { fields: invalidFieldNames.join(", ") })
                                );
                            }

                            ValidationService.markInvalidFields(invalidFields, "error");

                            if (this.enableConfirmingPrivacyPolicy && !this.privacyPolicyAccepted)
                            {
                                this.privacyPolicyShowError = true;

                                NotificationService.error(
                                    this.$translate("Ceres::Template.contactAcceptFormPrivacyPolicy", { hyphen: "&shy;" })
                                );
                            }
                        });
                });
        },

        getInvalidFieldNames(invalidFields = [])
        {
            const fieldNames = [];

            for (const field of invalidFields)
            {
                let fieldName = field.lastElementChild.innerHTML.trim();

                fieldName = fieldName.slice(-1) === "*" ? fieldName.slice(0, fieldName.length - 1) : fieldName;
                fieldNames.push(fieldName);
            }

            return fieldNames;
        },

        /**
         * Send the registration
         */
        sendRegistration(recaptchaToken)
        {
            const userObject = this.getUserObject();

            userObject.recaptcha = recaptchaToken;

            this.isDisabled = true;

            ApiService.post("/rest/io/customer", userObject)
                .done(response =>
                {
                    ApiService.setToken(response);

                    if (!response.code)
                    {
                        document.dispatchEvent(new CustomEvent("onSignUpSuccess", { detail: userObject }));

                        NotificationService.success(
                            this.$translate("Ceres::Template.regSuccessful")
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
                            this.$translate("Ceres::Template.regError")
                        ).closeAfter(10000);

                        this.resetRecaptcha();
                    }

                    this.isDisabled = false;
                })
                .fail((error) =>
                {
                    NotificationService.error(error.error).closeAfter(10000);

                    this.resetRecaptcha();

                    this.isDisabled = false;
                });
        },

        /** 
         * Resets recaptcha v2 to make it capable of executing again.
        */
        resetRecaptcha()
        {
            if(App.config.global.googleRecaptchaVersion === 2 && window.grecaptcha)
            {
                const recaptchaId = this.$refs.registrationForm.querySelector("[data-recaptcha]");

                window.grecaptcha.reset(recaptchaId);
            }
        },

        setAddressDataField({ field, value })
        {
            this.billingAddress[field] = value;
            this.billingAddress = Object.assign({}, this.billingAddress);
        },

        /**
         * Handle the user object which is send to the server
         * @returns {{contact: {referrerId: number, typeId: number, options: {typeId: {typeId: number, subTypeId: number, value: *, priority: number}}}, honeypot: string}|{contact: {referrerId: number, typeId: number, password: *, options: {typeId: {typeId: number, subTypeId: number, value: *, priority: number}}}, honeypot: string}}
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
                    },
                    honeypot: this.honeypot
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
        },

        initModalEventListeners()
        {
            const modal = ModalService.findModal(document.getElementById(this.modalElement));

            if (isDefined(modal))
            {
                modal.on("show.bs.modal",
                    () =>
                    {
                        this.modalShown = true;
                    });

                modal.on("hide.bs.modal",
                    () =>
                    {
                        this.modalShown = false;
                    });
            }
        }
    }
}
</script>
