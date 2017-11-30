const checkElement = (el, breakpoint) =>
{
    const isSticky = el.dataset.isSticky === "true";
    const matchesBreakpoint = window.matchMedia("(min-width: " + breakpoint + "px)").matches;

    if (matchesBreakpoint && !isSticky)
    {
        const $element = $(el);
        const headHeight = $(".top-bar").height();

        el.dataset.isSticky = true;
        $element.stick_in_parent({offset_top: headHeight + 10});

        $element.on("sticky_kit:bottom", () =>
        {
            $element.parent().css("position", "static");
        })
        .on("sticky_kit:unbottom", () =>
        {
            $element.parent().css("position", "relative");
        });
    }
    else if (!matchesBreakpoint && isSticky)
    {
        el.dataset.isSticky = false;
        $(el).trigger("sticky_kit:detach");
    }
};

Vue.directive("stick-in-parent",
    {
        bind(el, binding)
        {
            const minSize = binding.value || 768;

            window.addEventListener("resize", () =>
            {
                checkElement(el, minSize);
            });

            setTimeout(() =>
            {
                checkElement(el, minSize);
            }, 0);
        }
    });
