import UrlService from "services/UrlService";

const state =
    {
        facets: [],
        selectedFacets: [],
        page: null,
        sorting: null,
        isLoading: false,
        itemsPerPage: null,
        searchString: null
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
        }
    };

const actions =
    {
        selectFacet({commit}, facetValue)
        {
            commit("toggleSelectedFacet", facetValue);
            // set page = 1;
        },

        selectItemListPage({dispatch, commit}, page)
        {
            commit("setItemListPage", page);
            // set url params/fire get item list

            page = (page > 1) ? page : null;
            UrlService.setUrlParam("page", page);

            dispatch("retrieveItemList");
        },

        selectItemListSorting({dispatch, commit}, sorting)
        {
            commit("setItemListSorting", sorting);
            commit("setItemListPage", 1);

            // if (App.isSearch)
            // {
            //     sorting = (sorting !== App.config.defaultSortingSearch) ? sorting : null;
            // }
            // else
            // {
            //     sorting = (sorting !== App.config.defaultSorting) ? sorting : null;
            // }

            // UrlService.setUrlParam("sorting", sorting);
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

        retrieveItemList({state, dispatch, commit})
        {
            return new Promise((resolve, reject) =>
            {
                console.log("TODO retrieve items");
                // ApiService.get("TODO", {TODO})
                //     .done(data =>
                //     {
                //         resolve(data);
                //     })
                //     .fail(error =>
                //     {
                //         reject(error);
                //     });
            });
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
