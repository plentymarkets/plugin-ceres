const ApiService = require("services/ApiService");

Vue.component("order-history", {

    props: [
        "orderList",
        "itemsPerPage",
        "showFirstPage",
        "showLastPage",
        "template"
    ],

    data()
    {
        return {
            page: 1,
            pageMax: 1,
            countStart: 0,
            countEnd: 0,
            currentOrder: null,
            isLoading: true
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    ready()
    {
        this.itemsPerPage = this.itemsPerPage || 10;
        this.pageMax = Math.ceil(this.orderList.totalsCount / this.itemsPerPage);
        this.setOrders(this.orderList);
    },

    methods: {

        setOrders(orderList)
        {
            this.$set("orderList", orderList);
            this.page = this.orderList.page;
            this.countStart = ((this.orderList.page - 1) * this.itemsPerPage) + 1;
            this.countEnd = this.orderList.page * this.itemsPerPage;

            if (this.countEnd > this.orderList.totalsCount)
            {
                this.countEnd = this.orderList.totalsCount;
            }

        },

        setCurrentOrder(order)
        {
            $("#dynamic-twig-content").html("");
            this.isLoading = true;

            this.currentOrder = order;

            Vue.nextTick(() =>
            {
                $(this.$els.orderDetails).modal("show");
            });

            const jsonEncodedOrder = JSON.stringify(order);

            ApiService
                .get("/rest/io/template?template=Ceres::Checkout.OrderDetails&params[orderData]=" + jsonEncodedOrder)
                .done(response =>
                {
                    this.isLoading = false;
                    $("#dynamic-twig-content").html(response);
                });
        },

        getPaymentStateText(paymentStates)
        {
            for (const paymentState in paymentStates)
            {
                if (paymentStates[paymentState].typeId == 4)
                {
                    return Translations.Template["paymentStatus_" + paymentStates[paymentState].value];
                }
            }

            return "";
        },

        showPage(page)
        {
            if (page <= 0 || page > this.pageMax)
            {
                return;
            }

            ApiService
                .get("rest/io/order?page=" + page + "&items=" + this.itemsPerPage)
                .done(response =>
                {
                    this.setOrders(response);
                });
        }
    }
});
