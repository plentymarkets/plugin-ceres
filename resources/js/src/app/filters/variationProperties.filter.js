import { orderArrayByKey } from "../helper/utils";

const PROPERTY_ORDER_BY_KEY = "position";

Vue.filter("variationProperties", (variationPropertyGroups, variationProperties, propertyTypes = [], displaySetting) =>
{
    let properties = variationProperties.map(property => property.property);

    if (propertyTypes.length)
    {
        properties = properties.filter(property => propertyTypes.includes(property.cast));
    }
    if (displaySetting.length)
    {
        properties = properties.filter(property => property.display.includes(displaySetting));
    }

    const groups = [];

    for (const group of variationPropertyGroups)
    {
        groups.push({
            id: group.id,
            position: group.position,
            name: group.names.name,
            description: group.names.description,
            properties: []
        });
    }

    // match the property in the group
    for (const group of groups)
    {
        for (const property of properties)
        {
            const propertyGroups = property.groups.map(group => group.id);

            if (propertyGroups.includes(group.id))
            {
                group.properties.push(property);
            }
        }

        orderArrayByKey(group.properties, PROPERTY_ORDER_BY_KEY);
    }

    // match the non-grouped properties with an empty group
    const nonGroupedProperties = properties.filter(property => property.groups.length === 0);

    if (nonGroupedProperties.length)
    {
        groups.push({
            properties: orderArrayByKey(nonGroupedProperties, PROPERTY_ORDER_BY_KEY),
            position: -1
        });
    }

    return orderArrayByKey(groups, PROPERTY_ORDER_BY_KEY);
});
