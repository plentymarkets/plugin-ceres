import Vue from "vue";

Vue.directive("waiting-animation", {
    bind(el)
    {
    },
    update(el, binding)
    {
        if (binding.value && !el.waitingClasses)
        {
            el.waitingClasses = (el.getAttribute("waiting-class") || "fa fa-circle-o-notch fa-spin")
                .split(/\s+/)
                .filter(className => !el.classList.contains(className));

            el.classList.add(...el.waitingClasses);
        }
        else if (el.waitingClasses)
        {
            el.classList.remove(...el.waitingClasses);
            el.waitingClasses = null;
        }
    }
});
