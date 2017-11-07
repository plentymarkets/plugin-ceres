Vue.directive("waiting-animation", {
    bind(el)
	{
        el.initialClass = el.className;
    },

    update(el, binding)
	{
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
