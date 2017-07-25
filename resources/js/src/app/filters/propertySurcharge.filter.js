Vue.filter("propertySurcharge", function(property)
{

    if (property.surcharge > 0)
    {
        return property.surcharge;

    }
    else if (property.property.surcharge > 0)
    {
        return property.property.surcharge;
    }

    return 0;

});
