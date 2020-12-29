import { createApp } from "./app";
import Vue from "vue";

export default options =>
{
    Vue.config.silent = true;
    const { app } = createApp(options);

    return app;
};
