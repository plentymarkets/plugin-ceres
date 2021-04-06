import ExceptionMap from "../../exceptions/ExceptionMap";

const ApiService = require("../../services/ApiService");
const NotificationService = require("../../services/NotificationService");

const state = () => ({
    orderData: {},
    orderAccessKey: "",
    orderReturnItems: [],
    orderReturnNote: ""
});

const mutations =
    {
        setOrderReturnData(state, orderData)
        {
            orderData.order.orderItems = orderData.order.orderItems.filter(orderItem => orderItem.quantity !== 0);

            state.orderData = orderData;
        },

        setOrderAccessKey(state, orderAccessKey)
        {
            state.orderAccessKey = orderAccessKey;
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

                    ApiService.post("/rest/io/order/return", { orderId: state.orderData.order.id, orderAccessKey: state.orderAccessKey, variationIds, returnNote: state.orderReturnNote })
                        .done(data =>
                        {
                            resolve(data);
                        })
                        .fail(error =>
                        {
                            if (error.data)
                            {
                                NotificationService.error(
                                    this.$translate(
                                        "Ceres::Template." + ExceptionMap.get(error.data.exceptionCode.toString()),
                                        error.data.placeholder
                                    )
                                ).closeAfter(5000);
                            }
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

        getOrderItemURL: state => orderItemId => state.orderData.itemURLs[orderItemId],

        getOrderItemVariation: state => orderItemId => state.orderData.variations[orderItemId]
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
