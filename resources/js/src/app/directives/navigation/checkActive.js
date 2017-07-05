var ResourceService = require("services/ResourceService");

Vue.directive("check-active",
    {
        params: ["category"],

        bind: function(el)
        {
            var categoryObject = JSON.parse(this.params.category);

            ResourceService.watch("breadcrumbs", function(values)
            {
                for (var index in values)
                {
                    if (values[index].id == categoryObject.id)
                    {
                        el.classList.add("active");
                        break;
                    }
                    else
                    {
                        el.classList.remove("active");
                    }
                }
            });
        }
    });
