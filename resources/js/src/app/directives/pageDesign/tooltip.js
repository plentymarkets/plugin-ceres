import {isNullOrUndefined}from "../../helper/utils";

const initTooltip = el =>
{
    if (window.matchMedia("(min-width: 768px)").matches)
    {
        setTimeout(() =>
        {
            $(el).tooltip({
                trigger: "hover"
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
