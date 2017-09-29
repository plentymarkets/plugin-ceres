Vue.component("accept-gtc-check", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            isChecked: false
        };
    },

    computed: Vuex.mapState({
        showError: state => state.checkout.validation.gtc.showError
    }),

    created: function()
    {
        this.$options.template = this.template;
        this.$store.commit("setGtcValidator", this.validate);
    },

    methods:
    {
        validate: function()
        {
            this.$store.commit("setGtcShowError", this.showError = !this.isChecked);
        }
    },

    watch:
    {
        isChecked: function()
        {
            this.showError = false;
        }
    }
});
