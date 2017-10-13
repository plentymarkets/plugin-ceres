Vue.directive("waiting-animation", {
    bind(el)
	{
        el.firstRendering = true;
        el.initialClass = el.className;
    },

    update(el, binding)
	{
        if (el.firstRendering)
		{
            el.firstRendering = false;
            return;
        }
        if (binding.value)
		{
            el.className = "";
            el.className = "fa fa-circle-o-notch fa-spin";

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
