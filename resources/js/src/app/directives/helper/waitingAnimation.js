import Vue from "vue";

Vue.directive("waiting-animation", {
    bind(el)
    {
        console.warn(`Directive "v-waiting-animation" is deprecated. Please use "icon" component instead.`);
    }
});
