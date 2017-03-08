var ApiService = require("services/ApiService");
// var NotificationService = require("services/NotificationService");
var ResourceService = require("services/ResourceService");
var UrlService = require("services/UrlService");

module.exports = (function($)
{
    return {
        getFacetValues      : _getFacetValues,
        setFacetValues      : _setFacetValues,
        removeFacetValue    : _removeFacetValue,
        addFacetValue       : _addFacetValue,
        applyFacets         : _applyFacets
    };

    function _getFacetValues()
    {
        return ResourceService.getResource("facetParams").val();
    }

    function _setFacetValues(facets)
    {
        ResourceService.getResource("facetParams").set(facets);
    }

    function _applyFacets(facets, categoryId)
    {
        _setFacetValues(facets);
        _updateUrl(facets);
        _sendFacetCall(facets, categoryId);
    }

    function _removeFacetValue(filterId)
    {
        var filterParams = ResourceService.getResource("facetParams").val();
        var index = filterParams.indexOf(filterId);

        if (index > -1)
        {
            filterParams.splice(index, 1);
        }
    }

    function _addFacetValue(filterId)
    {
        var filterParams = ResourceService.getResource("facetParams").val();

        filterParams.push(filterId);
    }

    function _setIsLoading(isLoading)
    {
        ResourceService.getResource("isLoading").set(isLoading);
    }

    function _sendFacetCall(facets, categoryId)
    {
        var url = categoryId ? "/rest/io/category" : "/rest/io/item/search";
        var template = categoryId ? "Ceres::Category.Item.CategoryItem" : "Ceres::ItemList.ItemListView";

        _setIsLoading(true);

        ApiService.get(url, {template: template, categoryId: categoryId, facets: facets.toString()})
            .done(function(response)
            {
                _setIsLoading(false);
                ResourceService.getResource("itemList").set(response);
                ResourceService.getResource("facets").set(response.facets);
            })
            .fail(function(response)
            {
                _setIsLoading(false);
                console.log("ERRRRROOOOOOOOOOOOOR");
            });
    }

    function _updateUrl(facets)
    {
        var urlParams = UrlService.getUrlParams(document.location.search);

        if (facets.length > 0)
        {
            urlParams.facets = facets.toString();
        }
        else
        {
            delete urlParams.facets;
        }

        UrlService.setUrlParams(urlParams);
    }
})(jQuery);
