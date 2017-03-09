var ApiService = require("services/ApiService");
// var NotificationService = require("services/NotificationService");
var ResourceService = require("services/ResourceService");
var UrlService = require("services/UrlService");

module.exports = (function($)
{
    var searchParams =
        {
            searchString: "",
            itemsPerPage: 20,
            orderBy     : "itemName",
            orderByKey  : "ASC",
            page        : 1,
            facets      : "",
            categoryId  : null,
            template    : ""
        };

    // var urlParams =
    //     {
    //         query: "Sofa",
    //         categoryId: 1,
    //         items: 20,
    //         orderBy: "itemName_ASC",
    //         page: 1,
    //         facets: "1,2,3"
    //     };

    return {
        getItemList    : getItemList,
        setSearchString: setSearchString,
        setItemsPerPage: setItemsPerPage,
        setOrderBy     : setOrderBy,
        setPage        : setPage,
        setSearchParams: setSearchParams,
        setFacets      : setFacets,
        setCategoryId  : setCategoryId,
    };

    function getItemList()
    {
        if (searchParams.categoryId || searchParams.searchString.length >= 3)
        {
            _updateUrlParams();

            var url = searchParams.categoryId ? "/rest/io/category" : "/rest/io/item/search";

            searchParams.template = searchParams.categoryId ? "Ceres::Category.Item.CategoryItem" : "Ceres::ItemList.ItemListView";

            _setIsLoading(false);

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

    function setSearchString(searchString)
    {
        searchParams.searchString = searchString;
        searchParams.page = 1;
    }

    function setItemsPerPage(itemsPerPage)
    {
        searchParams.itemsPerPage = itemsPerPage;
    }

    function setOrderBy(orderBy)
    {
        searchParams.orderBy = orderBy.split("_")[0];
        searchParams.orderByKey = orderBy.split("_")[1];
    }

    function setPage(page)
    {
        searchParams.page = page;
    }

    function setFacets(facets)
    {
        searchParams.facets = facets.toString();
    }

    function setCategoryId(categoryId)
    {
        searchParams.categoryId = categoryId;
    }

    function _updateUrlParams()
    {

    }

})(jQuery);
