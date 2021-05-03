const ApiService = require("../../../services/ApiService");

const state = () => ({
    attributes: [],
    isVariationSelected: true,
    selectedAttributes: {},
    selectedUnit: null,
    units: [],
    variations: [],
    variationsLoading: false
});

const mutations =
    {
        setIsVariationSelected(state, isVariationSelected)
        {
            state.isVariationSelected = !!isVariationSelected;
        },

        setItemAttributes(state, attributes)
        {
            state.attributes = attributes;
        },

        setItemSelectedAttributes(state, selectedAttributes)
        {
            state.selectedAttributes = selectedAttributes;
        },

        selectItemAttribute(state, { attributeId, attributeValueId })
        {
            state.selectedAttributes[attributeId] = attributeValueId;
        },

        selectItemUnit(state, selectedUnit)
        {
            state.selectedUnit = selectedUnit;
        },

        setItemVariations(state, variations)
        {
            state.variations = variations;
        },

        addItemVariations(state, variations)
        {
            state.variations = state.variations || [];
            state.variations.push(...variations);

            state.units = state.units || [];
            for (const variation of variations)
            {
                state.units[variation.unitCombinationId] = variation.unitName;
            }
        },

        setVariationsLoading(state, loading)
        {
            state.variationsLoading = loading;
        },

        setUnits(state, units)
        {
            state.units = units;
        }
    };

const actions =
    {
        // eslint-disable-next-line complexity
        setVariationSelect({ commit, dispatch }, variationSelect)
        {
            const attributes         = variationSelect.attributes;
            const variations         = variationSelect.variations;
            const initialVariation   = variations.find(variation => variationSelect.initialVariationId === parseInt(variation.variationId));
            const initialUnit        = initialVariation && initialVariation.unitCombinationId || null;
            const selectedAttributes = {};
            const units              = {};

            for (const attribute of attributes)
            {
                let variationAttribute;

                if ((App.config.item.showPleaseSelect && variationSelect.isPleaseSelectOption) || !initialVariation)
                {
                    selectedAttributes[attribute.attributeId] = -1;
                }
                else
                {
                    variationAttribute = initialVariation.attributes.find(variationAttribute => variationAttribute.attributeId === attribute.attributeId);
                    selectedAttributes[attribute.attributeId] = variationAttribute ? variationAttribute.attributeValueId : null;
                }

            }

            for (const variation of variations)
            {
                units[variation.unitCombinationId] = variation.unitName;
            }

            if (variationSelect.afterKey)
            {
                dispatch("fetchVariations", {
                    itemId: variationSelect.itemId,
                    afterKey: variationSelect.afterKey
                });
            }

            commit("selectItemUnit", initialUnit);
            commit("setItemAttributes", attributes);
            commit("setItemSelectedAttributes", selectedAttributes);
            commit("setItemVariations", variations);
            commit("setUnits", units);
        },

        fetchVariations({ commit, dispatch }, { afterKey, itemId })
        {
            return new Promise((resolve, reject) =>
            {
                commit("setVariationsLoading", true);
                ApiService
                    .get("/rest/io/variations/map", {
                        itemId: itemId,
                        afterKey: afterKey
                    })
                    .done(response =>
                    {
                        if (response.variations && response.variations.length)
                        {
                            commit("addItemVariations", response.variations);
                        }
                        if (response.afterKey)
                        {
                            dispatch("fetchVariations", {
                                itemId: itemId,
                                afterKey: response.afterKey
                            });
                        }
                        else
                        {
                            commit("setVariationsLoading", false);
                        }

                        resolve();
                    })
                    .fail(error =>
                    {
                        commit("setVariationsLoading", false);
                        reject(error);
                    });
            });
        }
    };

const getters =
    {
    };

export default
{
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
