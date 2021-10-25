import Vue from "vue";

Vue.directive("open-mobile-navigation",
    {
        bind(el)
        {
            el.onclick = () => ceresStore.commit("setIsMobileNavigationOpen", true);
        }
    });
