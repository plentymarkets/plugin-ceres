import Vue from "vue";
import Vuex from "vuex";

import ApiService from "../services/ApiService";

import address from "./modules/AddressModule";
import basket from "./modules/BasketModule";
import checkout from "./modules/CheckoutModule";
import consents from "./modules/ConsentModule";
import contactForm from "./modules/ContactFormModule";
import itemList from "./modules/ItemListModule";
import itemSearch from "./modules/ItemSearchModule";
import lastSeen from "./modules/LastSeenModule";
import lazyComponent from "./modules/LazyComponentModule";
import liveShopping from "./modules/LiveShoppingModule";
import localization from "./modules/LocalizationModule";
import navigation from "./modules/NavigationModule";
import orderReturn from "./modules/OrderReturnModule";
import user from "./modules/UserModule";
import wishList from "./modules/WishListModule";
import items from "./modules/singleItem/BaseItemModule";

import eventPropagation from "./plugins/EventPropagationPlugin";
import { isDefined } from "../helper/utils";
import { getUrlParams } from "../services/UrlService";
import TranslationService from "../services/TranslationService";
import NotificationService from "../services/NotificationService";

export let store;

// TODO: add code comment
export function createStore()
{
    // =========================
    // init vuex store
    // =========================

    Vue.options.delimiters = ["${", "}"];
    Vue.use(Vuex);

    // eslint-disable-next-line
    store = new Vuex.Store(
        {
            modules:
            {
                address,
                basket,
                checkout,
                consents,
                contactForm,
                itemList,
                items,
                itemSearch,
                lastSeen,
                lazyComponent,
                liveShopping,
                localization,
                navigation,
                orderReturn,
                user,
                wishList
            },

            plugins: !App.isSSR ? [eventPropagation] : []
        });

    return store;
}

// TODO: add code comment
export function initServerStore(store)
{
    store.commit("setShippingCountries", App.initialData.shippingCountries);
    store.commit("setShippingCountryId", App.initialData.shippingCountryId);
    store.commit("setShowNetPrices", App.initialData.showNetPrices);
}

// TODO: add code comment
export function initClientListeners(store)
{
    ApiService.listen("LocalizationChanged", data =>
    {
        store.commit("setShippingCountries", data.localization.activeShippingCountries);
        store.commit("setShippingCountryId", data.localization.currentShippingCountryId);
    });

    ApiService.listen("AfterBasketChanged", data =>
    {
        store.commit("setBasket", data.basket);
        store.commit("setShowNetPrices", data.showNetPrices);
        store.commit("updateBasketItems", data.basketItems);
        store.commit("setWishListIds", data.basket.itemWishListIds);
    });

    ApiService.listen("AfterBasketItemAdd", data =>
    {
        store.commit("addBasketItem", data.basketItems);
    });

    ApiService.listen("AfterBasketItemUpdate", data =>
    {
        store.commit("updateBasketItem", data.basketItems[0]);
    });

    ApiService.after(() =>
    {
        // unset flag that indicates a basket item quantity update after each request.
        store.commit("setIsBasketItemQuantityUpdate", false);
    });

    /**
     * Adds login/logout event listeners
     */
    ApiService.listen("AfterAccountAuthentication", userData =>
    {
        store.commit("setUserData", userData.accountContact);
    });
    ApiService.listen("AfterAccountContactLogout", () =>
    {
        store.commit("setUserData", null);
    });
}

// TODO: add code comment
export function initClientStore(store)
{
    store.commit("initConsents");

    // Use DOMContentLoaded to load session data after app has been initialized
    document.addEventListener("DOMContentLoaded", () =>
    {
        const urlParams = getUrlParams();

        if (store.getters.currentItemVariation)
        {
            urlParams.lastSeenVariationId = store.getters.currentItemVariation.variation.id;
        }

        ApiService.get("/rest/io/session", urlParams, { cache: false, keepOriginalResponse: true })
            .done(response =>
            {
                if (isDefined(response.data.customer))
                {
                    store.commit("setUserData", response.data.customer);
                }

                if (!response.events.hasOwnProperty("AfterBasketChanged"))
                {
                    // only set basket if not change event is emitted. In this case, the basket will be set by the event listener.
                    store.commit("setBasket", response.data.basket);
                    store.commit("setWishListIds", response.data.basket.itemWishListIds);
                }

                store.commit("setIsBasketInitiallyLoaded");
                store.commit("setBasketItems", response.data.basketItems);
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
    });
}

export default { createStore, initServerStore, initClientListeners, initClientStore, store };
