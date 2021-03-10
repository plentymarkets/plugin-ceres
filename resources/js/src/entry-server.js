import { createApp as createAppInternal } from "./app";
import Vue from "vue";
import { initServerStore } from "./app/store";

const globals = { Vue };

function createApp(context)
{
    return new Promise((resolve, reject) =>
    {
        Vue.config.silent = true;
        Vue.prototype.$isSSR = true;

        const { app, store } = createAppInternal(context);

        initServerStore(store);

        resolve(app);
    });
}

export { createApp, globals };
