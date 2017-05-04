var ResourceService = require("services/ResourceService");

Vue.directive("is-loading-breadcrumbs-watcher",
    {
        bind: function()
        {
            var firstRendering = true;

            ResourceService.watch("isLoadingBreadcrumbs", function()
            {
                if (!firstRendering && document.getElementById("twig-rendered-breadcrumbs") !== null)
                {
                    $("#twig-rendered-breadcrumbs").remove();

                    document.getElementById("vue-rendered-breadcrumbs").style.removeProperty("display");
                }
                else
                {
                    firstRendering = false;
                }
            });
        }
    });
