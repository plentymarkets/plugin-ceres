const stickInParent = (el, minWidth, isActive) =>
{
    const currentActiveState = el.dataset.isSticky === "true";
    const isInSize = window.matchMedia("(min-width: " + minWidth + "px)").matches;

    const activeState = !(isActive === false) && isInSize;

    if (activeState && !currentActiveState)
    {
        const $element = $(el);
        const headHeight = $(".top-bar").height();

        if ($element.stick_in_parent({offset_top: headHeight + 10}))
        {
            el.dataset.isSticky = true;
        }
    }
    else if (!activeState && currentActiveState)
    {
        el.dataset.isSticky = false;
        $(el).trigger("sticky_kit:detach");
    }

};

Vue.directive("stick-in-parent",
    {
        bind(el, binding)
        {
            window.addEventListener("resize", () =>
            {
                stickInParent(el, parseInt(binding.arg) || 768);
            });

            setTimeout(() =>
            {
                stickInParent(
                    el,
                    parseInt(binding.arg) || 768,
                    binding.value
                );
            }, 0);
        },
        update(el, binding)
        {
            setTimeout(() =>
            {
                stickInParent(
                    el,
                    parseInt(binding.arg) || 768,
                    binding.value
                );
            }, 0);
        },
        unbind(el)
        {
            stickInParent(
                el,
                0,
                false
            );
        }
    });
