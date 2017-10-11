Vue.filter("propertySurchargeSum", function(item)
{
    const addedProperties = item.properties.filter(property =>
    {
        return property.property.isOderProperty && property.property.value;
    });

    let sum = 0;

    for (const property of addedProperties)
    {
        sum += property.property.surcharge;
    }

    return sum;
});
