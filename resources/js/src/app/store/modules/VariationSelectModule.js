const state =
    {
        attributes: [],
        isVariationSelected: true,
        selectedAttributes: {},
        selectedUnit: null,
        units: [],
        variations: [],
        addPleaseSelectOption: false
    };

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

        setUnits(state, units)
        {
            state.units = units;
        },

        setPleaseSelectOption(state, option)
        {
            state.addPleaseSelectOption = option;
        }
    };

const actions =
    {
        // eslint-disable-next-line complexity
        setVariationSelect({ commit }, variationSelect)
        {
            const attributes         = variationSelect.attributes;
            const variations         = variationSelect.variations;
            const initialVariation   = variations.find(variation => variationSelect.initialVariationId === parseInt(variation.variationId));
            const initialUnit        = initialVariation && initialVariation.unitCombinationId || null;
            const selectedAttributes = {};
            const units              = {};
            const addPleaseSelectOption = variationSelect.addPleaseSelectOption;

            for (const attribute of attributes)
            {
                let variationAttribute;


                if (initialVariation && !addPleaseSelectOption)
                {
                    variationAttribute = initialVariation.attributes.find(variationAttribute => variationAttribute.attributeId === attribute.attributeId);
                    selectedAttributes[attribute.attributeId] = variationAttribute ? variationAttribute.attributeValueId : null;
                }
                else
                {
                    selectedAttributes[attribute.attributeId] = -1;
                }

            }

            for (const variation of variations)
            {
                units[variation.unitCombinationId] = variation.unitName;
            }

            commit("selectItemUnit", initialUnit);
            commit("setItemAttributes", attributes);
            commit("setItemSelectedAttributes", selectedAttributes);
            commit("setItemVariations", variations);
            commit("setUnits", units);
            commit("setPleaseSelectOption", addPleaseSelectOption);
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
