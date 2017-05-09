var ResourceService = require("services/ResourceService");

Vue.directive("check-active",
    {
        params: ["category"],

        bind: function()
        {
            var categoryObject = JSON.parse(this.params.category);

            ResourceService.watch("breadcrumbs", function(values)
            {
                for (var index in values)
                {
                    if (values[index].id == categoryObject.id)
                    {
                        this.el.classList.add("active");
                        break;
                    }
                    else
                    {
                        this.el.classList.remove("active");
                    }
                }
            }.bind(this));
        }
    });
