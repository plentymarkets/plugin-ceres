Vue.directive("is-loading-watcher",
    {
        bind(el)
        {
            el.isFirstRendering = true;
        },

        update(el, binding)
        {
            if (!el.isFirstRendering && document.getElementById("twig-rendered-item-list") !== null)
            {
                if (!binding.value)
                {
                    $("#twig-rendered-item-list").remove();
                    document.getElementById("vue-rendered-item-list").style.removeProperty("display");
                }
                else
                {
                    $("#twig-rendered-item-list").addClass("loading");
                }
            }
            else
            {
                el.isFirstRendering = !binding.value;
            }
        }
    });
