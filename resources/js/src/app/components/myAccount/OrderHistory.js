var ApiService = require("services/ApiService");

(function($)
{
    Vue.component("order-history", {

        props: [
            "orderList",
            "itemsPerPage",
            "showFirstPage",
            "showLastPage",
            "template"
        ],

        data: function()
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

        created: function()
        {
            this.$options.template = this.template;
        },

        ready: function()
        {
            this.itemsPerPage = this.itemsPerPage || 10;
            this.pageMax = Math.ceil(this.orderList.totalsCount / this.itemsPerPage);
            this.setOrders(this.orderList);
        },

        methods: {

            setOrders: function(orderList)
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

            setCurrentOrder: function(order)
            {
                $("#dynamic-twig-content").html("");
                this.isLoading = true;

                this.currentOrder = order;
                var self = this;

                Vue.nextTick(function()
                {
                    $(self.$els.orderDetails).modal("show");
                });

                var jsonEncodedOrder = JSON.stringify(order);

                ApiService
                    .get("/rest/io/template?template=Ceres::Checkout.OrderDetails&params[orderData]=" + jsonEncodedOrder)
                    .done(function(response)
                    {
                        this.isLoading = false;
                        $("#dynamic-twig-content").html(response);
                    }.bind(this));
            },

            showPage: function(page)
            {
                var self = this;

                if (page <= 0 || page > this.pageMax)
                {
                    return;
                }

                ApiService
                    .get("rest/io/order?page=" + page + "&items=" + this.itemsPerPage)
                    .done(function(response)
                    {
                        self.setOrders(response);
                    });
            }
        }
    });
})(jQuery);
