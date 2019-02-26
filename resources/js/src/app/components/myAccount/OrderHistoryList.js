Vue.component("order-history-list", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-order-history-list"
        },
        orderList:
        {
            type: Object,
            required: true
        },
        page:
        {
            type: Number,
            default: 1
        },
        ordersPerPage:
        {
            type: Number,
            default: 5
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
