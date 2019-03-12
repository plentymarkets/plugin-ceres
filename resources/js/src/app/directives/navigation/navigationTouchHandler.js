Vue.directive("navigation-touch-handler", {
    bind(el)
    {
        if (document.body.classList.contains("touch"))
        {
            const className = "hover";

            el.addEventListener("touchstart", event =>
            {
                const isHover = el.classList.contains(className);

                for (const element of document.querySelectorAll(".ddown.hover"))
                {
                    element.classList.remove(className);
                }

                if (isHover)
                {
                    el.classList.remove(className);
                }
                else
                {
                    el.classList.add(className);
                    event.preventDefault();
                }
            });
        }
    }
});
