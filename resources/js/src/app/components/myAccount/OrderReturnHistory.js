Vue.component("order-return-history", {

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
