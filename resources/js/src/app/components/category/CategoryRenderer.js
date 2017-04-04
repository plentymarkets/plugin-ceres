Vue.component("category-renderer", {

    props: [
        "template",
        "categories",
        "currentScopeUrl"
    ],

    data: function()
    {
        return {
            isCategoryView: false,
            urlPaths: ""
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        this.init();

        this.checkCategoryView(this.categories);
    },

    methods:
    {
        init: function()
        {
            this.urlPaths = window.location.pathname.split("/");
            this.categories = JSON.parse(this.categories);
        },

        checkCategoryView: function(category)
        {
            for (var currentCategory in category)
            {
                if (this.urlPaths.indexOf(category[currentCategory].details[0].nameUrl) > -1)
                {
                    this.isCategoryView = true;
                    break;
                }

                if (category[currentCategory].children)
                {
                    this.checkCategoryView(category[currentCategory].children);
                }
            }
        },

        /**
         * ! rework ! => urlChild array and lvl param needs to be added
         * @param urlParent
         * @param urlChild
         */
        renderItems: function(urlParent, urlChild)
        {
            if (urlChild !== null)
            {
                urlParent = "/" + urlParent + "/" + urlChild;
            }
            else
            {
                urlParent = "/" + urlParent;
            }

            if (!this.isCategoryView)
            {
                window.open(urlParent, "_self");
            }
            else
            {
                console.log("trigger resource service");
            }
        }
    }
});
