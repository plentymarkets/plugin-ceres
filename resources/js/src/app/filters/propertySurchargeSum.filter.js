Vue.filter("propertySurchargeSum", function(item)
{
    let sum = 0;

    if (item.properties)
    {
        const addedProperties = item.properties.filter(property =>
        {
            return property.property.isOderProperty && property.property.value;
        });

        for (const property of addedProperties)
        {
            sum += property.property.surcharge;
        }
    }

    return sum;
});
