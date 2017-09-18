Vue.component("order-return", {

    props: [
        "initOrderData",
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

        this.$store.commit("setOrderReturnData", this.initOrderData);

        console.log(this.orderData);
    },

    computed: Vuex.mapState({
        orderData: state => state.orderReturn.orderData,
        isDisabled: state => state.orderReturn.orderReturnItems.length === 0
    }),

    methods:
    {
        sendReturnItems()
        {
            this.sendOrderReturn().then(
                response =>
                {
                    console.log("done");
                },
                error =>
                {
                    console.log("fail");
                });
        },

        ...Vuex.mapActions([
            "sendOrderReturn"
        ])
    }
});
