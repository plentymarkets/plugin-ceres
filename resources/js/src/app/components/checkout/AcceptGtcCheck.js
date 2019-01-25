import TranslationService from "services/TranslationService";
const NotificationService = require("services/NotificationService");

Vue.component("accept-gtc-check", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-accept-gtc-check"
        },
        appearance:
        {
            type: String,
            default: "primary"
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

    computed: Vuex.mapState({
        showError: state => state.checkout.validation.gtc.showError
    }),

    created()
    {
        this.$options.template = this.template;

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
