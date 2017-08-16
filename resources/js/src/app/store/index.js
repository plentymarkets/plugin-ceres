import wishList from "store/modules/WishListModule";

// eslint-disable-next-line
const store = new Vuex.Store(
    {
        modules:
        {
            wishList
        }
    });

window.ceresStore = store;

export default store;
