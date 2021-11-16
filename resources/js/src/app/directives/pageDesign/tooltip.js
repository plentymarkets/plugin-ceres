import Vue from "vue";

// ignore mobile devices
const isNoMobileDevice = () =>
{
    return window.matchMedia("(min-width: 768px)").matches
        && !document.body.classList.contains(".touch");
};

const toggleTooltip = (el, disable) =>
{
    if (disable)
    {
        $(el).tooltip("disable");
    }
    else if (isNoMobileDevice())
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
        if (isNoMobileDevice())
        {
            setTimeout(() =>
            {
                $(el).tooltip();
                toggleTooltip(el, binding.value === false);
            }, 1);
        }

    }
});
