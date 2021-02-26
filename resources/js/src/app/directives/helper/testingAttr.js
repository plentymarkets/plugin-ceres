import Vue from "vue";

Vue.directive("testing-attr", {
    bind(el, binding)
    {
        if (window.ceresEnv !== "testing")
        {
            return;
        }

        const attr = binding.arg;
        const attrValue = binding.value;

        el.setAttribute(attr, attrValue);
    }
});
