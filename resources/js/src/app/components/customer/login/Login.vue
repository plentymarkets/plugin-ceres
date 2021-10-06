<template>
    <div class="login-pwd-reset">
        <form ref="loginForm" :id="'login-form-' + _uid" method="post">
            <div :class="{'modal-body': modalElement}">
                <div class="row">
                    <div class="col-12">
                        <div class="input-unit" data-validate="mail">
                            <input data-testing="email-login" type="email" name="email" autocomplete="email" :id="'email' + _uid" v-model="username" data-autofocus>
                            <label :for="'email' + _uid">{{ $translate("Ceres::Template.loginEmail") }}*</label>
                        </div>
                        <span class="error-msg">{{ $translate("Ceres::Template.loginEnterConfirmEmail") }}</span>
                    </div>
                    <div class="col-12">
                        <div class="input-unit" :class="{'no-bottom': modalElement}" data-validate="text">
                            <input data-testing="password-login" type="password" name="password" autocomplete="current-password" :id="'password' + _uid" v-model="password">
                            <label :for="'password' + _uid">{{ $translate("Ceres::Template.loginPassword") }}*</label>
                        </div>
                        <span class="error-msg">{{ $translate("Ceres::Template.loginEmptyPassword") }}</span>
                    </div>
                </div>
            </div>
            <div :class="{'modal-footer justify-content-between': modalElement, 'row': !modalElement}">
                <div :class="{'col-7 col-sm-4': !modalElement}">
                    <a href="javascript:void(0)" @click="showResetPwdView" class="small text-appearance">{{ $translate("Ceres::Template.loginForgotPassword") }}?</a>
                </div>
                <div :class="{'col-5 col-sm-8 text-sm-right': !modalElement}">
                    <slot name="extend-overlay-buttons"></slot>
                    <button data-testing="submit-login" @click.prevent="validateLogin" :disabled="isDisabled" class="btn btn-primary btn-appearance btn-medium" :class="[{'float-right': !modalElement}, buttonSizeClass]">
                        {{ $translate("Ceres::Template.login") }}
                        <icon icon="user" :loading="isDisabled"></icon>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { ButtonSizePropertyMixin } from "../../../mixins/buttonSizeProperty.mixin";

import ApiService from "../../../services/ApiService";
import NotificationService from "../../../services/NotificationService";
import ModalService from "../../../services/ModalService";
import AutoFocusService from "../../../services/AutoFocusService";
import ValidationService from "../../../services/ValidationService";
import {getContainingComponent, isNullOrUndefined} from "../../../helper/utils";

export default {
    mixins: [ButtonSizePropertyMixin],

    props: {
        backlink: {
            type: String
        },
        modalElement: {
            type: String
        },
        hasToForward:
        {
            type: Boolean,
            default: false
        }
    },

    data()
    {
        return {
            password: "",
            username: "",
            loginFields: [],
            isDisabled: false
        };
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.loginFields = this.$refs.loginForm.querySelectorAll(".input-unit");

            AutoFocusService.triggerAutoFocus();
        });
    },

    watch:
    {
        password(val, oldVal)
        {
            this.resetError();
        },

        username(val, oldVal)
        {
            this.resetError();
        }
    },

    methods:
    {
        /**
         * Open the login modal
         */
        showLogin()
        {
            ModalService.findModal(document.getElementById(this.modalElement)).show();
        },

        validateLogin()
        {
            ValidationService.validate($("#login-form-" + this._uid))
                .done(() =>
                {
                    this.sendLogin();
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        /**
         * Send the login data
         */
        sendLogin()
        {
            this.isDisabled = true;

            ApiService.post("/rest/io/customer/login", { email: this.username, password: this.password }, { supressNotifications: true })
                .done(response =>
                {
                    ApiService.setToken(response);

                    NotificationService.success(
                        this.$translate("Ceres::Template.loginSuccessful")
                    ).closeAfter(3000);

                    if (this.backlink !== null && this.backlink)
                    {
                        location.assign(decodeURIComponent(this.backlink));
                    }
                    else if (this.hasToForward)
                    {
                        location.assign(location.origin);
                    }
                    else
                    {
                        location.reload();
                    }
                })
                .fail(response =>
                {
                    this.isDisabled = false;

                    switch (response.error.code)
                    {
                        case 401:
                            this.loginFields.forEach(element => element.classList.add("has-login-error"));

                            let translationKey = "Ceres::Template.loginFailed";

                            if (response.error.message.length > 0 && response.error.message === "user is blocked")
                            {
                                translationKey = "Ceres::Template.loginBlocked";
                            }
                            NotificationService.error(
                                this.$translate(translationKey)
                            ).closeAfter(10000);
                            break;
                        default:
                            return;
                    }
                });
        },

        showResetPwdView()
        {
            this.resetError();

            this.$store.dispatch("loadComponent", "forgot-password-modal");

            Vue.nextTick(() =>
            {
                let modalDOM = document.querySelector('#resetPwd');
                let modalVue = getContainingComponent(modalDOM);

                modalVue.$data.username = this.username;

                let showModal = () => ModalService.findModal(modalDOM).show();

                if(this.modalElement)
                {
                    ModalService
                        .findModal(document.getElementById(this.modalElement))
                        .hide()
                        .then(showModal);
                }
                else
                {
                    showModal();
                }
            });
        },

        resetError()
        {
            this.loginFields.forEach( element => element.classList.remove("has-login-error"));
            ValidationService.unmarkAllFields("#login-form-" + this._uid);
        }
    }
}
</script>
