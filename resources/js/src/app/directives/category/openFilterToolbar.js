import Vue from "vue";

const emit = (vnode, name, data) =>
{
    const handlers = (vnode.data && vnode.data.on) ||
        (vnode.componentOptions && vnode.componentOptions.listeners);

    if (handlers && handlers[name])
    {
        handlers[name].fns(data);
    }
};

Vue.directive("open-filter-toolbar",
    {
        bind(el, binding, vnode)
        {
            const openFilterToolbar = window.localStorage.getItem("openFilterToolbar") === "true";

            if (openFilterToolbar)
            {
                window.localStorage.removeItem("openFilterToolbar");

                Vue.nextTick(() =>
                {
                    emit(vnode, "defaultOpen", { });
                });
            }
        }
    });

