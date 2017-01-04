var ApiService = require("services/ApiService");
var NotificationService = require("services/NotificationService");
var ResourceService = require("services/ResourceService");

module.exports = (function($)
{
    var searchParams =
        {
            searchString: "",
            itemsPerPage: 20,
            orderBy: "itemName",
            orderByKey: "ASC",
            page: 1,
            isLoading: false
        };

    return {
        setSearchString: setSearchString,
        setItemsPerPage: setItemsPerPage,
        setOrderBy: setOrderBy,
        setPage: setPage,
        setSearchParams: setSearchParams
    };

    function _getItemList()
    {
        if (searchParams.searchString.length >= 3)
        {
            _updateUrl();

            ResourceService.getResource("itemList").set({});
            _setIsLoading(true);

            return ApiService.get("/rest/item/search", searchParams)
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
        searchParams.isLoading = isLoading;
        ResourceService.getResource("itemSearch").set(searchParams);
    }

    /**
     * ?searchString=searchString&itemsPerPage=itemsPerPage&orderBy=orderBy&orderByKey=orderByKey&page=page
     * @param urlParams
     */
    function setSearchParams(urlParams)
    {
        var queryParams = _getQueryParams(urlParams);

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

    function _getQueryParams(searchString)
    {
        if (searchString)
        {
            var tokens;
            var params = {};
            var regex = /[?&]?([^=]+)=([^&]*)/g;

            searchString = searchString.split("+").join(" ");

            // eslint-disable-next-line
            while (tokens = regex.exec(searchString))
            {
                params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
            }

            return params;
        }

        return null;
    }

    function _updateUrl()
    {
        var url = window.location.pathname + "?" + $.param(searchParams);
        var title = document.getElementsByTagName("title")[0].innerHTML;

        window.history.replaceState({}, title, url);
    }

})(jQuery);
