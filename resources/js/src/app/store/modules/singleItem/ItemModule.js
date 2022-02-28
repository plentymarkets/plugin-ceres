import { isNullOrUndefined } from "../../../helper/utils";
import { setUrlByItem } from "../../../services/UrlService";
import Vue from "vue";

const ApiService = require("../../../services/ApiService");

const state = () => ({
    variation: {},
    variationCache: {},
    variationMarkInvalidProperties: false,
    variationOrderQuantity: 1,
    initialVariationId: 0,
    pleaseSelectVariationId: 0
});

const mutations =
    {
        setVariation(state, variation)
        {
            variation = normalizeOrderQuantities(variation);

            state.variationOrderQuantity = variation.documents[0].data.variation.minimumOrderQuantity;

            state.variation = variation;
            state.variationCache[variation.documents[0].id] = variation;

            if (state.initialVariationId <= 0)
            {
                state.initialVariationId = variation.documents[0].id;
            }
        },

        setPleaseSelectVariationId(state, variationId)
        {
            if (state.pleaseSelectVariationId <= 0 && variationId > 0)
            {
                state.pleaseSelectVariationId = variationId;
            }
        },

        setVariationOrderProperty(state, { propertyId, value })
        {
            const properties = state.variation.documents[0].data.properties;
            const index = properties.findIndex(property => property.property.id === propertyId);

            if (index >= 0)
            {
                const group = properties[index].group;
                const property = properties.find(prop => prop.property.id === propertyId);

                if (property && property.property.valueType === "empty" && group && group.orderPropertyGroupingType === "single")
                {
                    // reset all other radios in the group
                    properties.filter(prop => prop.group && prop.group.id === group.id && prop.property.id !== propertyId && prop.property.valueType === "empty")
                        .forEach(prop =>
                        {
                            prop.property.value = null;
                        });
                }

                Vue.set(properties[index], "property",
                    {
                        ...properties[index].property,
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
        },

        setVariationPropertySurcharges(state, basePrice)
        {
            if (state.variation.documents[0].data.properties)
            {
                for (const property of state.variation.documents[0].data.properties)
                {
                    if (!isNullOrUndefined(property.property.percentage) && (property.surcharge <= 0))
                    {
                        property.property.surcharge = basePrice * property.property.percentage / 100;
                    }
                }
            }
        }
    };

const actions =
    {
        loadVariation({ state, commit, getters, rootState, rootGetters }, variationId)
        {
            return new Promise(resolve =>
            {
                const variation = variationId <= 0
                    ? state.variationCache[state.pleaseSelectVariationId > 0 ? state.pleaseSelectVariationId : state.initialVariationId]
                    : state.variationCache[variationId];

                if (variation)
                {
                    commit("setVariation", variation);

                    if (!rootState.items.isItemSet)
                    {
                        setUrlByItem(variation.documents[0].data, variationId > 0);
                    }

                    resolve(variation);
                }
                else
                {
                    let keepVariationId = true;

                    if (variationId <= 0)
                    {
                        variationId = state.pleaseSelectVariationId;
                        keepVariationId = false;
                    }

                    const addToBasketLoadingId = rootState.items.isItemSet ? rootGetters[`${ rootState.items.itemSetId }/currentItemVariation`].variation.id : getters.currentItemVariation.variation.id;

                    commit("setIsAddToBasketLoading", addToBasketLoadingId, { root: true });

                    ApiService
                        .get(`/rest/io/variations/${variationId}`, { template: "Ceres::Item.SingleItem", setPriceOnly: rootState.items.isItemSet })
                        .done(response =>
                        {
                            // check if set component and replace relevant data
                            if (rootState.items.itemSetId > 0)
                            {
                                const itemSetId = rootState.items.itemSetId;
                                const setComponentMeta = rootState.items[itemSetId].variation.documents[0].data.setComponents.find(
                                    (setComponent) => setComponent.itemId === response.documents[0].data.item.id
                                );

                                response.documents[0].data.variation.minimumOrderQuantity = setComponentMeta.minimumOrderQuantity;
                                response.documents[0].data.variation.maximumOrderQuantity = setComponentMeta.maximumOrderQuantity;
                            }

                            // store received variation data for later reuse
                            commit("setVariation", response);
                            commit("setIsAddToBasketLoading", 0, { root: true });

                            if (!rootState.items.isItemSet)
                            {
                                setUrlByItem(response.documents[0].data, keepVariationId);
                            }

                            resolve(response);
                        });
                }
            });
        }
    };

const getters =
    {
        variationPropertySurcharge(state, getters)
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
                    if (!isNullOrUndefined(property.property.percentage) && (property.surcharge <= 0))
                    {
                        const surcharge = getters.variationBasePrice * property.property.percentage / 100;

                        sum += surcharge;
                    }
                    else
                    {
                        sum += property.surcharge || property.property.surcharge;
                    }
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

        variationBasePrice(state, getters, rootState, rootGetters)
        {
            if (getters.currentItemVariation.item.itemType === "set")
            {
                return rootGetters.itemSetTotalPrice;
            }
            else if (getters.currentItemVariation.item.itemType !== "set" && rootState.items.isItemSet)
            {
                return state.variation.documents[0].data.prices.set.price.value;
            }
            else
            {
                const graduatedPrice = getters.variationGraduatedPrice ? getters.variationGraduatedPrice.unitPrice.value : 0;

                if (!isNullOrUndefined(graduatedPrice) && state.variation.documents)
                {
                    return Vue.filter("specialOffer").apply(Object, [graduatedPrice, state.variation.documents[0].data.prices, "price", "value"]);
                }
            }

            return null;
        },

        variationTotalPrice(state, getters)
        {
            return getters.variationBasePrice + getters.variationPropertySurcharge;
        },

        variationGroupedProperties(state)
        {
            if (!state || !state.variation.documents)
            {
                return [];
            }

            if (state.variation.documents[0].data.properties)
            {
                const orderPropertyList = state.variation.documents[0].data.properties.filter(property => property.property.isShownOnItemPage && property.property.isOderProperty);
                const groupIds = [...new Set(orderPropertyList.map(property => property.group && property.group.id))];
                const groups = [];

                for (const id of groupIds)
                {
                    const groupProperties = orderPropertyList.filter(property =>
                    {
                        return property.group === id || property.group && property.group.id === id;
                    });

                    groups.push({
                        touched: false,
                        group: groupProperties[0].group,
                        properties: groupProperties.map(property =>
                        {
                            return { ...property.property, itemSurcharge: property.surcharge };
                        })
                    });
                }

                return groups;
            }

            return [];
        },

        variationMissingProperties(state, getters, rootState, rootGetters)
        {
            if (getters.currentItemVariation.item.itemType === "set")
            {
                let setMissingProperties = [];

                for (const itemId of rootState.items.setComponentIds)
                {
                    const componentMissingProperties = rootGetters[`${ itemId }/variationMissingProperties`];

                    setMissingProperties = [...setMissingProperties, ...componentMissingProperties];
                }

                return setMissingProperties;
            }
            else
            {
                if (state && state.variation.documents && state.variation.documents[0].data.properties)
                {
                    let missingProperties = [];

                    if (App.config.item.requireOrderProperties)
                    {
                        missingProperties = state.variation.documents[0].data.properties.filter(property =>
                        {
                            return property.property.isShownOnItemPage && !property.property.value && property.property.isOderProperty;
                        });
                    }
                    else if (state.variation.documents[0].data.hasRequiredOrderProperty)
                    {
                        missingProperties = state.variation.documents[0].data.properties.filter(property =>
                        {
                            return property.property.isRequired &&
                                    property.property.isShownOnItemPage &&
                                    !property.property.value &&
                                    property.property.isOderProperty;
                        });
                    }

                    missingProperties = _removeRadioValueProperties(state.variation, missingProperties);

                    return missingProperties;
                }

                return [];
            }
        },

        currentItemVariation(state)
        {
            return state.variation.documents && state.variation.documents[0] && state.variation.documents[0].data;
        }
    };

function normalizeOrderQuantities(variation)
{
    if (variation.documents.length > 0 && variation.documents[0].data.variation)
    {
        if (isNullOrUndefined(variation.documents[0].data.variation.intervalOrderQuantity)
            || variation.documents[0].data.variation.intervalOrderQuantity <= 0)
        {
            variation.documents[0].data.variation.intervalOrderQuantity = 1;
        }

        if (isNullOrUndefined(variation.documents[0].data.variation.minimumOrderQuantity)
            || variation.documents[0].data.variation.minimumOrderQuantity <= 0)
        {
            variation.documents[0].data.variation.minimumOrderQuantity = 1;
        }
    }

    return variation;
}

/**
 * Check all properties if a radio in a group is selected. If so, remove the group from the validation.
 */
function _removeRadioValueProperties(variation, missingProperties = [])
{
    if (missingProperties.length)
    {
        let radioInformation = variation.documents[0].data.properties.map(property =>
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

        radioInformation = [...new Set(radioInformation.filter(id => id))];

        const radioIdsToRemove = [];

        for (const radioGroupId of [...new Set(radioInformation.map(radio => radio.groupId))])
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

export default
{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
