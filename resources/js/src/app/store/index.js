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

Vue.use(require("vue-script2"));

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
            orderReturn
        }
    });

window.ceresStore = store;

export default store;
