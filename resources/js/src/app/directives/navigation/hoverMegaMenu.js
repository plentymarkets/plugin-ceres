Vue.directive("hover-mega-menu", {

    bind(el)
    {
        $(el).click(event =>
        {
            event.preventDefault();

            if (document.body.classList.contains("touch"))
			{
				// get hover state
                const isHover = event.currentTarget.classList.contains("hover");

				// clear all hover states
                const ddownElements = [].slice.call(document.getElementsByClassName("ddown"));

                ddownElements.find(element => element.classList.remove("hover"));

				// toggle old hover state (switch between top level categories makes this necessary)
                if (isHover)
				{
                    event.currentTarget.classList.remove("hover");
                }
                else
				{
                    event.currentTarget.classList.add("hover");
                }
            }
        });
    }
});
