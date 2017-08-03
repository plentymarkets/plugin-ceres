Vue.component("contact-form", {

    props: [
        "template"
    ],

    data()
    {
        return {
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
    }
});
