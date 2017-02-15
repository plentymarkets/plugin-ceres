Vue.component("order-details", {

    props: [
        "orderData",
        "totalsConfig",
        "template"
    ],

    created: function()
    {
        this.$options.template = this.template;
    },

    computed: {
        orderItems: function()
        {
            if (this.orderData !== null)
            {
                return this.orderData.order.orderItems.filter(function(item)
                {
                    return item.itemVariationId > 0;
                });
            }

            return [];
        },

        shippingDate: function()
        {
            if (this.orderData !== null)
            {
                for (var date in this.orderData.order.dates)
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
            if (this.orderData !== null)
            {
                for (var propertyKey in this.orderData.order.properties)
                {
                    var property = this.orderData.order.properties[propertyKey];

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
            if (this.orderData !== null)
            {
                var itemSum = 0;
                var itemSumNet = 0;
                var shippingCosts = 0;
                var shippingCostsNet = 0;
                var couponValue = 0;

                for (var i in this.orderData.order.orderItems)
                {
                    var orderItem = this.orderData.order.orderItems[i];

                    switch (orderItem.typeId)
                    {
                    // Item
                    case 1:
                        itemSum += orderItem.amounts[0].priceGross;
                        itemSumNet += orderItem.amounts[0].priceNet;
                        break;
                    // Bundle
                    case 2:

                        break;
                    // Bundle-component
                    case 3:

                        break;
                    // Aktionsgutschein
                    case 4:
                        couponValue += orderItem.amounts[0].priceGross;
                        break;
                    // Verkaufsgutschein
                    case 5:
                        couponValue += orderItem.amounts[0].priceGross;
                        break;
                    // Shipping-costs
                    case 6:
                        shippingCosts += orderItem.amounts[0].priceGross;
                        shippingCostsNet += orderItem.amounts[0].priceNet;
                        break;
                    // Peyment-fee
                    case 7:

                        break;
                    // Geschenke
                    case 8:

                        break;
                    // Pfand
                    case 10:

                        break;
                    }
                }

                return {
                    currency: this.orderData.order.amounts[0].currency,
                    itemSum: itemSum,
                    itemSumNet: itemSumNet,
                    shippingAmount: shippingCosts,
                    shippingAmountNet: shippingCostsNet,
                    vat: this.orderData.order.amounts[0].vatTotal,
                    couponValue: couponValue,
                    totalAmount: this.orderData.order.amounts[0].grossTotal,
                    totalAmountNet: this.orderData.order.amounts[0].netTotal
                };
            }

            return {
                currency: "EUR",
                itemSum: 0,
                itemSumNet: 0,
                shippingAmount: 0,
                shippingAmountNet: 0,
                vat: 0,
                couponValue: 0,
                totalAmount: 0,
                totalAmountNet: 0
            };
        }
    },

    methods: {
        showProperty: function(name)
        {
            return !this.totalsConfig || this.totalsConfig.indexOf(name) >= 0 || this.totalsConfig.indexOf("all") >= 0;
        }
    }
});
