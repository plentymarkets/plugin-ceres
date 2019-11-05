import TranslationService from "../../services/TranslationService";
import { navigateTo } from "../../services/UrlService";
import { pathnameEquals } from "../../helper/url";
import { isNullOrUndefined } from "../../helper/utils";
const NotificationService = require("../../services/NotificationService");
const ApiService = require("../../services/ApiService");

const state =
    {
        data: {},
        items: [],
        showNetPrices: false,
        isBasketLoading: false,
        isBasketInitiallyLoaded: false,
        isBasketItemQuantityUpdate: false,
        basketNotifications: []
    };

const mutations =
    {
        setBasket(state, basket)
        {
            if (state.data.id && JSON.stringify(basket) !== JSON.stringify(state.data))
            {
                document.dispatchEvent(new CustomEvent("afterBasketChanged", { detail: basket }));
            }

            state.data = basket;
        },

        setBasketItems(state, basketItems)
        {
            state.items = basketItems;
        },

        updateBasketItems(state, basketItems)
        {
            if (basketItems)
            {
                const newItems = [];

                for (const item of basketItems)
                {
                    if (isNullOrUndefined(item.variation))
                    {
                        item.variation = state.items.find(i => i.id === item.id).variation;
                    }
                    newItems.push(item);
                }

                state.items = newItems;
            }
        },

        addBasketItem(state, basketItems)
        {
            for (let i = 0; i < basketItems.length; i++)
            {
                const basketItem = basketItems[i];
                const basketItemIndex = state.items.findIndex(item => basketItem.id === item.id);

                if (basketItemIndex !== -1)
                {
                    state.items.splice(basketItemIndex, 1, basketItem);
                }
                else
                {
                    state.items.push(basketItem);
                }
            }
        },

        updateBasketItem(state, basketItem)
        {
            const entry = state.items.find(item => item.id === basketItem.id);

            if (!isNullOrUndefined(entry))
            {
                entry.price = basketItem.price;
                entry.quantity = basketItem.quantity;
            }
        },

        addBasketNotification(state, { type, message })
        {
            state.basketNotifications.push({ type: type, message: message });
        },

        clearOldestNotification(state)
        {
            state.basketNotifications.splice(0, 1);
        },

        updateBasketItemQuantity(state, basketItem)
        {
            const item = state.items.find(item => basketItem.id === item.id);

            item.quantity = basketItem.quantity;
        },

        setIsBasketItemQuantityUpdate(state, isBasketItemQuantityUpdate)
        {
            state.isBasketItemQuantityUpdate = isBasketItemQuantityUpdate;
        },

        removeBasketItem(state, basketItemId)
        {
            state.items = state.items.filter(item => item.id !== basketItemId);
        },

        setCouponCode(state, couponCode)
        {
            state.data.couponCode = couponCode;
        },

        setIsBasketLoading(state, isBasketLoading)
        {
            state.isBasketLoading = !!isBasketLoading;
        },

        setIsBasketInitiallyLoaded(state)
        {
            state.isBasketInitiallyLoaded = true;
        },

        setShowNetPrices(state, showNetPrices)
        {
            state.showNetPrices = showNetPrices;
        }
    };

