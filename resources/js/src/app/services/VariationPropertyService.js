import cloneDeep from "lodash/cloneDeep";
import { orderArrayByKey, isDefined } from "../helper/utils";

const PROPERTY_ORDER_BY_KEY = "position";

export function transformItem(item, propertyTypes = [], displaySetting)
{
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

        const matchDisplaySettings = isDefined(displaySetting) && displaySetting.length ? property.display.includes(displaySetting) : true;
        const isCorrectType = isDefined(propertyTypes) && propertyTypes.length ? propertyTypes.includes(property.cast) : true;

        if (!matchDisplaySettings || !isCorrectType)
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

    const clonedItem = cloneDeep(item);

    clonedItem.transformedVariationPropGroups = orderArrayByKey(groups, PROPERTY_ORDER_BY_KEY);
    return clonedItem;
}

export function transformBasketItem(basketItem, propertyTypes = [], displaySetting)
{
    basketItem.variation.data = transformItem(basketItem.variation.data, propertyTypes, displaySetting);

    return basketItem;
}

export function transformBasketItems(basketItems, propertyTypes = [], displaySetting)
{
    for (const basketItem of basketItems)
    {
        transformBasketItem(basketItem);
    }

    return basketItems;
}

export default { transformItem, transformBasketItem, transformBasketItems };
