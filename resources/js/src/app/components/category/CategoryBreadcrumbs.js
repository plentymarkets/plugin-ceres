import CategoryRendererService from "services/CategoryRendererService";
var ResourceService = require("services/ResourceService");

Vue.component("category-breadcrumbs",
    {

        props: [
            "template",
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

        methods: {
            /**
             * initialize values
             */
            init: function()
            {
                ResourceService.bind("breadcrumbs", this);

                this.breadcrumbs = this.currentCategoryTree;
            },

            /**
             * render items in relation to location
             * @param currentCategory
             */
            renderItems: function(currentCategory)
            {
                CategoryRendererService.renderItems(currentCategory);

                return false;
            },

            getBreadcrumbURL: function(breadcrumb)
            {
                return CategoryRendererService.getScopeUrl(breadcrumb);
            }
        }
    });
