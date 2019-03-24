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
            $(this.$refs.orderReturnConfirmation).modal("show");
        },

        sendReturnItems()
        {
            this.isLoading = true;

            this.sendOrderReturn().then(
                response =>
                {
                    window.open("/return-confirmation", "_self");
                    $(this.$refs.orderReturnConfirmation).modal("hide");
                },
                error =>
                {
                    this.isLoading = false;
                    $(this.$refs.orderReturnConfirmation).modal("hide");
                });
        },

        selectAllItems()
        {
            vueEventHub.$emit("select-all-items");
        },

        ...Vuex.mapMutations([
            "updateOrderReturnNote"
        ]),

        ...Vuex.mapActions([
            "sendOrderReturn"
        ])
    }
});
