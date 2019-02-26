Vue.component("order-history-list", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-order-list"
        },
        orderList:
        {
            type: Object,
            required: true
        },
        hintText:
        {
            type: String,
            default: null
        },
        allowPaymentProviderChange:
        {
            type: Boolean,
            default: false
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
