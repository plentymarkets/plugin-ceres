import Vue from "vue";

const toggleTooltip = (el, disable) =>
{
    $(el).tooltip(disable ? "disable" : "enable");
};

Vue.directive("tooltip", {

    unbind(el)
    {
        $(el).tooltip("dispose");
    },

    update(el, binding)
    {
        toggleTooltip(el, binding.value === false);
        
        // reinitialize tooltip, to update the title value
        $(el).tooltip("dispose");
        $(el).tooltip();
    },

    bind(el, binding)
    {
        if (window.matchMedia("(min-width: 768px)").matches)
        {
            setTimeout(() =>
            {
                $(el).tooltip();
                toggleTooltip(el, binding.value === false);
            }, 1);
        }

    }
});
