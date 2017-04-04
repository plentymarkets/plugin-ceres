var ItemListService = require("services/ItemListService");

Vue.component("category-renderer", {

    props: [
        "template",
        "categories",
        "currentScopeUrl"
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
        },

        /**
         * check if current view is category
         * @param category
         */
        checkCategoryView: function(category, paths)
        {
            for (var currentCategory in category)
            {
                if (paths.indexOf(category[currentCategory].details[0].nameUrl) > -1)
                {
                    return true;
                }

                if (category[currentCategory].children)
                {
                    this.checkCategoryView(category[currentCategory].children, paths);
                }
            }

            return false;
        },

        /**
         * render items in relation to location
         * @param currentCategory
         * @param currentChild
         */
        renderItems: function(currentCategory, currentChild)
        {
            this.updateScopeUrl(currentCategory, currentChild);

            if (!this.checkCategoryView(this.categories, window.location.pathname.split("/")))
            {
                window.open(this.currentScopeUrl, "_self");
            }

            if (currentChild)
            {
                this.handleCurrentCategory(currentChild);
            }
            else
            {
                this.handleCurrentCategory(currentCategory);
            }
        },

        /**
         * bundle functions
         * @param currentCategory
         */
        handleCurrentCategory: function(currentCategory)
        {
            this.updateItemList(currentCategory);
            this.updateHistory(currentCategory);
        },

        /**
         * update the current scope url
         * @param parent
         * @param child
         */
        updateScopeUrl: function(parent, child)
        {
            var url = "";

            if (child)
            {
                url = "/" + parent.details[0].nameUrl + "/" + child.details[0].nameUrl;
            }
            else
            {
                url = "/" + parent.details[0].nameUrl;
            }

            this.currentScopeUrl = url;
        },

        /**
         * update the current item list without reloading
         */
        updateItemList: function(category)
        {
            ItemListService.setCategoryId(category.id);

            ItemListService.setPage(1);
            ItemListService.setFacets("");
            ItemListService.getItemList();
        },

        /**
         * update history
         * @param category
         */
        updateHistory: function(category)
        {
            var title = document.getElementsByTagName("title")[0].innerHTML;

            window.history.replaceState({}, title, this.currentScopeUrl + window.location.search);

            document.getElementsByTagName("h1")[0].innerHTML = category.details[0].name;
        }
    }
});
