import UrlService from "services/UrlService";
import ApiService from "services/ApiService";

const state =
    {
        facets: [],
        selectedFacets: [],
        page: null,
        sorting: null,
        isLoading: false,
        itemsPerPage: null,
        searchString: null,
        items: [],
        totalItems: null
    };

const mutations =
    {
        setFacets(state, facets)
        {
            state.facets = facets;
        },

        setSelectedFacetsByIds(state, selectedFacetIds)
        {
            let selectedFacets = [];

            if (selectedFacetIds.length > 0)
            {
                for (const facet of state.facets)
                {
                    selectedFacets = selectedFacets.concat(facet.values.filter(facetValue => selectedFacetIds.includes(facetValue.id)));
                }
            }

            state.selectedFacets = selectedFacets;
        },

        toggleSelectedFacet(state, facetValue)
        {
            if (!state.selectedFacets.find(selectedFacet => selectedFacet.id === facetValue.id))
            {
                state.selectedFacets.push(facetValue);
            }
            else
            {
                state.selectedFacets = state.selectedFacets.filter(selectedFacet => selectedFacet.id !== facetValue.id);
            }
        },

        setItemListPage(state, page)
        {
            state.page = page;
        },

        setItemListSorting(state, sorting)
        {
            state.sorting = sorting;
        },

        setItemsPerPage(state, itemsPerPage)
        {
            state.itemsPerPage = itemsPerPage;
        },

        setIsItemListLoading(state, isLoading)
        {
            state.isLoading = isLoading;
        },

        setItemListSearchString(state, searchString)
        {
            state.searchString = searchString;
        },

        setItemListItems(state, items)
        {
            state.items = items;
        },

        setItemListTotalItems(state, totalItems)
        {
            state.totalItems = totalItems;
        }
    };

const actions =
    {
        selectFacet({dispatch, commit}, facetValue)
        {
            commit("toggleSelectedFacet", facetValue);
            commit("setItemListPage", 1);

            dispatch("retrieveItemList");
        },

        selectItemListPage({dispatch, commit}, page)
        {
            commit("setItemListPage", page);

            dispatch("retrieveItemList");
        },

        selectItemListSorting({dispatch, commit}, sorting)
        {
            commit("setItemListSorting", sorting);
            commit("setItemListPage", 1);

            dispatch("retrieveItemList");
        },

        selectItemsPerPage({dispatch, commit}, itemsPerPage)
        {
            commit("setItemsPerPage", itemsPerPage);
            commit("setItemListPage", 1);

            dispatch("retrieveItemList");
        },

        searchItems({dispatch, commit}, searchString)
        {
            commit("setItemListSearchString", searchString);
            commit("setItemListPage", 1);
            commit("setSelectedFacetsByIds", []);

            dispatch("retrieveItemList");
        },

        retrieveItemList({state, dispatch, commit, getters, rootState})
        {
            return new Promise((resolve, reject) =>
            {
                const searchParams =
                    {
                        query               : state.searchString,
                        items               : state.itemsPerPage,
                        sorting             : state.sorting,
                        page                : state.page,
                        facets              : getters.selectedFacetIds,
                        categoryId          : rootState.navigation.currentCategory ? rootState.navigation.currentCategory.id : null,
                        template            : "Ceres::ItemList.ItemListView",
                        variationShowType   : App.config.variationShowType
                    };
                const url = searchParams.categoryId ? "/rest/io/category" : "/rest/io/item/search";

                dispatch("updateItemListUrlParams", searchParams);
                commit("setIsItemListLoading", true);

                ApiService.get(url, searchParams)
                    .done(data =>
                    {
                        commit("setItemListItems", data.documents);
                        commit("setItemListTotalItems", data.total);
                        commit("setFacets", data.facets);
                        commit("setIsItemListLoading", false);
                        resolve(data);
                    })
                    .fail(error =>
                    {
                        commit("setIsItemListLoading", false);
                        reject(error);
                    });
            });
        },

        updateItemListUrlParams({state}, searchParams)
        {
            const urlParams = {};

            urlParams.query = (searchParams.query && searchParams.query.length > 0) ? searchParams.query : null;
            urlParams.items = (searchParams.items !== App.config.defaultItemsPerPage) ? searchParams.items : null;
            urlParams.page = (searchParams.page > 1) ? searchParams.page : null;
            urlParams.facets = (searchParams.facets.toString().length > 0) ? searchParams.facets.toString() : null;
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
    };

const getters =
    {
        selectedFacetIds(state)
        {
            const selectedFacetIds = [];

            state.selectedFacets.every(facet => selectedFacetIds.push(facet.id));

            return selectedFacetIds;
        }
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
