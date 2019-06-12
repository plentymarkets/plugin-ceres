Vue.directive("waiting-animation", {
    bind(el)
    {
        el.initialClass = el.className;
        el.waitingClass = el.getAttribute("waiting-class") || "fa fa-circle-o-notch fa-spin";
    },

    update(el, binding)
    {
        if (binding.value)
        {
            el.className = "";
            el.className = el.waitingClass;

            if (el.initialClass.includes("fa-lg"))
            {
                el.className += " fa-lg";
            }
        }
        else
        {
            el.className = el.initialClass;
        }
    }
});
