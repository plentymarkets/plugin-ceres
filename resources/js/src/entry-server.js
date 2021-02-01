import { createApp } from "./app";
import Vue from "vue";

export default options =>
{
    Vue.config.silent = true;
    Vue.prototype.$isSSR = true;
    const { app, store } = createApp(options);

    window.__TEST__ = "Hello there.";

    options.rendered = () =>
    {
        // After the app is rendered, our store is now
        // filled with the state from our components.
        // When we attach the state to the context, and the `template` option
        // is used for the renderer, the state will automatically be
        // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
        options.state = store.state;
    };

    return app;
};

// export default context =>
// {
//     return new Promise((resolve, reject) =>
//     {
//         Vue.config.silent = true;
//         Vue.prototype.$isSSR = true;
//         const { app, store } = createApp(context);

//         context.rendered = () =>
//         {
//             // After the app is rendered, our store is now
//             // filled with the state from our components.
//             // When we attach the state to the context, and the `template` option
//             // is used for the renderer, the state will automatically be
//             // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
//             context.state = store.state;
//         };

//         resolve(app);
//     });
// };
