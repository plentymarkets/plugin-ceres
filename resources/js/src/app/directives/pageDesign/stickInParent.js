import { isNullOrUndefined } from "../../helper/utils";
import { StickyElement } from "../../helper/StickyElement";
import Vue from "vue";

Vue.directive("stick-in-parent",
    {
        bind(el, binding, vnode)
        {
            el.__sticky = new StickyElement(
                el,
                vnode.context,
                parseInt(binding.arg) || 768
            );

            if (binding.value === false)
            {
                el.__sticky.disable();
            }
            else
            {
                el.__sticky.enable();
            }
        },
        update(el, binding)
        {
            if (!isNullOrUndefined(el.__sticky))
            {
                el.__sticky.minWidth = parseInt(binding.arg) || 768;
                if (binding.value === false)
                {
                    el.__sticky.disable();
                }
                else
                {
                    el.__sticky.enable();
                }
                el.__sticky.checkMinWidth();
            }
        },
        unbind(el)
        {
            if (!isNullOrUndefined(el.__sticky))
            {
                el.__sticky.destroy();
                el.__sticky = null;
            }
        }
    });
