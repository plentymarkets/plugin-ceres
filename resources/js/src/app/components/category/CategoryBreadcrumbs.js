Vue.component("category-breadcrumbs", {

    props: [
        "template",
        "currentCategoryTree"
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
            this.currentCategoryTree = JSON.parse(this.currentCategoryTree);
        }
    }
});
