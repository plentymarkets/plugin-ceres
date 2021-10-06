import UrlService from "./UrlService";

export function getItemListUrlParams(searchParams)
{
    const urlParams = {};
    const defaultItemsPerPage = App.config.pagination.itemsPerPage;

    urlParams.query = (searchParams.query && searchParams.query.length > 0) ? searchParams.query : null;
    urlParams.items = (searchParams.items !== defaultItemsPerPage) ? searchParams.items : null;
    urlParams.page = searchParams.page > 1 ? searchParams.page : null;
    urlParams.facets = searchParams.facets?.length > 0 ? searchParams.facets : null;
    urlParams.priceMin = searchParams.priceMin ? searchParams.priceMin : null;
    urlParams.priceMax = searchParams.priceMax ? searchParams.priceMax : null;

    if (App.isSearch)
    {
        urlParams.sorting = (searchParams.sorting !== App.config.sorting.defaultSortingSearch) && searchParams.sorting.length > 0 ? searchParams.sorting : null;
    }
    else
    {
        urlParams.sorting = (searchParams.sorting !== App.config.sorting.defaultSorting) && searchParams.sorting.length > 0? searchParams.sorting : null;
    }

    const newUrlParams = UrlService.getUrlParams(document.location.search);

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

    return newUrlParams;
}

export default {
    getItemListUrlParams
};
