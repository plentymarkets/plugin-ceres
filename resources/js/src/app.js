import Vue from "vue";
import Vuex from "vuex";

import Notifications from "./app/components/pageDesign/Notifications.vue";
import UserLoginHandler from "./app/components/customer/login/UserLoginHandler.vue";
import LazyImg from "./app/components/common/LazyImg.vue";
import CookieBar from "./app/components/pageDesign/CookieBar.vue";
import MobileNavigation from "./app/components/pageDesign/MobileNavigation.vue";
import LoadingAnimation from "./app/components/pageDesign/LoadingAnimation.vue";
import ReCaptcha from "./app/components/customer/ReCaptcha.vue";
import WishListCount from "./app/components/wishList/WishListCount.vue";
import Icon from "./app/components/pageDesign/Icon.vue";
import TestApp from "./app/TestApp.vue";
import LazyLoad from "./app/components/common/LazyLoad.vue";
import ItemSearch from "./app/components/itemList/ItemSearch.vue";
import ShippingCountrySelect from "./app/components/pageDesign/ShippingCountrySelect.vue";
import PrivacySettings from "./app/components/pageDesign/PrivacySettings.vue";
import BasketPreview from "./app/components/basket/BasketPreview.vue";
import BasketTotals from "./app/components/basket/BasketTotals.vue";
import BasketList from "./app/components/basket/list/BasketList.vue";
import Intersect from "./app/components/common/Intersect.vue";
import Carousel from "./app/components/pageDesign/Carousel.vue";
import CategoryItem from "./app/components/itemList/CategoryItem.vue";
import AddToBasket from "./app/components/basket/AddToBasket.vue";


import consents from "./app/store/modules/ConsentModule";
import navigation from "./app/store/modules/NavigationModule";
import user from "./app/store/modules/UserModule";
import lazyComponent from "./app/store/modules/LazyComponentModule";
import wishList from "./app/store/modules/WishListModule";
import itemList from "./app/store/modules/ItemListModule";
import itemSearch from "./app/store/modules/ItemSearchModule";
import localization from "./app/store/modules/LocalizationModule";


import TranslationService from "./app/services/TranslationService";

import "./app/directives/basket/basketItemQuantity";
import "./app/directives/basket/basketItemSum";
import "./app/directives/basket/toggleBasketPreview";
import "./app/directives/navigation/openMobileNavigation";
import "./app/directives/pageDesign/scrollToTop";
import "./app/directives/helper/waitingAnimationInfinite";

import "./app/filters/ageRestriction.filter";
import "./app/filters/arrayFirst.filter";
import "./app/filters/attachText.filter";
import "./app/filters/currency.filter";
import "./app/filters/date.filter";
import "./app/filters/fileName.filter";
import "./app/filters/fileUploadPath.filter";
import "./app/filters/graduatedPrice.filter";
import "./app/filters/hasItemDefaultPrice.filter";
import "./app/filters/inputUnit.filter";
import "./app/filters/itemBundleName.filter";
import "./app/filters/itemCrossPrice.filter";
import "./app/filters/itemImage.filter";
import "./app/filters/itemImageAlternativeText.filter";
import "./app/filters/itemImages.filter";
import "./app/filters/itemName.filter";
import "./app/filters/itemPrice.filter";
import "./app/filters/itemUrl.filter";
import "./app/filters/numberFormat.filter";
import "./app/filters/propertySurcharge.filter";
import "./app/filters/propertyFileUrl.filter";
import "./app/filters/translate.filter";
import "./app/filters/truncate.filter";

Vue.component("test-app", TestApp);

export function createApp(options)
{
    Vue.use(Vuex);
    Vue.component("notifications", Notifications);
    Vue.component("user-login-handler", UserLoginHandler);
    Vue.component("lazy-img", LazyImg);
    Vue.component("cookie-bar", CookieBar);
    Vue.component("privacy-settings", PrivacySettings);
    Vue.component("mobile-navigation", MobileNavigation);
    Vue.component("loading-animation", LoadingAnimation);
    Vue.component("recaptcha", ReCaptcha);
    Vue.component("wish-list-count", WishListCount);
    Vue.component("icon", Icon);
    Vue.component("lazy-load", LazyLoad);
    Vue.component("item-search", ItemSearch);
    Vue.component("shipping-country-select", ShippingCountrySelect);
    Vue.component("basket-preview", BasketPreview);
    Vue.component("basket-totals", BasketTotals);
    Vue.component("basket-list", BasketList);
    Vue.component("intersect", Intersect);
    Vue.component("carousel", Carousel);
    Vue.component("category-item", CategoryItem);
    Vue.component("add-to-basket", AddToBasket);

    window.ceresTranslate = TranslationService.translate;

    Vue.prototype.$translate = TranslationService.translate;
    Vue.prototype.$ceres = App;

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
                },
                navigation,
                consents,
                user,
                wishList,
                itemList,
                itemSearch,
                localization,
                lazyComponent
            }
        }),
        ...options
    };


    const app = new Vue(defaultOptions);

    return { app };
}
