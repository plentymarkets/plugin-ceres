import { getItemListUrlParams } from "../../services/ItemListUrlService";
import { navigateToParams } from "../../services/UrlService";
import TranslationService from "../../services/TranslationService";

const state = () => ({
    facets: [],
    selectedFacets: [],
    page: null,
    sorting: "",
    isLoading: false,
    itemsPerPage: null,
    searchString: null,
    items: [],
    totalItems: null
});

const mutations =
    {
        addFacets(state, facets)
        {
            for (const facet of facets)
            {
                if (!state.facets.find(fac => fac.id === facet.id))
                {
                    state.facets.push(facet);
                    state.selectedFacets = state.selectedFacets.concat(_getSelectedFacetValues(facet));
                }
            }
        },

        /**
         * @deprecated use addFacets instead
         */
        setFacets(state, facets)
        {
            state.facets = facets || [];
        },

        setPriceFacet(state, { priceMin, priceMax })
        {
            const priceFacet = {
                id: "price",
                priceMin,
                priceMax
            };

            priceFacet.name = _getPriceFacetName(priceMin, priceMax);

            state.facets.find(facet => facet.type === "price").values[0] = priceFacet;
        },

        setPriceFacetTag(state)
        {
            const priceFacet = state.facets.find(facet => facet.type === "price").values[0];
            const selectedPriceFacet = state.selectedFacets.find(facet => facet.id === "price");

            if (selectedPriceFacet)
            {
                Object.assign(selectedPriceFacet, priceFacet);
            }
            else
            {
                state.selectedFacets.push(priceFacet);
            }
        },

        removePriceFacet(state)
        {
            state.selectedFacets = state.selectedFacets.filter(facet => facet.id !== "price");
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

        resetAllSelectedFacets(state)
        {
            state.selectedFacets = [];
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
            state.itemsPerPage = parseInt(itemsPerPage);
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
        selectFacet({ dispatch, commit }, { facetValue })
        {
            if (facetValue.id === "price")
            {
                commit("removePriceFacet");
            }
            else
            {
                commit("toggleSelectedFacet", facetValue);
            }

            commit("setItemListPage", 1);
            dispatch("loadItemList");
        },

        selectPriceFacet({ dispatch, commit }, { priceMin, priceMax })
        {
            commit("setPriceFacet", { priceMin: priceMin, priceMax: priceMax });
            commit("setPriceFacetTag");
            commit("setItemListPage", 1);
            dispatch("loadItemList");
        },

        selectItemListPage({ dispatch, commit }, page)
        {
            commit("setItemListPage", page);

            dispatch("loadItemList");
        },

        selectItemListSorting({ dispatch, commit }, sorting)
        {
            commit("setItemListSorting", sorting);
            commit("setItemListPage", 1);

            dispatch("loadItemList");
        },

        selectItemsPerPage({ dispatch, commit }, itemsPerPage)
        {
            commit("setItemsPerPage", itemsPerPage);
            commit("setItemListPage", 1);

            dispatch("loadItemList");
        },

        searchItems({ dispatch, commit }, searchString)
        {
            commit("setItemListSearchString", searchString);
            commit("setItemListPage", 1);
            commit("setSelectedFacetsByIds", []);

            dispatch("loadItemList");
        },

        loadItemList({ state, commit, getters })
        {
            const selectedPriceFacet = state.selectedFacets.find(facet => facet.id === "price");
            const searchParams =
                {
                    query               : state.searchString,
                    items               : parseInt(state.itemsPerPage),
                    sorting             : state.sorting,
                    page                : state.page,
                    facets              : getters.selectedFacetIdsForUrl.toString(),
                    priceMin            : selectedPriceFacet ? selectedPriceFacet.priceMin : "",
                    priceMax            : selectedPriceFacet ? selectedPriceFacet.priceMax : ""
                };

            commit("setIsItemListLoading", true);
            navigateToParams(getItemListUrlParams(searchParams));
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

            return selectedFacetIds.filter(facet => facet !== "price");
        }
    };

function _getSelectedFacetValues(facet)
{
    if (!facet.values && facet.values.length <= 0)
    {
        return [];
    }

    const selectedFacets = [];

    facet.values.forEach((value) =>
    {
        if (value.id === "price")
        {
            value.name = _getPriceFacetName(value.priceMin, value.priceMax);
        }

        if (value.selected || value.id === "price")
        {
            selectedFacets.push(value);
        }
    });

    return selectedFacets;
}

function _getPriceFacetName(priceMin, priceMax)
{
    const priceMinFormatted = Vue.filter("currency").apply(Object, [priceMin]);
    const priceMaxFormatted = Vue.filter("currency").apply(Object, [priceMax]);

    let priceFacetName = "";

    if (!!priceMax && !!priceMin)
    {
        priceFacetName = priceMinFormatted + " - " + priceMaxFormatted;
    }
    else if (priceMin)
    {
        priceFacetName = TranslationService.translate("Ceres::Template.itemFrom") + priceMinFormatted;
    }
    else if (priceMax)
    {
        priceFacetName = TranslationService.translate("Ceres::Template.itemTo") + priceMaxFormatted;
    }

    return priceFacetName;
}

export default
{
    state,
    mutations,
    actions,
    getters
};
