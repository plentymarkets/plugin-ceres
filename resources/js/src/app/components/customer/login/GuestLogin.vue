<template>
    <div>
        <form ref="form" method="post" class="mb-3 login-pwd-reset">
            <div class="input-unit" data-validate="mail">
                <input type="email" name="email" autocomplete="email" data-testing="guest-login-input" :id="_uid" v-model="email" data-autofocus>
                <label :for="_uid">{{ $translate("Ceres::Template.loginEmail") }}*</label>
            </div>
            <span class="error-msg">{{ $translate("Ceres::Template.loginEnterConfirmEmail") }}</span>

            <div class="text-right">
                <button @click.prevent="validate" :disabled="isDisabled" class="btn btn-primary btn-medium btn-appearance" :class="buttonSizeClass" data-testing="guest-login-button">
                    {{ $translate("Ceres::Template.loginNext") }}
                    <icon icon="arrow-right" :loading="isDisabled"></icon>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { ButtonSizePropertyMixin } from "../../../mixins/buttonSizeProperty.mixin";

import ApiService from "../../../services/ApiService";
import AutoFocusService from "../../../services/AutoFocusService";
import ValidationService from "../../../services/ValidationService";
import { navigateTo } from "../../../services/UrlService";
import { isDefined, isNullOrUndefined } from "../../../helper/utils";
import ModalService from "../../../services/ModalService";

export default {
    mixins: [ButtonSizePropertyMixin],

    props: {
        backlink:
        {
            type: String
        },
        initialEmail:
        {
            type: String,
            default: ""
        }
    },

    data()
    {
        return {
            email: "",
            isDisabled: false
        };
    },

    created()
    {
        if (!isNullOrUndefined(this.initialEmail) && this.initialEmail.length > 0)
        {
            this.email = this.initialEmail;
        }
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            const modal = ModalService.findModal(this.$parent.$refs.guestModal);

            // for old login view only (input in modal)
            if(!isNullOrUndefined(modal))
            {
                modal.on("hidden.bs.modal", () =>
                {
                    this.email = "";
                    ValidationService.unmarkAllFields(this.$refs.form);
                });
            }

            if (isDefined(modal))
            {
                modal.on("shown.bs.modal", () =>
                {
                    AutoFocusService.triggerAutoFocus(modal);
                });
            }
        });
    },

    methods:
    {
        validate()
        {
            ValidationService.validate(this.$refs.form)
                .done(() =>
                {
                    this.authGuest();
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        authGuest()
        {
            this.isDisabled = true;

            ApiService.post("/rest/io/guest", { email: this.email })
                .done(() =>
                {
                    navigateTo(
                        isDefined(this.backlink) && this.backlink.length ? decodeURIComponent(this.backlink) : window.location.origin + (App.urls.includeLanguage ? "/" + App.language : "")
                    );
                })
                .fail(() =>
                {
                    this.isDisabled = false;
                });
        }
    }
}
</script>
