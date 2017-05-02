var CategoryRendererService = require("services/CategoryRendererService");

Vue.component("category-renderer", {

    props: [
        "template",
        "categories"
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
