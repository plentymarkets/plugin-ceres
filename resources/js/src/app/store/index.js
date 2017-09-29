import wishList from "store/modules/WishListModule";
import checkout from "store/modules/CheckoutModule";
import address from "store/modules/AddressModule";
import localization from "store/modules/LocalizationModule";
import user from "store/modules/UserModule";
import orderReturn from "store/modules/OrderReturnModule";

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
            orderReturn
        }
    });

window.ceresStore = store;

export default store;
