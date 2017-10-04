Vue.filter("propertySurcharge", function(properties, propertyId)
{
    console.log("propertySurcharge");
    console.log("properties", properties);
    console.log("propertyId", propertyId);

    const property = properties.find(prop => prop.property.id === propertyId);

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
