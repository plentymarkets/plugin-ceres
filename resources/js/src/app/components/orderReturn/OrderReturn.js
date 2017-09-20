const NotificationService = require("services/NotificationService");

Vue.component("order-return", {

    props: [
        "initOrderData",
        "template"
    ],

    data()
    {
        return {
            isLoading: false
        };
    },

    created()
    {
        this.$options.template = this.template;

        this.$store.commit("setOrderReturnData", this.initOrderData);
    },

    computed: Vuex.mapState({
        orderData: state => state.orderReturn.orderData,
        isDisabled: state => state.orderReturn.orderReturnItems.length === 0
    }),

    methods:
    {
        sendReturnItems()
        {
            this.isLoading = true;

            this.sendOrderReturn().then(
                response =>
                {
                    NotificationService.success("Artikel wurden erfolgreich zurückgeschickt");

                    window.open("/my-account", "_self");
                },
                error =>
                {
                    this.isLoading = false;
                });
        },

        ...Vuex.mapActions([
            "sendOrderReturn"
        ])
    }
});
