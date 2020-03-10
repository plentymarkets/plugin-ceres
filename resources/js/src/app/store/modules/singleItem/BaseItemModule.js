import ApiService from "../../../services/ApiService";
import ItemModule from "./ItemModule";

const state =
    {
        cachedVariations: {}
    };

const mutations =
    {
        addVariationToCache(state, variation)
        {
            const variationId = variation.documents[0].data.variation.id;

            if (!state.cachedVariations[variationId])
            {
                state.cachedVariations[variationId] = variation;
            }
        }
    };

const actions =
    {
        initVariation({ state, commit }, variation)
        {
            // register a nested module for the main item
            const itemId = variation.documents[0].data.item.id;

            ceresStore.registerModule(["items", itemId], ItemModule);
            commit(`${itemId}/setVariation`, variation);

            // rest call for sets if set comps set
            const setComponentIds = variation.documents[0].data.setComponentVariationIds;

            if (setComponentIds.length > 0)
            {
                ApiService.get("/rest/io/variations", { variationIds: setComponentIds, resultFieldTemplate: "SingleItem" })
                    .done(components =>
                    {
                        for (const component of Object.values(components.documents))
                        {
                            const itemId = component.data.item.id;
                            const whackData = { documents: [component] };

                            ceresStore.registerModule(["items", itemId], ItemModule);
                            commit(`${itemId}/setVariation`, whackData);
                        }
                    });
            }
        }
    };

const getters =
    {

    };

export default
{
    state,
    actions,
    mutations,
    getters
};
