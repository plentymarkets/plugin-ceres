import Vue from "vue";

Vue.directive("validate", {

    bind(el, binding)
    {
        if (binding.value !== false)
        {
            el.dataset.validate = binding.arg || "";
        }
    },

    update(el, binding)
    {
        if (binding.value === false)
        {
            delete el.dataset.validate;
        }
        else
        {
            el.dataset.validate = binding.arg || "";
        }
    }
});
