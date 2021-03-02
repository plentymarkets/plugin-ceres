import "./app/publicPath";
import Vue from "vue";
import NotificationService from "./app/services/NotificationService";
import { createApp } from "./app";
import { initClientListeners, initClientStore } from "./app/store";
import { initListener } from "./app/services/ApiService";

// client-specific bootstrapping logic...

const { app, store } = createApp({
    template: "#ssr-script-container"
});

if (window.__INITIAL_STATE__)
{
    store.replaceState(window.__INITIAL_STATE__);
}

app.$mount("#vue-app", true);

import "bootstrap";
import "owl.carousel";

import jQuery from "jquery";
window.jQuery = jQuery;
window.$ = jQuery;

window.vueApp = app;
window.Vue = Vue;
window.NotificationService = NotificationService;

initListener();

initClientListeners(store);
initClientStore(store);
