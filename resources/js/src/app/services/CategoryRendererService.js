var ItemListService = require("services/ItemListService");

module.exports = (function($)
{
    var _categoryTree = {};

    return {
        renderItems: _renderItems,
        initialize: _initialize
    };

    /**
     * check if current view is category
     * @param category
     */
    function _isCategoryView(paths, categories)
    {
        categories = categories || _categoryTree;

        for (var currentCategory in categories)
        {
            if (paths[paths.length - 1].indexOf(categories[currentCategory].details[0].nameUrl) > -1)
            {
                return true;
            }

            if (categories[currentCategory].children)
            {
                var isCategory = _isCategoryView(paths, categories[currentCategory].children);

                if (isCategory)
                {
                    return isCategory;
                }
            }
        }

        return false;
    }

    function _initialize(categoryTree)
    {
        _categoryTree = categoryTree;
    }

    /**
     * render items in relation to location
     * @param currentCategory
     */
    function _renderItems(currentCategory)
    {
        if (!_isCategoryView(window.location.pathname.split("/")))
        {
            window.open(_getScopeUrl(currentCategory), "_self");
        }
        else
        {
            _handleCurrentCategory(currentCategory);
        }
    }

    /**
     * bundle functions
     * @param currentCategory
     */
    function _handleCurrentCategory(currentCategory)
    {
        _updateItemList(currentCategory);
        _updateHistory(currentCategory);
    }

    /**
     * update the current item list without reloading
     */
    function _updateItemList(currentCategory)
    {
        ItemListService.setCategoryId(currentCategory.id);

        ItemListService.setPage(1);
        ItemListService.setFacets("");
        ItemListService.getItemList();
    }

    /**
     * update history
     * @param category
     */
    function _updateHistory(currentCategory)
    {
        var title = document.getElementsByTagName("title")[0].innerHTML;

        window.history.replaceState({}, title, _getScopeUrl(currentCategory) + window.location.search);

        document.getElementsByTagName("h1")[0].innerHTML = currentCategory.details[0].name;
    }

    /**
     * update the current scope url
     * @param currentCategory
     * @param scopeUrl
     */
    function _getScopeUrl(currentCategory, scopeUrl, categories)
    {
        scopeUrl = scopeUrl || "";
        categories = categories || _categoryTree;

        for (var category in categories)
        {
            if (categories[category].details[0].nameUrl == currentCategory.details[0].nameUrl)
            {
                scopeUrl += "/" + categories[category].details[0].nameUrl;

                return scopeUrl;
            }

            if (categories[category].children)
            {
                var tempScopeUrl = scopeUrl + "/" + categories[category].details[0].nameUrl;

                var urlScope = _getScopeUrl(currentCategory, tempScopeUrl, categories[category].children);

                if (urlScope.length > 0)
                {
                    return urlScope;
                }
            }
        }

        return "";
    }

})(jQuery);
