import "./app/publicPath";
import Vue from "vue";
import NotificationService from "./app/services/NotificationService";
import "bootstrap";
import "owl.carousel";
import jQuery from "jquery";
import { createApp } from "./app";
import { initClientListeners, initClientStore } from "./app/store";
import { initListener } from "./app/services/ApiService";
import { mount } from "./mount";

Vue.prototype.$mount = mount;
Vue.prototype.$isSSR = false;

window.createApp = (selector) => {
    // client-specific bootstrapping logic...
    const { app, store } = createApp({
        template: "#ssr-script-container"
    });

    if (window.__INITIAL_STATE__)
    {
        store.replaceState(window.__INITIAL_STATE__);
    }

    window.ceresStore = store;

    initListener();
    initClientListeners(store);

    if (store.state.items[store.state.items.mainItemId])
    {
        store.dispatch("registerItem", store.state.items[store.state.items.mainItemId].variation.documents[0]);
    }

    window.dispatchEvent(new CustomEvent("ceresBeforeMount", { store, app }));

    app.$mount(selector, true);
    window.vueApp = app;

    initClientStore(store);
};

window.jQuery = jQuery;
window.$ = jQuery;
window.Vue = Vue;
window.NotificationService = NotificationService;

import "./app/main";
