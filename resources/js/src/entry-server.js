import { createApp as createAppInternal } from "./app";
import Vue from "vue";
import Vuex from "vuex";
import { initServerStore } from "./app/store";
import { component } from "./mount";

// Override global component function to allow overriding templates
Vue.component = component;

const globals = { Vue, Vuex };

function createApp(context)
{
    return new Promise((resolve, reject) =>
    {
        Vue.prototype.$isSSR = true;

        App.location = "client";
        App.isSSREnabled = App.config.log.performanceSsr;

        const { app, store } = createAppInternal(context);

        initServerStore(store);

        resolve(app);
    });
}

export { createApp, globals };
