Vue.component("order-return-item", {

    props: [
        "orderData",
        "orderItem",
        "template"
    ],

    data()
	{
        return {
            isChecked: false
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
