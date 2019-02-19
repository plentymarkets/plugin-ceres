import { orderArrayByKey, isDefined } from "../helper/utils";

const PROPERTY_ORDER_BY_KEY = "position";
const _cachedVariationProperties = {};

export function transformVariationProperties(item, propertyTypes = [], displaySetting)
{
    const variationId = item.variation.id;

    if (_cachedVariationProperties[variationId])
    {
        return _cachedVariationProperties[variationId];
    }

    const variationProperties = item.variationProperties;
    const variationPropertyGroups = item.variationPropertyGroups;

    if (!(isDefined(variationProperties) && variationProperties.length))
    {
        return [];
    }

    const groupedProperties = {
        ungrouped: []
    };

    for (let property of variationProperties)
    {
        property = property.property;

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

    for (const group of variationPropertyGroups)
    {
        groups.push({
            id: group.id,
            position: group.position,
            name: group.names.name,
            description: group.names.description,
            properties: orderArrayByKey(groupedProperties[group.id], PROPERTY_ORDER_BY_KEY)
        });
    }

    if (groupedProperties.ungrouped.length)
    {
        groups.push({
            properties: orderArrayByKey(groupedProperties.ungrouped, PROPERTY_ORDER_BY_KEY),
            position: -1
        });
    }

    _cachedVariationProperties[variationId] = orderArrayByKey(groups, PROPERTY_ORDER_BY_KEY);

    return _cachedVariationProperties[variationId];
}

export function transformBasketItemProperties(basketItem, propertyTypes = [], displaySetting)
{
    return transformVariationProperties(basketItem.variation.data, propertyTypes, displaySetting);
}

export default { transformVariationProperties, transformBasketItemProperties };
