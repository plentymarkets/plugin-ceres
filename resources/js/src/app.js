import Vue from "vue";
// import Vuex from "vuex";
// import Notifications from "./app/components/pageDesign/Notifications.vue";
// import UserLoginHandler from "./app/components/customer/login/UserLoginHandler.vue";
// import LazyImg from "./app/components/common/LazyImg.vue";
// import CookieBar from "./app/components/pageDesign/CookieBar.vue";
// import MobileNavigation from "./app/components/pageDesign/MobileNavigation.vue";
// import LoadingAnimation from "./app/components/pageDesign/LoadingAnimation.vue";
import TestApp from "./app/TestApp.vue";
Vue.component("test-app", TestApp);

export function createApp(options)
{
    // Vue.use(Vuex);
    // Vue.component("notifications", Notifications);
    // Vue.component("user-login-handler", UserLoginHandler);
    // Vue.component("lazy-img", LazyImg);
    // Vue.component("cookie-bar", CookieBar);
    // Vue.component("mobile-navigation", MobileNavigation);
    // Vue.component("loading-animation", LoadingAnimation);

    /*

    const defaultOptions = {
        store: new Vuex.Store({
            modules: {
                basket: {
                    state: {
                        data: {},
                        items: [],
                        showNetPrices: false,
                        isBasketLoading: false,
                        isBasketInitiallyLoaded: false,
                        isBasketItemQuantityUpdate: false,
                        basketNotifications: []
                    }
                }
            }
        })
    };
     */

    const app = new Vue(options);

    return { app };
}
