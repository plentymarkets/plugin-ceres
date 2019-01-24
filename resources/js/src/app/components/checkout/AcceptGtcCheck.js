import TranslationService from "services/TranslationService";
const NotificationService = require("services/NotificationService");

Vue.component("accept-gtc-check", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-accept-gtc-check"
        }
    },

    data()
    {
        return {
            isChecked: false
        };
    },

    computed: Vuex.mapState({
        showError: state => state.checkout.validation.gtc.showError
    }),

    created()
    {
        this.$options.template = this.template;
        this.$store.commit("setGtcValidator", this.validate);
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
