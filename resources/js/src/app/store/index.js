const NotificationService = require("services/NotificationService");
const cloneDeep = require("lodash/cloneDeep");

import wishList from "store/modules/WishListModule";
import checkout from "store/modules/CheckoutModule";
import address from "store/modules/AddressModule";
import localization from "store/modules/LocalizationModule";
import user from "store/modules/UserModule";
import navigation from "store/modules/NavigationModule";
import itemList from "store/modules/ItemListModule";
import item from "store/modules/SingleItemModule";
import basket from "store/modules/BasketModule";
import orderReturn from "store/modules/OrderReturnModule";
import lastSeen from "store/modules/LastSeenModule";

Vue.use(require("vue-script2"));

const eventPropagation = store =>
{
    let oldState = cloneDeep(store.state);

    store.subscribe((mutation, state) =>
    {
        const eventName = "on" + mutation.type.charAt(0).toUpperCase() + mutation.type.substr(1);
        const event = new CustomEvent(eventName, {detail: {payload: mutation.payload, newState: state, oldState}});

        document.dispatchEvent(event);

        NotificationService.log("event: ", eventName, " - payload: ", mutation.payload);

        oldState = cloneDeep(state);
    });
};

// eslint-disable-next-line
const store = new Vuex.Store(
    {
        modules:
        {
            wishList,
            checkout,
            address,
            localization,
            user,
            navigation,
            itemList,
            item,
            basket,
            orderReturn,
            lastSeen
        },

        plugins: [eventPropagation]
    });

window.ceresStore = store;

export default store;
