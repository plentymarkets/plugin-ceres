import Vue from "vue";

const toggleTooltip = (el, disable) =>
{
    if (disable)
    {
        $(el).tooltip("disable");
    }
    else
    {
        // reinitialize tooltip, to update the title value
        $(el).tooltip("dispose");
        $(el).tooltip();
    }
};

Vue.directive("tooltip", {

    unbind(el)
    {
        $(el).tooltip("dispose");
    },

    update(el, binding)
    {
        toggleTooltip(el, binding.value === false);
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
