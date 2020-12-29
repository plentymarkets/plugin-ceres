import Vue from "vue";
import NotificationService from "./app/services/NotificationService";
import { createApp } from "./app";

// client-specific bootstrapping logic...

const { app } = createApp({
    template: "#ssr-script-container"
});

app.$mount("#vue-app", true);

window.vueApp = app;
window.Vue = Vue;
window.NotificationService = NotificationService;
