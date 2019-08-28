import ValidationService from "../../../services/ValidationService";
import { navigateTo } from "../../../services/UrlService";
import Vue from "vue";
import { isDefined } from "../../../helper/utils";

const ApiService = require("../../../services/ApiService");

Vue.component("guest-login", {

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
        },

        buttonSize:
        {
            type: [String, null],
            default: "lg",
            validator: value =>
            {
                return ["sm", "md", "lg"].indexOf(value) !== -1;
            }
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
            $("#guestLogin").on("hidden.bs.modal", () =>
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
                    this.sendEMail();
                })
                .fail(invalidFields =>
                {
                    ValidationService.markInvalidFields(invalidFields, "error");
                });
        },

        sendEMail()
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
