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
            if (window.matchMedia("(min-width: 768px)").matches)
            {
                $(el).tooltip(binding.value || isUndefined(binding.value) ? "enable" : "disable");
            }
        }
    },

    bind(el, binding)
    {
        if (window.matchMedia("(min-width: 768px)").matches)
        {
            setTimeout(() =>
            {
                $(el).tooltip(binding.value || isUndefined(binding.value) ? "enable" : "disable");
            }, 1);
        }
    }
});
