Vue.component("accept-privacy-policy-check", {

    props: {
        template:
        {
            type: String,
            default: "#vue-accept-privacy-policy-check"
        },

        value:
        {
            type: Boolean
        },

        showError:
        {
            type: Boolean
        }
    },

    created()
    {
        this.$options.template = this.template;
    }
});
