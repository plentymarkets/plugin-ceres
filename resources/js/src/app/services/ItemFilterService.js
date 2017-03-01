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
        getFilterValuesByName : _getFilterValuesByName,
        getFilterValues : _getFilterValues
    };

    function _getFilterValues()
    {
        filterParams =
            filterParams ?
            UrlService.getUrlParams(document.location.search) :
            filterParams;

        var filterValues = {};

        for (var key in filterParams)
        {
            var newKey = key.slice(2, key.length - 1);

            filterValues[newKey] = filterParams[key].split(",");
        }

        return filterValues;
    }

    function _getFilterValuesByName(facetName)
    {
        filterParams =
            filterParams ?
            UrlService.getUrlParams(document.location.search) :
            filterParams;

        console.log(filterParams);

        for (var key in filterParams)
        {
            var newKey = key.slice(2, key.length - 1);

            if (newKey.toLowerCase() == facetName.toLowerCase())
            {
                return filterParams[key].split(",");
            }
        }

        return [];
    }

})(jQuery);
