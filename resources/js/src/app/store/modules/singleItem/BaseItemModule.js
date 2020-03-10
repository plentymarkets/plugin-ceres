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
        initVariation(state, variation)
        {
            // rest call for sets if set comps set
            // register a nested module `nested/myModule`
            ceresStore.registerModule(["baseItem", variation.documents[0].data.item.id], ItemModule);

            for (let i = 0; i <= 10; i++)
            {
                ceresStore.registerModule(["baseItem", i], ItemModule);
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
