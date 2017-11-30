Vue.directive("stick-in-parent",
    {
        bind(el, binding)
        {
            const minSize = binding.value || 768;

            if (window.matchMedia("(min-width: " + minSize + "px)").matches)
            {
                setTimeout(() =>
                {
                    const $element = $(el);
                    const headHeight = $(".top-bar").height();

                    $element.stick_in_parent({offset_top: headHeight + 10});

                    $element.on("sticky_kit:bottom", () =>
                    {
                        $element.parent().css("position", "static");
                    })
                    .on("sticky_kit:unbottom", () =>
                    {
                        $element.parent().css("position", "relative");
                    });
                }, 0);
            }
        }
    });
