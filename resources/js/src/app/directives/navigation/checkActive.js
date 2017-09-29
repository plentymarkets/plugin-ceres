Vue.directive("update-sidenav-selection",
    {
        params: ["categoryId"],

        bind: function()
        {
        },

        update(breadcrumbs)
        {
            for (const breadcrumb of breadcrumbs)
            {
                if (breadcrumb.id === parseInt(this.params.categoryId))
                {
                    this.el.classList.add("active");
                    break;
                }
                else
                {
                    this.el.classList.remove("active");
                }
            }
        }
    });
