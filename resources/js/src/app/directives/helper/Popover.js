Vue.directive("popover",
    {
        bind(el, binding)
	{
            $(el).popover();
        }
    });
