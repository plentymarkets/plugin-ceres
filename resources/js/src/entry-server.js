import "./app/publicPath";
import { createApp } from "./app";
import Vue from "vue";
import { initServerStore } from "./app/store";

// export default options =>
// {
//     console.log("entry-server");

//     Vue.config.silent = true;
//     Vue.prototype.$isSSR = true;
//     const { app, store } = createApp(options);

//     window.__TEST__ = "Hello there.";

//     options.state = store.state;

//     options.rendered = () =>
//     {
//         // After the app is rendered, our store is now
//         // filled with the state from our components.
//         // When we attach the state to the context, and t he `template` option
//         // is used for the renderer, the state will automatically be
//         // serialized and injected into the HTML as `window.__INITIAL_STATE__`.

//         console.log("entry-server: rendered");
//         options.state = store.state;
//     };

//     return app;
// };

export default context =>
{
    return new Promise((resolve, reject) =>
    {
        Vue.config.silent = true;
        Vue.prototype.$isSSR = true;

        const { app, store } = createApp(context, global.App);

        initServerStore(store, global.App);

        // NOT working in our solution
        // context.rendered = () =>
        // {
        //     // After the app is rendered, our store is now
        //     // filled with the state from our components.
        //     // When we attach the state to the context, and the `template` option
        //     // is used for the renderer, the state will automatically be
        //     // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
        //     context.state = store.state;
        // };

        resolve(app);
    });
};
