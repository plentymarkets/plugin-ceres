import {isNullOrUndefined}from "../../helper/utils";

const initTooltip = el =>
{
    if (window.matchMedia("(min-width: 768px)").matches)
    {
        setTimeout(() =>
        {
            $(el).tooltip({
                trigger: "hover",
                // eslint-disable-next-line
                template: '<div class="tooltip" style="z-index:9999" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
            });
        }, 1);
    }
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
            if (isNullOrUndefined(el.getAttribute("data-original-title")) &&
                !isNullOrUndefined(el.getAttribute("data-title")))
            {
                el.setAttribute("title", el.getAttribute("data-title"));
                el.removeAttribute("data-title");
            }
            initTooltip(el);
        }
        else
        {
            setTimeout(() =>
            {
                $(el).tooltip("dispose");

                if (!isNullOrUndefined(el.getAttribute("title")))
                {
                    el.setAttribute("data-title", el.getAttribute("title"));
                    el.removeAttribute("title");
                }
            }, 1);
        }
    },

    bind(el, binding)
    {
        if (typeof binding.value === "undefined" || binding.value)
        {
            initTooltip(el);
        }
        else
        {
            el.setAttribute("data-title", el.getAttribute("title"));
            el.removeAttribute("title");
        }
    }
});
