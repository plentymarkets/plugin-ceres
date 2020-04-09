import TranslationService from "../../services/TranslationService";
const NotificationService = require("../../services/NotificationService");

import Vue from "vue";
import { mapState } from "vuex";

export default Vue.component("accept-gtc-check", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-accept-gtc-check"
        },
        hideCheckbox:
        {
            type: Boolean
        },
        isPreselected:
        {
            type: Boolean
        },
        isRequired:
        {
            type: Boolean,
            default: true
        },
        customText:
        {
            type: String,
            default: ""
        }
    },

    data()
    {
        return {
            isChecked: this.isPreselected
        };
    },

    computed:
    {
        ...mapState({
            showError: state => state.checkout.validation.gtc.showError
        })
    },

    created()
    {
        if (this.hideCheckbox)
        {
            this.isChecked = true;
        }
        else if (this.isRequired)
        {
            this.$store.commit("setGtcValidator", this.validate);
        }
    },

    methods:
    {
        validate()
        {
            const showError = !this.isChecked;

            this.$store.commit("setGtcShowError", showError);

            if (showError)
            {
                NotificationService.error(
                    TranslationService.translate("Ceres::Template.checkoutCheckAcceptGtc")
                );
            }
        }
    },

    watch:
    {
        isChecked()
        {
            if (this.showError)
            {
                this.validate();
            }
        }
    }
});
