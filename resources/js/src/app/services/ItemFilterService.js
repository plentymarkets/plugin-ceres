// var ApiService = require("services/ApiService");
// var NotificationService = require("services/NotificationService");
// var ResourceService = require("services/ResourceService");
var UrlService = require("services/UrlService");

module.exports = (function($)
{
    var filterParams =
        {

        };

    return {
        getFilterValuesByName : _getFilterValuesByName
    };

    // function _getItemList()
    // {
    //     if (searchParams.searchString.length >= 3)
    //     {
    //         UrlService.setUrlParams(searchParams);
    //         ResourceService.getResource("itemList").set({});
    //
    //         return ApiService.get("/rest/io/item/search", {searchString: searchParams.searchString}, {searchParams: searchParams}, {
    //             template: "Ceres::ItemList.ItemListView"
    //         })
    //             .done(function(response)
    //             {
    //                 ResourceService.getResource("itemList").set(response);
    //             })
    //             .fail(function()
    //             {
    //                 NotificationService.error("Error while searching").closeAfter(5000);
    //             });
    //     }
    //
    //     return null;
    // }
    //
    // /**
    //  * @param filter
    //  */
    // function setFilter(filter)
    // {
    //     var queryParams = UrlService.getUrlParams(filter);
    //
    //     for (var key in queryParams)
    //     {
    //         filterParams[key] = queryParams[key];
    //     }
    // }

    // function _getFilterValues()
    // {
    //     filterParams =
    //         filterParams ?
    //         UrlService.getUrlParams(document.location.search) :
    //         filterParams;
    //
    //     var filterValues = {};
    //
    //     console.log(filterParams);
    //
    //     for (var key in filterParams)
    //     {
    //         var newKey = key.splice(2, key.length);
    //         filterValues[newKey] = filterParams[key].split(",");
    //     }
    //
    //     console.log(filterValues);
    //
    //     return filterValues;
    // }

    function _getFilterValuesByName(facetName)
    {
        filterParams =
            filterParams ?
            UrlService.getUrlParams(document.location.search) :
            filterParams;

        console.log(filterParams);

        for (var key in filterParams)
        {
            key = key.slice(2, key.length);
            if (key.toLowerCase() == facetName.toLowerCase())
            {
                return filterParams[key].split(",");
            }
        }

        return [];
    }

})(jQuery);
