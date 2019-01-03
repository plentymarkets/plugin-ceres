const checkTooltip = (el, disable) =>
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
        checkTooltip(el, binding.value === false);
    },

    bind(el, binding)
    {
        if (window.matchMedia("(min-width: 768px)").matches)
        {
            setTimeout(() =>
            {
                $(el).tooltip();
                checkTooltip(el, binding.value === false);
            }, 1);
        }

    }
});
