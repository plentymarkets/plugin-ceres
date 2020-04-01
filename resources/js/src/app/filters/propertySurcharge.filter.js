import Vue from "vue";

Vue.filter("propertySurcharge", function(properties, propertyId, rebate)
{
    const property = properties.find(prop => prop.property.id === parseInt(propertyId));

    rebate = rebate || 0;
    if (property)
    {
        if (property.surcharge > 0)
        {
            return property.surcharge * (1 - (rebate / 100));
        }
        else if (property.property.surcharge > 0)
        {
            return property.property.surcharge * (1 - (rebate / 100));
        }
    }

    return 0;
});
