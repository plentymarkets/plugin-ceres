import test from "store/modules/test";
import wishList from "store/modules/WishListModule";

// eslint-disable-next-line
const store = new Vuex.Store(
    {
        modules:
        {
            test,
            wishList
        }
    });

window.ceresStore = store;

export default store;
