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
    ApiService.listen("LocalizationChanged",
        data =>
        {
            store.commit("setShippingCountries", data.localization.activeShippingCountries);
            store.commit("setShippingCountryId", data.localization.currentShippingCountryId);
        });

    ApiService.listen("AfterBasketChanged",
        data =>
        {
            store.commit("setBasket", data.basket);
            store.commit("setShowNetPrices", data.showNetPrices);
            store.commit("setWishListIds", data.basket.itemWishListIds);
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
    store.dispatch("loadBasketData");
    /**
     * Loads user data after pageload
     */
    ApiService.get("/rest/io/customer", {}, { keepOriginalResponse: true })
        .done(response =>
        {
            if (isDefined(response.data))
            {
                store.commit("setUserData", response.data);
            }
        });
}

export default { createStore, initServerStore, initClientListeners, initClientStore, store };
