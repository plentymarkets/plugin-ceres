const state =
    {
        facets: [],
        selectedFacets: []
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
        }
    };

const actions =
    {
        selectFacet({state, commit}, facetValue)
        {
            commit("toggleSelectedFacet", facetValue);
            // set page = 1;
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
