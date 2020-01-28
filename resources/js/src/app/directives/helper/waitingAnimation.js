import Vue from "vue";

Vue.directive("waiting-animation", {
    update(el, binding)
    {
        if (binding.value && !el.waitingClasses)
        {
            el.waitingClasses = (el.getAttribute("waiting-class") || "fa fa-circle-o-notch fa-spin");
            el.className = el.waitingClasses;

            if (el._prevClass.includes("fa-lg"))
            {
                el.classList.add("fa-lg");
            }
        }
        else if (el.waitingClasses)
        {
            el.className = el._prevClass;
            el.waitingClasses = null;
        }
    }
});
