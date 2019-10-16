import { orderArrayByKey, isDefined } from "../helper/utils";

const PROPERTY_ORDER_BY_KEY = "position";
const _cachedVariationProperties = {};

// eslint-disable-next-line complexity
export function transformVariationProperties(item, propertyTypes = [], displaySetting)
{
    const variationId = item.variation.id;
    const variationProperties = item.variationProperties;
    const variationPropertyGroups = item.variationPropertyGroups;
    const cacheKey = `${variationId}_${propertyTypes.toString()}_${displaySetting}`;

    if (_cachedVariationProperties[cacheKey])
    {
        return _cachedVariationProperties[cacheKey];
    }

    if (!(isDefined(variationProperties) && variationProperties.length))
    {
        return [];
    }

    const groupedProperties = {
        ungrouped: []
    };

    for (let property of variationProperties)
    {
        property = { ...property.property, values: property.values };
        const matchDisplaySetting = isDefined(displaySetting) && displaySetting.length ? property.display.includes(displaySetting) : true;
        const isCorrectType = isDefined(propertyTypes) && propertyTypes.length ? propertyTypes.includes(property.cast) : true;

        if (!matchDisplaySetting || !isCorrectType)
        {
            continue;
        }

        if (property.groups.length > 0)
        {
            for (const group of property.groups)
            {
                if (!groupedProperties[group.id])
                {
                    groupedProperties[group.id] = [];
                }

                groupedProperties[group.id].push(property);
            }
        }
        else
        {
            groupedProperties.ungrouped.push(property);
        }
    }

    const groups = [];

    if (variationPropertyGroups && variationPropertyGroups.length)
    {
        for (const group of variationPropertyGroups)
        {
            if (isDefined(groupedProperties[group.id]))
            {
                groups.push({
                    id: group.id,
                    position: group.position,
                    name: group.names.name,
                    description: group.names.description,
                    properties: orderArrayByKey(groupedProperties[group.id], PROPERTY_ORDER_BY_KEY)
                });
            }
        }
    }

    if (groupedProperties.ungrouped.length)
    {
        groups.push({
            properties: orderArrayByKey(groupedProperties.ungrouped, PROPERTY_ORDER_BY_KEY),
            position: -1
        });
    }

    _cachedVariationProperties[cacheKey] = orderArrayByKey(groups, PROPERTY_ORDER_BY_KEY);

    return _cachedVariationProperties[cacheKey];
}

export function transformBasketItemProperties(basketItem, propertyTypes = [], displaySetting)
{
    return transformVariationProperties(basketItem.variation.data, propertyTypes, displaySetting);
}

export default { transformVariationProperties, transformBasketItemProperties };
