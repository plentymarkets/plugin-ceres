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
        orderReturnItems: state => state.orderReturn.orderReturnItems,
        isDisabled: state => state.orderReturn.orderReturnItems.length === 0
    }),

    methods:
    {
        showConfirmationModal()
        {
            $(this.$els.orderReturnConfirmation).modal("show");
        },

        sendReturnItems()
        {
            this.isLoading = true;

            this.sendOrderReturn().then(
                response =>
                {
                    NotificationService.success(Translations.Template.myAccountReturnSuccess);

                    window.open("/my-account", "_self");
                    $(this.$els.orderReturnConfirmation).modal("hide");
                },
                error =>
                {
                    this.isLoading = false;
                    $(this.$els.orderReturnConfirmation).modal("hide");
                });
        },

        ...Vuex.mapActions([
            "sendOrderReturn"
        ])
    }
});
