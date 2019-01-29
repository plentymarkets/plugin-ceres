Vue.component("subscribe-newsletter-check", {

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
        }
    },

    computed: Vuex.mapState({
        newsletterSubscription(state)
        {
            return state.checkout.newsletterSubscription[this.emailFolder];
        }
    }),

    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
        setValue(value)
        {
            this.$store.commit("setSubscribeNewsletterCheck", { emailFolder: this.emailFolder, value });
        }
    }
});
