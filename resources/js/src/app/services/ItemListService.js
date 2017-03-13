var ApiService = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ResourceService = require("services/ResourceService");
var UrlService = require("services/UrlService");

module.exports = (function($)
{
    var searchParams =
        {
            searchString: "",
            itemsPerPage: App.config.defaultItemsPerPage,
            orderBy     : App.config.defaultSorting,
            page        : 1,
            facets      : "",
            categoryId  : null,
            template    : ""
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
        if (searchParams.categoryId || searchParams.searchString.length >= 3)
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

    function updateSearchString(searchString)
    {
        searchParams.searchString = searchString;

        searchString = (searchString.length > 0) ? searchString : null;
        UrlService.setUrlParam("query", searchString);
    }

    function setSearchString(searchString)
    {
        searchParams.searchString = searchString;
        searchParams.page = 1;

        setPage(1);
        setFacets("");

        ResourceService.getResource("facets").set({});
        ResourceService.getResource("facetParams").set([]);

        searchString = (searchString.length > 0) ? searchString : null;
        UrlService.setUrlParam("query", searchString);
    }

    function setItemsPerPage(itemsPerPage)
    {
        searchParams.itemsPerPage = itemsPerPage;

        itemsPerPage = (itemsPerPage !== App.config.defaultItemsPerPage) ? itemsPerPage : null;
        UrlService.setUrlParam("items", itemsPerPage);
    }

    function setOrderBy(orderBy)
    {
        searchParams.orderBy = orderBy;

        orderBy = (orderBy !== App.config.defaultSorting) ? orderBy : null;
        UrlService.setUrlParam("orderBy", orderBy);
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
