import UrlService from "services/UrlService";

export function updateItemListUrlParams(searchParams)
{
    const urlParams = {};
    const defaultItemsPerPage = App.config.pagination.columnsPerPage * App.config.pagination.rowsPerPage[0];

    urlParams.query = (searchParams.query && searchParams.query.length > 0) ? searchParams.query : null;
    urlParams.items = (searchParams.items !== defaultItemsPerPage) ? searchParams.items : null;
    urlParams.page = (searchParams.page > 1) ? searchParams.page : null;
    urlParams.facets = (searchParams.facets.length > 0) ? searchParams.facets : null;
    urlParams.priceMin = (searchParams.priceMin.length > 0) ? searchParams.priceMin : null;
    urlParams.priceMax = (searchParams.priceMax.length > 0) ? searchParams.priceMax : null;

    if (App.isSearch)
    {
        urlParams.sorting = (searchParams.sorting !== App.config.sorting.defaultSortingSearch) ? searchParams.sorting : null;
    }
    else
    {
        urlParams.sorting = (searchParams.sorting !== App.config.sorting.defaultSorting) ? searchParams.sorting : null;
    }

    var newUrlParams = UrlService.getUrlParams(document.location.search);

    for (const urlParamKey in urlParams)
    {

        if (urlParams[urlParamKey] !== null)
        {
            newUrlParams[urlParamKey] = urlParams[urlParamKey];
        }
        else
        {
            delete newUrlParams[urlParamKey];
        }

    }

    UrlService.setUrlParams(newUrlParams);
}

export default {
    updateItemListUrlParams
};
