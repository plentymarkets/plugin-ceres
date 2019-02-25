Vue.component("order-list", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-order-list"
        }
    },

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
