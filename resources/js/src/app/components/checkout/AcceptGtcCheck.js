Vue.component("accept-gtc-check", {

    delimiters: ["${", "}"],

    props: [
        "template"
    ],

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
            this.$store.commit("setGtcShowError", !this.isChecked);
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
