import ApiService from "services/ApiService";
import {updateItemListUrlParams}from "services/ItemListUrlService";

const state =
    {
        facets: [],
        selectedFacets: [],
        page: null,
        sorting: "texts.name1_asc",
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
            state.facets = facets || [];
        },

        setPriceFacet(state, {priceMin, priceMax})
        {
            const currency = App.activeCurrency;
            const priceFacet = {
                id: "price",
                priceMin: priceMin,
                priceMax: priceMax
            };

            // TODO FORMAT PRICE
            if (!priceMax.length)
            {
                priceFacet.name = "ab " + priceMin + currency;
            }
            else if (!priceMin.length)
            {
                priceFacet.name = "bis " + priceMax + currency;
            }
            else
            {
                priceFacet.name = priceMin + currency + " - " + priceMax + currency;
            }

            state.facets.find(facet => facet.type == "price").values[0] = priceFacet;
        },

        setPriceFacetTag(state)
        {
            const priceFacet = state.facets.find(facet => facet.type == "price").values[0];

            if (state.selectedFacets.find(facet => facet.id == "price"))
            {
                state.selectedFacets.find(facet => facet.id == "price").priceMin = priceFacet.priceMin;
                state.selectedFacets.find(facet => facet.id == "price").priceMax = priceFacet.priceMax;
                state.selectedFacets.find(facet => facet.id == "price").name = priceFacet.name;
            }
            else
            {
                state.selectedFacets.push(priceFacet);
            }
        },

        removePriceFacet(state)
        {
            state.selectedFacets = state.selectedFacets.filter(facet => facet.id != "price");
        },

        setSelectedFacetsByIds(state, selectedFacetIds)
        {
            let selectedFacets = [];

            if (selectedFacetIds.length > 0)
            {
                for (const facet of state.facets)
                {
                    selectedFacets = selectedFacets.concat(
                        facet.values.filter(facetValue =>
                        {
                            return selectedFacetIds.some(facetId => facetId === facetValue.id + "");
                        })
                    );
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
            if (facetValue.id != "price")
            {
                commit("toggleSelectedFacet", facetValue);
            }
            else
            {
                commit("removePriceFacet");
            }

            commit("setItemListPage", 1);

            dispatch("retrieveItemList");
        },

        selectPriceFacet({dispatch, commit}, {priceMin, priceMax})
        {
            commit("setPriceFacet", {priceMin: priceMin, priceMax: priceMax});
            commit("setPriceFacetTag");

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
                        facets              : getters.selectedFacetIdsForUrl.toString(),
                        priceMin            : state.selectedFacets.find(facet => facet.id == "price") ? state.selectedFacets.find(facet => facet.id == "price").priceMin : "",
                        priceMax            : state.selectedFacets.find(facet => facet.id == "price") ? state.selectedFacets.find(facet => facet.id == "price").priceMax : "",
                        categoryId          : rootState.navigation.currentCategory ? rootState.navigation.currentCategory.id : null,
                        template            : "Ceres::ItemList.ItemListView"
                    };
                const url = searchParams.categoryId ? "/rest/io/category" : "/rest/io/item/search";

                updateItemListUrlParams(searchParams);
                commit("setIsItemListLoading", true);

                ApiService.get(url, searchParams)
                    .done(data =>
                    {
                        commit("setItemListItems", data.itemList.documents);
                        commit("setItemListTotalItems", data.itemList.total);
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
        }
    };

const getters =
    {
        selectedFacetIds(state)
        {
            const selectedFacetIds = [];

            state.selectedFacets.every(facet => selectedFacetIds.push(facet.id));

            return selectedFacetIds;
        },

        selectedFacetIdsForUrl(state)
        {
            const selectedFacetIds = [];

            state.selectedFacets.every(facet => selectedFacetIds.push(facet.id));

            return selectedFacetIds.filter(facet => facet != "price");
        }
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
