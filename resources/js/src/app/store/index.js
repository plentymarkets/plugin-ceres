import Vue from "vue";
import Vuex from "vuex";

import address from "./modules/AddressModule";
import basket from "./modules/BasketModule";
import checkout from "./modules/CheckoutModule";
import contactForm from "./modules/ContactForm";
import item from "./modules/SingleItemModule";
import itemList from "./modules/ItemListModule";
import lastSeen from "./modules/LastSeenModule";
import liveShopping from "./modules/LiveShoppingModule";
import localization from "./modules/LocalizationModule";
import navigation from "./modules/NavigationModule";
import orderReturn from "./modules/OrderReturnModule";
import user from "./modules/UserModule";
import variationSelect from "./modules/VariationSelectModule";
import wishList from "./modules/WishListModule";

import eventPropagation from "./plugins/EventPropagationPlugin";

Vue.use(require("vue-script2"));
Vue.use(Vuex);
Vue.options.delimiters = ["${", "}"];

// eslint-disable-next-line
const store = new Vuex.Store(
    {
        modules:
        {
            address,
            basket,
            checkout,
            contactForm,
            item,
            itemList,
            lastSeen,
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

window.ceresStore = store;

export default store;
