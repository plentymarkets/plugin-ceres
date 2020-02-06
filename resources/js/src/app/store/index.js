import Vue from "vue";
import Vuex from "vuex";

import ApiService from "../services/ApiService";

import address from "./modules/AddressModule";
import basket from "./modules/BasketModule";
import checkout from "./modules/CheckoutModule";
import consents from "./modules/ConsentModule";
import contactForm from "./modules/ContactFormModule";
import item from "./modules/SingleItemModule";
import itemList from "./modules/ItemListModule";
import itemSearch from "./modules/ItemSearchModule";
import lastSeen from "./modules/LastSeenModule";
import lazyComponent from "./modules/LazyComponentModule";
import liveShopping from "./modules/LiveShoppingModule";
import localization from "./modules/LocalizationModule";
import navigation from "./modules/NavigationModule";
import orderReturn from "./modules/OrderReturnModule";
import user from "./modules/UserModule";
import variationSelect from "./modules/VariationSelectModule";
import wishList from "./modules/WishListModule";

import eventPropagation from "./plugins/EventPropagationPlugin";


// =========================
// init vuex store
// =========================

Vue.options.delimiters = ["${", "}"];
Vue.use(Vuex);

// eslint-disable-next-line
const store = new Vuex.Store(
    {
        modules:
        {
            address,
            basket,
            checkout,
            consents,
            contactForm,
            item,
            itemList,
            itemSearch,
            lastSeen,
            lazyComponent,
            liveShopping,
            localization,
            navigation,
            orderReturn,
            user,
            variationSelect,
            wishList
        },

        plugins: [eventPropagation]
    });

// =========================
// Fill initial vuex data
// =========================

App.initialData.shippingCountries.sort((first, second) =>
{
    if (first.currLangName < second.currLangName)
    {
        return -1;
    }
    if (first.currLangName > second.currLangName)
    {
        return 1;
    }
    return 0;
});

store.commit("setShippingCountries", App.initialData.shippingCountries);
store.commit("setShippingCountryId", App.initialData.shippingCountryId);
store.commit("initConsents");

ApiService.listen("LocalizationChanged",
    data =>
    {
        store.commit("setShippingCountries", data.localization.activeShippingCountries);
        store.commit("setShippingCountryId", data.localization.currentShippingCountryId);
    });


window.ceresStore = store;

ApiService.listen("AfterBasketChanged",
    data =>
    {
        store.commit("setBasket", data.basket);
        store.commit("setShowNetPrices", data.showNetPrices);
        store.commit("setWishListIds", data.basket.itemWishListIds);
    });

store.dispatch("loadBasketData");

export default store;
