Vue.component("order-return-history", {

    props: [
        "template",
        "returnsList"
    ],

    data()
	{
        return {
        };
    },

    created()
	{
        this.$options.template = this.template;

        console.log(this.returnsList);
    },

    methods:
    {
    }
});
