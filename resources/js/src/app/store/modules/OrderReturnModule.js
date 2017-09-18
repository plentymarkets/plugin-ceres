import ApiService from "services/ApiService";

const state =
    {
        orderData: {},
        orderReturnItems: {},
        orderReturnItemsLength: 0
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

                state.orderReturnItemsLength = Object.keys(state.orderReturnItems).length;
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
                    reject();
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
