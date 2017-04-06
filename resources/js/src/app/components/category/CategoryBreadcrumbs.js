var CategoryRendererService = require("services/CategoryRendererService");
var ResourceService = require("services/ResourceService");

Vue.component("category-breadcrumbs", {

    props: [
        "template",
        "categories",
        "breadcrumbs"
    ],

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

            CategoryRendererService.initialize(this.categories);
        },

        getBreadcrumbs: function()
        {
            return window.location.pathname.split("/");
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
