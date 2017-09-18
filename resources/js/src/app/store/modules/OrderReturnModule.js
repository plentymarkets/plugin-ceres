import ApiService from "services/ApiService";

const state =
    {
        orderData: {},
        orderReturnItems: {}
    };

const mutations =
    {
        setOrderReturnData(state, orderData)
		{
            state.orderData = orderData;
        },

        updateOrderReturnItems(state, {orderItemQuantity, orderItem})
		{
            if (orderItemQuantity <= orderItem.quantity)
			{
                if (orderItemQuantity != 0)
				{
                    state.orderReturnItems[orderItem.itemVariationId] = orderItemQuantity;
                }
                else
				{
                    delete state.orderReturnItems[orderItem.itemVariationId];
                }
            }
        }
    };

const actions =
    {
        sendOrderReturn({state})
		{
            return new Promise((resolve, reject) =>
            {
                if (!$.isEmptyObject(state.orderReturnItems))
                {
                    ApiService.post("/rest/io/order/return", {orderId: state.orderData.order.id, variationIds: state.orderReturnItems})
                        .done(data =>
                        {
                            resolve();
                        })
                        .fail(() =>
                        {
                            reject();
                        });
                }
                else
                {
                    resolve();
                }
            });
        }
    };

const getters =
    {
        getOrderItemImage: state => orderItemId => state.orderData.itemImages[orderItemId],

        getOrderItemURL: state => orderItemId => state.orderData.itemURLs[orderItemId]
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
