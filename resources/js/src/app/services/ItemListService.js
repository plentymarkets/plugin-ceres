var ApiService = require("services/ApiService");
var NotificationService = require("services/NotificationService");
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
            page        : 1
        };

    return {
        setSearchString: setSearchString,
        setItemsPerPage: setItemsPerPage,
        setOrderBy     : setOrderBy,
        setPage        : setPage,
        setSearchParams: setSearchParams
    };

    function _getItemList()
    {
        if (searchParams.searchString.length >= 3)
        {
            UrlService.setUrlParams(searchParams);

            ResourceService.getResource("itemList").set({});
            _setIsLoading(true);

            return ApiService.get("/rest/io/item/search", {searchString: searchParams.searchString}, {searchParams: searchParams}, {
                template: "Ceres::ItemList.ItemListView"
            })
                .done(function(response)
                {
                    _setIsLoading(false);
                    ResourceService.getResource("itemList").set(response);
                })
                .fail(function()
                {
                    _setIsLoading(false);
                    NotificationService.error("Error while searching").closeAfter(5000);
                });
        }

        return null;
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

        _getItemList();
    }

    function setSearchString(searchString)
    {
        searchParams.searchString = searchString;
        searchParams.page = 1;

        _getItemList();
    }

    function setItemsPerPage(itemsPerPage)
    {
        searchParams.itemsPerPage = itemsPerPage;
        _getItemList();
    }

    function setOrderBy(orderBy)
    {
        searchParams.orderBy = orderBy.split("_")[0];
        searchParams.orderByKey = orderBy.split("_")[1];
        _getItemList();
    }

    function setPage(page)
    {
        searchParams.page = page;
        _getItemList();
    }

})(jQuery);
