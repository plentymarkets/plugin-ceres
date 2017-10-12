Vue.directive("update-sidenav-selection",
    {
        params: ["categoryId"],

        bind(el)
        {
        },

        update(el, binding)
        {
            for (const breadcrumb of binding.value)
            {
                if (breadcrumb.id === parseInt(el.dataset.categoryId))
                {
                    el.classList.add("active");
                    break;
                }
                else
                {
                    el.classList.remove("active");
                }
            }
        }
    });
