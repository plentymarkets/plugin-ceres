import test from "store/modules/test";
import WishList from "store/modules/WishListModule";

// eslint-disable-next-line
const store = new Vuex.Store(
    {
        modules:
        {
            test,
            WishList
        }
    });

window.ceresStore = store;

export default store;
