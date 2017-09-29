import wishList from "store/modules/WishListModule";
import orderReturn from "store/modules/OrderReturnModule";

// eslint-disable-next-line
const store = new Vuex.Store(
    {
        modules:
        {
            wishList,
            orderReturn
        }
    });

window.ceresStore = store;

export default store;
