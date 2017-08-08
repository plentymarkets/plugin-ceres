import test from "store/modules/test";

// eslint-disable-next-line
const store = new Vuex.Store(
    {
        modules:
        {
            test
        }
    });

window.vuexStore = store;

export default store;
