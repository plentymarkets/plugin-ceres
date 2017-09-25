import wishList from "store/modules/WishListModule";
import checkout from "store/modules/CheckoutModule";
import address from "store/modules/AddressModule";
import localization from "store/modules/LocalizationModule";

// eslint-disable-next-line
const store = new Vuex.Store(
    {
        modules:
        {
            wishList,
            checkout,
            address,
            localization
        }
    });

window.ceresStore = store;

export default store;
