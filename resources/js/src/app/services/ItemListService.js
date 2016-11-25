var ApiService = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ResourceService = require("services/ResourceService");

module.exports = (function($)
{
    var searchParams =
        {
            searchString: "",
            itemsPerPage: 0,
            orderBy: "itemName",
            orderByKey: "ASC",
            page: 1
        };

    return {
        setSearchString: setSearchString,
        setItemsPerPage: setItemsPerPage,
        setOrderBy: setOrderBy,
        setOrderByKey: setOrderByKey,
        setPage: setPage
    };

    function _getItemList()
    {
        return ApiService.get("/rest/item/search", searchParams)
            .done(function(response)
            {
                ResourceService.getResource("itemList").set(response);

            })
            .fail(function()
            {
                NotificationService.error("Error while searching").closeAfter(5000);
            });
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
        searchParams.orderBy = orderBy;
        _getItemList();
    }

    function setOrderByKey(orderByKey)
    {
        searchParams.orderByKey = orderByKey;
        _getItemList();
    }

    function setPage(page)
    {
        searchParams.page = page;
        _getItemList();
    }
})(jQuery);
