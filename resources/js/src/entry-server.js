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
        if(process.env.NODE_ENV === "production") {
            Vue.config.errorHandler = (err, vm, info) => {
                context.throwError({
                    message: `Error in ${ info }: "${ err.toString() }"`,
                    stack: err.stack
                });
            }
        } else {
            Vue.config.warnHandler = (msg, vm, trace) => {
                context.throwError({
                    message: msg,
                    stack: trace.trim()
                });
            }
        }
        // defines if the render location is the server
        App.isSSR = true;
        App.isSSREnabled = App.config.log.performanceSsr;

        const { app, store } = createAppInternal(context);

        initServerStore(store);

        resolve(app);
    });
}

export { createApp, globals };
