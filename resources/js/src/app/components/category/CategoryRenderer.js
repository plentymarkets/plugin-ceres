var ItemListService = require("services/ItemListService");

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
        /**
         * initialize values
         */
        init: function()
        {
            this.urlPaths = window.location.pathname.split("/");
            this.categories = JSON.parse(this.categories);
        },

        /**
         * check if current view is category
         * @param category
         */
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
         * render items in relation to location
         * @param currentCategory
         * @param currentChild
         */
        renderItems: function(currentCategory, currentChild)
        {
            this.updateUrl(currentCategory, currentChild);

            if (!this.isCategoryView)
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
         * bundle function
         * @param currentCategory
         */
        handleCurrentCategory: function(currentCategory)
        {
            this.updateItemList(currentCategory);
            this.updateHistory(currentCategory);
        },

        /**
         * update the current node url
         * @param parent
         * @param child
         */
        updateUrl: function(parent, child)
        {
            var url = "";

            if (child !== null)
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
