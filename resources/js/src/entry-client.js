import Vue from "vue";
import NotificationService from "./app/services/NotificationService";
import { createApp } from "./app";

// client-specific bootstrapping logic...

const { app } = createApp({
    template: "#ssr-script-container"
});

app.$mount("#vue-app", true);

import "bootstrap";
import "owl.carousel";

import jQuery from "jquery";
window.jQuery = jQuery;
window.$ = jQuery;

import "./app/main";

window.vueApp = app;
window.Vue = Vue;
window.NotificationService = NotificationService;
