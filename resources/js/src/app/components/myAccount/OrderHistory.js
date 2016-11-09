var ApiService = require("services/ApiService");

(function($)
{
    Vue.component("order-history", {

        template: "#vue-order-history",

        props: [
            "orderList",
            "itemsPerPage",
            "showFirstPage",
            "showLastPage",
            "orderDetailsConfig"
        ],

        data: function()
        {
            return {
                page: 1,
                pageMax: 1,
                countStart: 0,
                countEnd: 0,
                currentOrder: null
            };
        },

        ready: function()
        {
            this.itemsPerPage = this.itemsPerPage || 10;
            this.pageMax = Math.ceil(this.orderList.totalsCount / this.itemsPerPage);
            this.setOrders(this.orderList);
        },

        computed: {
            currentOrderItems: function()
            {
                if (this.currentOrder !== null)
                {
                    return this.currentOrder.order.orderItems.filter(function(item)
                    {
                        return item.itemVariationId > 0;
                    });
                }

                return [];
            },

            shippingDate: function()
            {
                if (this.currentOrder !== null)
                {
                    for (var date in this.currentOrder.order.dates)
                    {
                        if (date.typeId === 8)
                        {
                            return date;
                        }
                    }
                }
                return null;
            },

            paymentStatus: function()
            {
                if (this.currentOrder !== null)
                {
                    for (var propertyKey in this.currentOrder.order.properties)
                    {
                        var property = this.currentOrder.order.properties[propertyKey];

                        if (property.typeId === 13 && property.subTypeId === 3)
                        {
                            return property.value;
                        }
                    }
                }
                return "";
            },

            totals: function()
            {
                return {
                    currency: "EUR",
                    itemSum: 0,
                    itemSumNet: 0,
                    shippingAmount: 0,
                    shippingAmountNet: 0,
                    vat: 0,
                    totalAmount: 0,
                    totalAmountNet: 0
                };
            }
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
                this.currentOrder = order;
                var self = this;

                Vue.nextTick(function()
                {
                    $(self.$els.orderDetails).modal("show");
                });
            },

            showPage: function(page)
            {
                var self = this;

                if (page <= 0 || page > this.pageMax)
                {
                    return;
                }

                ApiService
                    .get("rest/order?page=" + page + "&items=" + this.itemsPerPage)
                    .done(function(response)
                    {
                        self.setOrders(response);
                    });
            },

            showProperty: function(name)
            {
                return !this.orderDetailsConfig || this.orderDetailsConfig.indexOf(name) >= 0 || this.orderDetailsConfig.indexOf("all") >= 0;
            }

        }
    });
})(jQuery);
