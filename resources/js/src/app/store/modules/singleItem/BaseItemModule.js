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
            // for (const variant of Object.values(vars))
            // {
            //     const itemId = variant.documents[0].data.item.id;

            //     ceresStore.registerModule(["items", variant.documents[0].data.item.id], ItemModule);
            //     commit(`${itemId}/setVariation`, variant);
            // }
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
