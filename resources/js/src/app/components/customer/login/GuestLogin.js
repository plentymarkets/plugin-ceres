import ValidationService from "../../../services/ValidationService";
import { navigateTo } from "../../../services/UrlService";
import Vue from "vue";
import { isDefined } from "../../../helper/utils";
import { ButtonSizePropertyMixin } from "../../../mixins/buttonSizeProperty.mixin";

const ApiService = require("../../../services/ApiService");

Vue.component("guest-login", {

    mixins: [ButtonSizePropertyMixin],

    props:
    {
        template:
        {
            type: String,
            default: "#vue-guest-login"
        },
        backlink:
        {
            type: String
        }
    },

    data()
    {
        return {
            email: "",
            isDisabled: false
        };
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            // for old login view only (input in modal)
            $(this.$parent.$refs.guestModal).on("hidden.bs.modal", () =>
            {
                this.email = "";
                ValidationService.unmarkAllFields(this.$refs.form);
            });
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
                        isDefined(this.backlink) && this.backlink.length ? decodeURIComponent(this.backlink) : window.location.origin
                    );
                })
                .fail(() =>
                {
                    this.isDisabled = false;
                });
        }
    }
});
