import ApiService from "services/ApiService";

const state =
    {
        orderData: {},
        orderReturnItems: [],
        orderReturnNote: ""
    };

const mutations =
    {
        setOrderReturnData(state, orderData)
        {
            orderData.order.orderItems = orderData.order.orderItems.filter(orderItem => orderItem.quantity !== 0);

            state.orderData = orderData;
        },

        updateOrderReturnItems(state, { quantity, orderItem })
        {
            if (quantity <= orderItem.quantity)
            {
                const orderItemIndex = state.orderReturnItems.findIndex(entry => entry.orderItem.itemVariationId === orderItem.itemVariationId);

                if (quantity !== 0)
                {
                    if (orderItemIndex === -1)
                    {
                        state.orderReturnItems.push({ quantity, orderItem });
                    }
                    else
                    {
                        state.orderReturnItems.splice(orderItemIndex, 1);
                        state.orderReturnItems.splice(orderItemIndex, 0, { quantity, orderItem });
                    }
                }
                else
                {
                    state.orderReturnItems.splice(orderItemIndex, 1);
                }
            }
        },

        updateOrderReturnNote(state, orderReturnNote)
        {
            state.orderReturnNote = orderReturnNote;
        }
    };

const actions =
    {
        sendOrderReturn({ state })
        {
            return new Promise((resolve, reject) =>
            {
                if (state.orderReturnItems.length > 0)
                {
                    const variationIds = {};

                    for (const index in state.orderReturnItems)
                    {
                        variationIds[state.orderReturnItems[index].orderItem.itemVariationId] = state.orderReturnItems[index].quantity;
                    }

                    ApiService.post("/rest/io/order/return", { orderId: state.orderData.order.id, variationIds, returnNote: state.orderReturnNote })
                        .done(data =>
                        {
                            resolve(data);
                        })
                        .fail(error =>
                        {
                            reject(error);
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
