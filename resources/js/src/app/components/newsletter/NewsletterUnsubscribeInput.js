import TranslationService from "../../services/TranslationService";
import ValidationService from "../../services/ValidationService";
import ApiService from "../../services/ApiService";
import NotificationService from "../../services/NotificationService";
import UrlService from "../../services/UrlService";

import { isUndefined } from "../../helper/utils";
import Vue from "vue";
import { ButtonSizePropertyMixin } from "../../mixins/buttonSizeProperty.mixin";

Vue.component("newsletter-unsubscribe-input", {

    mixins: [ButtonSizePropertyMixin],

    props: {
        template:
        {
            type: String,
            default: "#vue-newsletter-unsubscribe-input"
        }
    },

    data()
    {
        return {
            email: "",
            isDisabled: false
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

            ApiService.del("/rest/io/customer/newsletter/" + this.email, { "emailFolder": urlParams.folderId })
                .done(() =>
                {
                    NotificationService.success(
                        TranslationService.translate("Ceres::Template.newsletterOptOutSuccessMessage")
                    ).closeAfter(3000);
                    this.resetInputs();
                })
                .fail(() =>
                {
                    NotificationService.error(
                        TranslationService.translate("Ceres::Template.newsletterOptOutErrorMessage")
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
});
