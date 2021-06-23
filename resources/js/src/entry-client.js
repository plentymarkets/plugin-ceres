import "./app/publicPath";
import Vue from "vue";
import Vuex from "vuex";
import NotificationService from "./app/services/NotificationService";
import TranslationService from "./app/services/TranslationService";
import "bootstrap";
import "owl.carousel";
import { createApp } from "./app";
import { initClientListeners, initClientStore, createStore } from "./app/store";
import { initListener } from "./app/services/ApiService";
import { mount } from "./mount";
import "./app/jQuery";

Vue.prototype.$mount = mount;

// defines if the render location is the client
App.isSSR = false;
App.isSSREnabled = App.config.log.performanceSsr;

window.createApp = (selector) =>
{
    // client-specific bootstrapping logic...
    const app = createApp({
        template: "#ssr-script-container"
    }, store);

    app.$mount(selector, true);
    window.vueApp = app;

    initListener();

    initClientListeners(store);
    initClientStore(store);
};

const store = createStore();

if (window.__INITIAL_STATE__)
{
    store.replaceState(window.__INITIAL_STATE__);
}

window.Vue = Vue;
window.Vuex = Vuex;
window.NotificationService = NotificationService;
window.ceresTranslate = TranslationService.translate;
window.vueEventHub = new Vue();
window.ceresStore = store;

import "./app/main";
