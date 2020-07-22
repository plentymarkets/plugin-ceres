import Vue from "vue";

Vue.directive("open-filter-toolbar",
    {
        bind(el)
        {
            const openFilterToolbar = window.localStorage.getItem("openFilterToolbar") === "true";

            if (openFilterToolbar)
            {
                window.localStorage.removeItem("openFilterToolbar");

                Vue.nextTick(() =>
                {
                    $(el).collapse("show");
                });
            }
        }
    });
