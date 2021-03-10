import "./app/publicPath";
import Vue from "vue";
import NotificationService from "./app/services/NotificationService";
import "bootstrap";
import "owl.carousel";
import jQuery from "jquery";
import { createApp } from "./app";
import { initClientListeners, initClientStore } from "./app/store";
import { initListener } from "./app/services/ApiService";


function onReady(ready) {
    if(document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(ready, 1);
    } else {
        document.addEventListener("DOMContentLoaded", ready);
    }
}

onReady(() => {
    // client-specific bootstrapping logic...
    const { app, store } = createApp({
        template: "#ssr-script-container"
    });

    if (window.__INITIAL_STATE__)
    {
        store.replaceState(window.__INITIAL_STATE__);
    }

    app.$mount("#vue-app", true);
    window.vueApp = app;

    initListener();

    initClientListeners(store);
    initClientStore(store);
});

window.jQuery = jQuery;
window.$ = jQuery;
window.Vue = Vue;
window.NotificationService = NotificationService;
