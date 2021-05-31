import { createApp as createAppInternal } from "./app";
import Vue from "vue";
import Vuex from "vuex";
import { createStore, initServerStore } from "./app/store";
import { component } from "./mount";

// Override global component function to allow overriding templates
Vue.component = component;

const globals = { Vue, Vuex };

function createApp(context)
{
    return new Promise((resolve, reject) =>
    {
        // defines if the render location is the server
        App.isSSR = true;
        App.isSSREnabled = App.config.log.performanceSsr;

        const store = createStore();

        if (process.env.NODE_ENV === "production")
        {
            // for minified production bundle, only error handler is available
            Vue.config.errorHandler = (err, vm, info) =>
            {
                context.throwError({
                    message: `[Vue error]: Error in ${ info }: "${ err.toString() }". Activate development mode in Ceres for detailed stack trace.`,
                    stack: err.stack
                });
            };
        }
        else
        {
            // use more detailed warn handler for development bundles
            Vue.config.warnHandler = (msg, vm, trace) =>
            {
                context.throwError({
                    message: `[Vue error]: ${ msg } ${ trace }`,
                    stack: trace.trim()
                });
            };
        }

        const app = createAppInternal(context, store);

        initServerStore(store);

        resolve(app);
    });
}

export { createApp, globals };
