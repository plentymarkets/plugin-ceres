Vue.directive("is-loading-watcher",
    {
        update(el, binding)
        {
            if (binding.value)
            {
                $("#twig-rendered-item-list").addClass("loading");
                el.removeTwig = true;
            }
            else if (el.removeTwig)
            {
                $("#twig-rendered-item-list").remove();
                document.getElementById("vue-rendered-item-list").style.removeProperty("display");
            }
        }
    });
