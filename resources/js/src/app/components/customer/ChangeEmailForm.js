const ApiService          = require("../../services/ApiService");
const NotificationService = require("../../services/NotificationService");

import TranslationService from "../../services/TranslationService";
import Vue from "vue";

Vue.component("change-email-form", {

    props: {
        template: {
            type: String,
            default: "#vue-change-email-form"
        },
        contactId:
        {
            type: Number,
            required: true
        },
        hash:
        {
            type: String,
            required: true
        },
        newMail:
        {
            type: String,
            required: true
        }
    },
    data()
    {
        return {
            password: "",
            isDisabled: false
        };
    },

    methods: {
        /**
         * Send the login data
         */
        submit()
        {
            this.isDisabled = true;

            ApiService.put("/rest/io/customer/mail/" + this.contactId, { password: this.password, hash: this.hash })
                .done(response =>
                {
                    NotificationService.success(
                        TranslationService.translate("Ceres::Template.myAccountChangeEmailSuccessful")
                    );
                    window.location.assign(window.location.origin);
                })
                .fail(() =>
                {
                    NotificationService.error(
                        TranslationService.translate("Ceres::Template.myAccountChangeEmailFailed")
                    ).closeAfter(10000);
                })
                .always(() =>
                {
                    this.isDisabled = false;
                });
        }
    }
});
