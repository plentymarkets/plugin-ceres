Vue.component("accept-privacy-policy-check", {

    props: {
        template:
        {
            type: String,
            default: "#vue-accept-privacy-policy-check"
        },

        value:
        {
            type: Boolean,
            default: false
        },

        showError:
        {
            type: Boolean,
            default: false
        }
    },

    created()
    {
        this.$options.template = this.template;
    }
});
