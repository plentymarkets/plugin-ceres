Vue.directive("is-loading-watcher",
    {
        bind()
        {
            this.el.isFirstRendering = true;
        },

        update(isLoading)
        {
            if (!this.el.isFirstRendering && document.getElementById("twig-rendered-item-list") !== null)
            {
                if (!isLoading)
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
                this.el.isFirstRendering = false;
            }
        }
    });
