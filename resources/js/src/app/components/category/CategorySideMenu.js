var CategoryRendererService = require("services/CategoryRendererService");
var ResourceService = require("services/ResourceService");

Vue.component("category-side-menu", {

    props: [
        "template",
        "categories"
    ],

    created: function()
    {
        this.$options.template = this.template;

        CategoryRendererService.initialize(this.categories);
    },

    ready: function()
    {
        ResourceService.watch("breadcrumbs", function(values)
        {
            var nodeList = [];

            for (var index in values)
            {
                nodeList.push(values[index].id);
            }

            this.$broadcast("update-nodes", nodeList);
        }.bind(this));
    },

    events:
    {
        "category-node-activated": function(payload)
        {
            CategoryRendererService.renderItems(payload.node);
        }
    }
});