const actions =
    {
        loadBasketData({ state, commit })
        {
            if ( !state.isBasketInitiallyLoaded )
            {
                jQuery
                    .when(
                        ApiService.get("/rest/io/basket", {}, { cache: false }),
                        ApiService.get("/rest/io/basket/items", { template: "Ceres::Basket.Basket" }, { cache: false })
                    )
                    .then((basket, basketItems) =>
                    {
                        commit("setBasket", basket);
                        commit("setBasketItems", basketItems);
                        commit("setIsBasketInitiallyLoaded");
                        commit("setWishListIds", basket.itemWishListIds);
                    })
                    .catch((error, status) =>
                    {
                        console.log(error, status);

                        if (status > 0)
                        {
                            NotificationService.error(
                                TranslationService.translate("Ceres::Template.basketOops")
                            ).closeAfter(10000);
                        }
                    });
            }

            ApiService.listen("AfterBasketChanged", data =>
            {
                commit("setBasket", data.basket);
                commit("setShowNetPrices", data.showNetPrices);
                commit("updateBasketItems", data.basketItems);
                commit("setWishListIds", data.basket.itemWishListIds);
            });

            ApiService.listen("AfterBasketItemAdd", data =>
            {
                commit("addBasketItem", data.basketItems);
            });

            ApiService.listen("AfterBasketItemUpdate", data =>
            {
                commit("updateBasketItem", data.basketItems);
            });

            ApiService.after(() =>
            {
                commit("setIsBasketItemQuantityUpdate", false);
            });
        },

        addBasketNotification({ commit }, { type, message })
        {
            commit("addBasketNotification", { type, message });

            setTimeout(() =>
            {
                commit("clearOldestNotification");
            }, 5000);
        },

        addBasketItem({ commit }, basketItem)
        {
            return new Promise((resolve, reject) =>
            {
                commit("setIsBasketLoading", true);

                basketItem.template = "Ceres::Basket.Basket";
                ApiService.post("/rest/io/basket/items/", basketItem)
                    .done(response =>
                    {
                        commit("setIsBasketLoading", false);
                        resolve(response);
                    })
                    .fail(error =>
                    {
                        commit("setIsBasketLoading", false);
                        reject(error);
                    });
            });
        },

        updateBasketItemQuantity({ commit }, basketItem)
        {
            return new Promise((resolve, reject) =>
            {
                commit("updateBasketItemQuantity", basketItem);
                commit("setIsBasketItemQuantityUpdate", true);
                commit("setIsBasketLoading", true);

                basketItem.template = "Ceres::Basket.Basket";
                ApiService.put("/rest/io/basket/items/" + basketItem.id, basketItem)
                    .done(response =>
                    {
                        commit("setIsBasketLoading", false);
                        resolve(response);
                    })
                    .fail(error =>
                    {
                        commit("setIsBasketLoading", false);
                        reject(error);
                    });
            });
        },

        removeBasketItem({ state, commit }, basketItemId)
        {
            return new Promise((resolve, reject) =>
            {
                commit("setIsBasketLoading", true);

                ApiService.del("/rest/io/basket/items/" + basketItemId, { template: "Ceres::Basket.Basket" })
                    .done(response =>
                    {
                        commit("setIsBasketLoading", false);
                        commit("removeBasketItem", basketItemId);
                        resolve(response);

                        if (pathnameEquals(App.urls.checkout) && state.items.length === 0)
                        {
                            navigateTo(App.urls.basket);
                        }
                    })
                    .fail(error =>
                    {
                        commit("setIsBasketLoading", false);
                        reject(error);
                    });
            });
        },

        redeemCouponCode({ state, commit }, couponCode)
        {
            return new Promise((resolve, reject) =>
            {
                commit("setIsBasketLoading", true);

                ApiService.post("/rest/io/coupon", { couponCode }, { supressNotifications: true })
                    .done(data =>
                    {
                        commit("setCouponCode", couponCode);
                        commit("setIsBasketLoading", false);
                        resolve(data);
                    })
                    .fail(error =>
                    {
                        commit("setIsBasketLoading", false);
                        reject(error);
                    });
            });
        },

        removeCouponCode({ state, commit }, couponCode)
        {
            return new Promise((resolve, reject) =>
            {
                commit("setIsBasketLoading", true);

                ApiService.del("/rest/io/coupon/" + couponCode)
                    .done(data =>
                    {
                        commit("setCouponCode", null);
                        commit("setIsBasketLoading", false);
                        resolve(data);
                    })
                    .fail(error =>
                    {
                        commit("setIsBasketLoading", false);
                        reject(error);
                    });
            });
        },

        refreshBasket({ commit })
        {
            return new Promise((resolve, reject) =>
            {
                ApiService.get("/rest/io/basket/")
                    .done(basket =>
                    {
                        commit("setBasket", basket);
                        resolve(basket);
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
