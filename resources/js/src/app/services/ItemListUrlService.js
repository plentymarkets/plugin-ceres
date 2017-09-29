import UrlService from "services/UrlService";

export function updateItemListUrlParams(searchParams)
{
    const urlParams = {};

    urlParams.query = (searchParams.query && searchParams.query.length > 0) ? searchParams.query : null;
    urlParams.items = (searchParams.items !== parseInt(App.config.defaultItemsPerPage)) ? searchParams.items : null;
    urlParams.page = (searchParams.page > 1) ? searchParams.page : null;
    urlParams.facets = (searchParams.facets.length > 0) ? searchParams.facets : null;
    if (App.isSearch)
    {
        urlParams.sorting = (searchParams.sorting !== App.config.defaultSortingSearch) ? searchParams.sorting : null;
    }
    else
    {
        urlParams.sorting = (searchParams.sorting !== App.config.defaultSorting) ? searchParams.sorting : null;
    }

    for (const urlParamKey in urlParams)
    {
        UrlService.setUrlParam(urlParamKey, urlParams[urlParamKey]);
    }
}

export default {
    updateItemListUrlParams
};
