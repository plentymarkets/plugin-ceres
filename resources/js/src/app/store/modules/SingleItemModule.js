const state =
    {
        variation: {},
        variationList: [],
        variationOrderQuantity: 1,
        variationMarkInvalidProperties: false
    };

const mutations =
    {
        setVariation(state, variation)
        {
            state.variation = variation;
            if (variation.documents.length > 0 && variation.documents[0].data.variation)
            {
                state.variationOrderQuantity = variation.documents[0].data.variation.minimumOrderQuantity || 1;
            }
        },

        setVariationList(state, variationList)
        {
            state.variationList = variationList;
        },

        setVariationOrderProperty(state, {propertyId, value})
        {
            const index = state.variation.documents[0].data.properties.findIndex(property => property.property.id === propertyId);

            if (index >= 0)
            {
                Vue.set(state.variation.documents[0].data.properties[index], "property",
                    {
                        ...state.variation.documents[0].data.properties[index].property,
                        value: value
                    });
            }
        },

        setVariationOrderQuantity(state, quantity)
        {
            state.variationOrderQuantity = quantity;
        },

        setVariationMarkInvalidProps(state, markFields)
        {
            state.variationMarkInvalidProperties = !!markFields;
        }
    };

const actions =
    {
    };

const getters =
    {
        variationPropertySurcharge(state)
        {
            if (!state || !state.variation.documents)
            {
                return 0;
            }

            let sum = 0;

            if (state.variation.documents[0].data.properties)
            {
                const addedProperties = state.variation.documents[0].data.properties.filter(property =>
                    {
                    return !!property.property.value;
                });

                for (const property of addedProperties)
                    {
                    sum += property.property.surcharge;
                }
            }

            return sum;
        },

        variationGraduatedPrice(state)
        {
            if (!state || !state.variation.documents)
            {
                return null;
            }

            const calculatedPrices = state.variation.documents[0].data.prices;
            const graduatedPrices = calculatedPrices.graduatedPrices;

            let returnPrice;

            if (graduatedPrices && graduatedPrices[0])
            {
                const prices = graduatedPrices.filter(price =>
                {
                    return parseFloat(state.variationOrderQuantity) >= price.minimumOrderQuantity;
                });

                if (prices[0])
                {
                    returnPrice = prices.reduce((prev, current) => (prev.minimumOrderQuantity > current.minimumOrderQuantity) ? prev : current);
                    // returnPrice = returnPrice.unitPrice.value;
                }
            }

            return returnPrice || calculatedPrices.default;
        },

        variationTotalPrice(state, getters, rootState, rootGetters)
        {
            const graduatedPrice = getters.variationGraduatedPrice;

            return getters.variationPropertySurcharge + (graduatedPrice ? getters.variationGraduatedPrice.unitPrice.value : 0);
        },

        variationGroupedProperties(state)
        {
            if (!state || !state.variation.documents)
            {
                return [];
            }

            if (state.variation.documents[0].data.properties)
            {
                const orderPropertyList = state.variation.documents[0].data.properties.filter(property => property.property.isShownOnItemPage);
                const groupIds = [... new Set(orderPropertyList.map(property => property.group && property.group.id))];
                const groups = [];

                for (const id of groupIds)
                {
                    const groupProperties = orderPropertyList.filter(property =>
                    {
                        return property.group === id || property.group && property.group.id === id;
                    });

                    groups.push({
                        group: groupProperties[0].group,
                        properties: groupProperties.map(property => property.property),
                        touched: false
                    });
                }

                return groups;
            }

            return [];
        },

        variationMissingProperties(state, getters)
        {
            if (state && state.variation.documents && state.variation.documents[0].data.properties && App.config.item.requireOrderProperties)
            {
                let missingProperties = state.variation.documents[0].data.properties.filter(property =>
                {
                    // selection isn't supported yet
                    return property.property.isShownOnItemPage && property.property.valueType !== "selection" && !property.property.value && property.property.valueType !== "file";
                });

                if (missingProperties.length)
                {
                    let radioInformation = state.variation.documents[0].data.properties.map(property =>
                    {
                        if (property.group && property.group.orderPropertyGroupingType === "single" && property.property.valueType === "empty")
                        {
                            return {
                                groupId: property.group.id,
                                propertyId: property.property.id,
                                hasValue: !!property.property.value
                            };
                        }
                        return null;
                    });

                    radioInformation = [... new Set(radioInformation.filter(id => id))];

                    const radioIdsToRemove = [];

                    for (const radioGroupId of [... new Set(radioInformation.map(radio => radio.groupId))])
                    {
                        const radioGroupToClean = radioInformation.find(radio => radio.groupId === radioGroupId && radio.hasValue);

                        if (radioGroupToClean)
                        {
                            for (const radio of radioInformation.filter(radio => radio.groupId === radioGroupToClean.groupId && !radio.hasValue))
                            {
                                radioIdsToRemove.push(radio.propertyId);
                            }
                        }
                    }

                    missingProperties = missingProperties.filter(property => !radioIdsToRemove.includes(property.property.id));
                }

                return missingProperties;
            }

            return [];
        }
    };

export default
{
    state,
    mutations,
    actions,
    getters
};
