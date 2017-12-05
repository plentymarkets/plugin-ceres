const initTooltip = el =>
{
    setTimeout(() =>
    {
        $(el).tooltip({
            trigger: "hover",
            // eslint-disable-next-line
            template: '<div class="tooltip" style="z-index:9999" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
        });
    }, 1);
};

Vue.directive("tooltip", {

    unbind(el)
    {
        $(el).tooltip("dispose");
    },

    update(el, binding)
    {
        if (typeof binding.value === "undefined" || binding.value)
        {
            initTooltip(el);
        }
        else
        {
            setTimeout(() =>
            {
                $(el).tooltip("dispose");
            }, 1);
        }
    },

    bind(el, binding)
    {
        if (typeof binding.value === "undefined" || binding.value)
        {
            initTooltip(el);
        }
    }
});
