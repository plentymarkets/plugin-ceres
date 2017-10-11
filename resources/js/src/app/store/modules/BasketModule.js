import ApiService from "services/ApiService";

const state =
    {
        data: {},
        items: [],
        latestEntry: {
            item: {},
            quantity: null
        }
    };

const mutations =
    {
        setBasket(state, basket)
        {
            if (state.data.id && JSON.stringify(basket) !== JSON.stringify(state.data))
            {
                document.dispatchEvent(new CustomEvent("afterBasketChanged", {detail: basket}));
            }

            state.data = basket;
        },

        setBasketItems(state, basketItems)
        {
            state.items = basketItems;
        },

        addBasketItem(state, basketItem)
        {
            const basketItemIndex = state.items.findIndex(item => basketItem.id === item.id);

            if (basketItemIndex !== -1)
            {
                state.items.splice(basketItemIndex, 1);
                state.items.splice(basketItemIndex, 0, basketItem);
            }
            else
            {
                state.items.push(basketItem);
            }
        },

        updateBasketItemQuantity(state, {basketItem, quantity})
        {
            const item = state.items.find(item => basketItem.id === item.id);

            item.quantity = quantity;
        },

        removeBasketItem(state, basketItemId)
        {
            state.items = state.items.filter(item => item.id !== basketItemId);
        },

        setLatestBasketEntry(state, latestBasketEntry)
        {
            state.latestEntry = latestBasketEntry;
        },

        setCouponCode(state, couponCode)
        {
            state.data.couponCode = couponCode;
        }
    };

const actions =
    {
        addBasketItem({commit}, basketItem)
        {
            return new Promise((resolve, reject) =>
            {
                basketItem.template = "Ceres::Basket.Basket";
                ApiService.post("/rest/io/basket/items/", basketItem)
                    .done(basketItems =>
                    {
                        commit("setBasketItems", basketItems);
                        resolve(basketItems);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
            });
        },

        updateBasketItemQuantity({commit}, {basketItem, quantity})
        {
            return new Promise((resolve, reject) =>
            {
                commit("updateBasketItemQuantity", {basketItem, quantity});

                basketItem.template = "Ceres::Basket.Basket";
                ApiService.put("/rest/io/basket/items/" + basketItem.id, basketItem)
                    .done(data =>
                    {
                        resolve(data);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
            });
        },

        removeBasketItem({commit}, basketItemId)
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.delete("/rest/io/basket/items/" + basketItemId, {template: "Ceres::Basket.Basket"})
                    .done(basketItems =>
                    {
                        commit("setBasketItems", basketItems);
                        resolve(basketItems);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
            });
        },

        redeemCouponCode({state, commit}, couponCode)
        {
            return new Promise((resolve, reject) =>
            {
                commit("setCouponCode", couponCode);

                ApiService.post("/rest/io/coupon", {couponCode})
                    .done(data =>
                    {
                        resolve(data);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
            });
        },

        removeCouponCode({state, commit}, couponCode)
        {
            return new Promise((resolve, reject) =>
            {
                commit("setCouponCode", null);

                ApiService.delete("/rest/io/coupon/" + couponCode)
                    .done(response =>
                    {
                        resolve(data);
                    })
                    .fail(error =>
                    {
                        reject(error);
                    });
            });
        }
    };

export default
{
    state,
    mutations,
    actions
};
