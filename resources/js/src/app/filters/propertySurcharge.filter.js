import Vue from "vue";

Vue.filter("propertySurcharge", function(properties, propertyId)
{
    const property = properties.find(prop => prop.property.id === parseInt(propertyId));

    if (property)
    {
        if (property.surcharge > 0)
        {
            return property.surcharge;
        }
        else if (property.property.surcharge > 0)
        {
            return property.property.surcharge;
        }
    }

    return 0;
});
