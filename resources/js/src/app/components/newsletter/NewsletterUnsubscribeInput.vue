<template>
    <form :id="'newsletter-unsubscribe-input-form_' + _uid" method="post" @submit.prevent="validateData">
        <div class="row">
            <div class="col-12">
                <div class="input-unit mt-3" data-validate="mail">
                    <label for="email-input-id">{{ $translate("Ceres::Template.newsletterEmail") }}</label>
                    <input type="email" name="email" autocomplete="email" class="form-control" id="email-input-id" v-model="email">
                </div>

                <input class="honey" type="text" name="username" autocomplete="new-password" tabindex="-1" v-model="honeypot">

                <span class="input-group-btn">
                    <button type="submit" class="btn btn-primary btn-appearance float-right btn-medium btn-xs-max-width" @click="validateData" :disabled="isDisabled" :class="buttonSizeClass">
                        <icon icon="paper-plane-o" :loading="isDisabled"></icon>
                        <span>{{ $translate("Ceres::Template.newsletterUnsubscribeButtonLabel") }}</span>
                    </button>
                </span>
            </div>
        </div>
    </form>
</template>

<script>
import ApiService from "../../services/ApiService";
import ValidationService from "../../services/ValidationService";
import NotificationService from "../../services/NotificationService";
import UrlService from "../../services/UrlService";

import { isUndefined } from "../../helper/utils";
import { ButtonSizePropertyMixin } from "../../mixins/buttonSizeProperty.mixin";

export default {

    mixins: [ButtonSizePropertyMixin],

    data()
    {
        return {
            email: "",
            isDisabled: false,
            honeypot: ""
        };
    },

    methods: {
        validateData()
        {
            this.isDisabled = true;

            ValidationService.validate($("#newsletter-unsubscribe-input-form_" + this._uid))
                .done(() =>
                {
                    this.save();
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");

                    this.isDisabled = false;
                });
        },

        save()
        {
            const urlParams = UrlService.getUrlParams(document.location.search);

            if (isUndefined( urlParams.folderId ))
            {
                urlParams.folderId = 0;
            }

            ApiService.del("/rest/io/customer/newsletter/" + this.email, { "emailFolder": urlParams.folderId, "honeypot": this.honeypot })
                .done(() =>
                {
                    NotificationService.success(
                        this.$translate("Ceres::Template.newsletterOptOutSuccessMessage")
                    ).closeAfter(3000);
                    this.resetInputs();
                })
                .fail(() =>
                {
                    NotificationService.error(
                        this.$translate("Ceres::Template.newsletterOptOutErrorMessage")
                    ).closeAfter(5000);
                })
                .always(() =>
                {
                    this.isDisabled = false;
                });
        },

        resetInputs()
        {
            this.email = "";
        }
    }
}
</script>
