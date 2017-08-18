Vue.component("reset-password-form", {

    props: [
        "template"
    ],

    date()
    {
        return {
            passwordFirst: "",
            passwordSecond: ""
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    methods: {

    }

});
