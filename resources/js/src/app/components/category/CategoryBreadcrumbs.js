var CategoryRendererService = require("services/CategoryRendererService");
var ResourceService = require("services/ResourceService");

Vue.component("category-breadcrumbs", {

    props: [
        "template",
        "categories",
        "currentCategoryTree"
    ],

    data: function()
    {
        return {
            breadcrumbs: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        this.init();
    },

    methods:
    {
        /**
         * initialize values
         */
        init: function()
        {
            this.categories = JSON.parse(this.categories);
            this.currentCategoryTree = JSON.parse(this.currentCategoryTree);

            ResourceService.bind("breadcrumbs", this);
            ResourceService.getResource("breadcrumbs").set(this.currentCategoryTree);

            CategoryRendererService.initialize(this.categories);
        },

        /**
         * render items in relation to location
         * @param currentCategory
         */
        renderItems: function(currentCategory)
        {
            CategoryRendererService.renderItems(currentCategory);
        }
    }
});
