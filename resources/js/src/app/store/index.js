import address from "store/modules/AddressModule";
import basket from "store/modules/BasketModule";
import checkout from "store/modules/CheckoutModule";
import contactForm from "store/modules/ContactForm";
import item from "store/modules/SingleItemModule";
import itemList from "store/modules/ItemListModule";
import lastSeen from "store/modules/LastSeenModule";
import liveShopping from "store/modules/LiveShoppingModule";
import localization from "store/modules/LocalizationModule";
import navigation from "store/modules/NavigationModule";
import orderReturn from "store/modules/OrderReturnModule";
import user from "store/modules/UserModule";
import variationSelect from "store/modules/VariationSelectModule";
import wishList from "store/modules/WishListModule";

import eventPropagation from "store/plugins/EventPropagationPlugin";

Vue.use(require("vue-script2"));
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
