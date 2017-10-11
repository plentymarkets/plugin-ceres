// import ApiService from "services/ApiService";

const state =
    {
        variation: {},
        variationList: []
    };

const mutations =
    {
        setVariation(state, variation)
        {
            state.variation = variation;
        },

        setVariationList(state, variationList)
        {
            state.variationList = variationList;
        },

        setVariationOrderProperty(state, {propertyId, value})
        {
            const properties = state.variation.documents[0].data.properties;
            const prop = properties.find(property => property.property.id === propertyId);

            if (prop)
            {
                prop.property.value = value;
            }
        }
    };

const actions =
    {
    };

const getters =
    {
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
