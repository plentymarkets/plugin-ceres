var ApiService = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ResourceService = require("services/ResourceService");

import UrlService from "services/UrlService";

module.exports = (function($)
{
    var searchParams =
        {
            query               : "",
            items               : App.config.defaultItemsPerPage,
            sorting             : App.isSearch ? App.config.defaultSortingSearch : App.config.defaultSorting,
            page                : 1,
            facets              : "",
            categoryId          : null,
            template            : "",
            variationShowType   : App.config.variationShowType
        };

    return {
        getItemList       : getItemList,
        updateSearchString: updateSearchString,
        setSearchString   : setSearchString,
        setItemsPerPage   : setItemsPerPage,
        setOrderBy        : setOrderBy,
        setPage           : setPage,
        setSearchParams   : setSearchParams,
        setFacets         : setFacets,
        setCategoryId     : setCategoryId
    };

    function getItemList()
    {
        if (searchParams.categoryId || searchParams.query.length >= 3)
        {
            if (ResourceService.getResource("itemList").val())
            {
                ResourceService.getResource("itemList").val().total = 0;
            }

            var url = searchParams.categoryId ? "/rest/io/category" : "/rest/io/item/search";

            searchParams.template = "Ceres::ItemList.ItemListView";

            _setIsLoading(true);

            ApiService.get(url, searchParams)
                .done(function(response)
                {
                    _setIsLoading(false);

                    ResourceService.getResource("itemList").set(response);
                    ResourceService.getResource("facets").set(response.facets);
                })
                .fail(function(response)
                {
                    _setIsLoading(false);

                    NotificationService.error("Error while searching").closeAfter(5000);
                });
        }
    }

    function _setIsLoading(isLoading)
    {
        ResourceService.getResource("itemSearch").set(searchParams);
        ResourceService.getResource("isLoading").set(isLoading);
    }

    /**
     * ?searchString=searchString&itemsPerPage=itemsPerPage&orderBy=orderBy&orderByKey=orderByKey&page=page
     * @param urlParams
     */
    function setSearchParams(urlParams)
    {
        var queryParams = UrlService.getUrlParams(urlParams);

        for (var key in queryParams)
        {
            searchParams[key] = queryParams[key];
        }
    }

    function updateSearchString(query)
    {
        searchParams.query = query;

        query = (query.length > 0) ? query : null;
        UrlService.setUrlParam("query", query);
    }

    function setSearchString(query)
    {
        searchParams.query = query;
        searchParams.page = 1;

        setPage(1);
        setFacets("");

        ResourceService.getResource("facets").set({});
        ResourceService.getResource("facetParams").set([]);

        query = (query.length > 0) ? query : null;
        UrlService.setUrlParam("query", query);
    }

    function setItemsPerPage(items)
    {
        searchParams.items = items;

        items = (items != App.config.defaultItemsPerPage) ? items : null;
        UrlService.setUrlParam("items", items);
    }

    function setOrderBy(sorting)
    {
        searchParams.sorting = sorting;

        if (App.isSearch)
        {
            sorting = (sorting !== App.config.defaultSortingSearch) ? sorting : null;
        }
        else
        {
            sorting = (sorting !== App.config.defaultSorting) ? sorting : null;
        }

        UrlService.setUrlParam("sorting", sorting);
    }

    function setPage(page)
    {
        searchParams.page = page;

        page = (page > 1) ? page : null;
        UrlService.setUrlParam("page", page);
    }

    function setFacets(facets)
    {
        searchParams.facets = facets.toString();

        facets = (facets.toString().length > 0) ? facets.toString() : null;

        setPage(1);

        UrlService.setUrlParam("facets", facets);
    }

    function setCategoryId(categoryId)
    {
        searchParams.categoryId = categoryId;
    }

})(jQuery);
