import NotificationService from "../../services/NotificationService";
import TranslationService from "../../services/TranslationService";
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.component("subscribe-newsletter-check", {

    props: {
        template:
        {
            type: String,
            default: "#vue-subscribe-newsletter-check"
        },
        emailFolder:
        {
            type: Number,
            default: 0
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

    computed: mapState({
        newsletterSubscription(state)
        {
            return state.checkout.newsletterSubscription[this.emailFolder];
        },

        showError(state)
        {
            if (state.checkout.validation[`subscribeNewsletter_${this.emailFolder}`])
            {
                return state.checkout.validation[`subscribeNewsletter_${this.emailFolder}`].showError;
            }

            return null;
        }
    }),

    created()
    {
        if (this.isPreselected || this.hideCheckbox)
        {
            this.setValue(true);
        }

        if (this.isRequired)
        {
            this.$store.commit("addSubscribeNewsletterValidate", { emailFolder: this.emailFolder, validator: this.validate });
        }
    },

    methods:
    {
        setValue(value)
        {
            this.$store.commit("setSubscribeNewsletterCheck", { emailFolder: this.emailFolder, value });
        },

        validate()
        {
            const showError = this.isRequired && !this.newsletterSubscription;

            this.$store.commit("setSubscribeNewsletterShowErr", { emailFolder: this.emailFolder, showError });

            if (showError)
            {
                NotificationService.error(
                    TranslationService.translate("Ceres::Template.checkoutCheckAcceptNewsletterSubscription")
                );
            }
        }
    },

    watch:
    {
        newsletterSubscription()
        {
            if (this.showError)
            {
                this.validate();
            }
        }
    }
});
