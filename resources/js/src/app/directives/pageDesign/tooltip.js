import Vue from "vue";
import { isUndefined } from "../../helper/utils";

Vue.directive("tooltip", {

    unbind(el)
    {
        $(el).tooltip("dispose");
    },

    update(el, binding)
    {
        if (binding.newValue !== binding.oldValue)
        {
            $(el).tooltip(binding.value || isUndefined(binding.value) ? "enable" : "disable");
        }
    },

    bind(el, binding)
    {
        setTimeout(() =>
        {
            $(el).tooltip(binding.value || isUndefined(binding.value) ? "enable" : "disable");
        }, 1);
    }
});
