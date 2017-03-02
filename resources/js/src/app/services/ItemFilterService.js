// var ApiService = require("services/ApiService");
// var NotificationService = require("services/NotificationService");
var ResourceService = require("services/ResourceService");
var UrlService = require("services/UrlService");

module.exports = (function($)
{
    var filterParams = {};

    return {
        getFilterValuesByName : _getFilterValuesByName,
        getFilterValues : _getFilterValues,
        setFilterByName : _setFilterByName,
        removeFilterValue : _removeFilterValue,
        addFilterValue : _addFilterValue
    };

    function _getFilterValues()
    {
        return ResourceService.getResource("facetParams").val();
    }

    function _removeFilterValue(filterId)
    {
        var filterParams = ResourceService.getResource("facetParams").val();
        var index = filterParams.indexOf(filterId);

        if (index > -1)
        {
            filterParams.splice(index, 1);
        }
    }

    function _addFilterValue(filterId)
    {
        var filterParams = ResourceService.getResource("facetParams").val();

        filterParams.push(filter);
    }

    function _getFilterValuesByName(facetName)
    {
        filterParams =
            filterParams ?
            UrlService.getUrlParams(document.location.search) :
            filterParams;

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

    function _setFilterByName(filterName, params)
    {
        var filterParamList = ResourceService.getResource("facetParams").val();

        filterParamList[filterName] = params;

        _updateUrlFromName(filterName, params);
        _sendFilterRequest();
    }

    function _sendFilterRequest()
    {
        // send request
    }

    function _updateUrlFromName(filterName, params)
    {
        var urlParamList =  UrlService.getUrlParams(document.location.search);

        urlParamList["f[" + filterName + "]"] = params.toString();

        var url = window.location.pathname + "?";
        var title = document.getElementsByTagName("title")[0].innerHTML;
        var delimiter = "";

        for (var urlParam in urlParamList)
        {
            url = url + delimiter + urlParam + "=" + urlParamList[urlParam];
            delimiter = "&";
        }

        console.log(url);

        window.history.replaceState({}, title, url);
    }

    // function _updateUrl()
    // {
    //     var filterParamList = ResourceService.getResource("filterParams").val();
    //     var urlParamList =  UrlService.getUrlParams(document.location.search);
    //
    //     for(var key in urlParamList)
    //     {
    //         if (key.indexOf("f[") != -1)
    //         {
    //             var newKey = key.slice(2, key.length - 1);
    //
    //             for(var filterParamKey in filterParamList)
    //             {
    //                 if(filterParamKey === newKey )
    //                 {
    //                     urlParamList[key] = filterParamList[filterParamKey];
    //                 }
    //                 else
    //                 {
    //                     urlParamList["f[" + filterParamKey + "]"] = filterParamList[filterParamKey];
    //                 }
    //             }
    //         }
    //     }
    // }
})(jQuery);
