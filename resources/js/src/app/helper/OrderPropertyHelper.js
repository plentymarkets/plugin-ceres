export function hasVat(property)
{
    const hasVat = property.property.vatId !== "none" && property.property.vatId !== null;

    return hasVat && isOrderProperty(property);
}

export function isAdditionalCosts(property)
{
    return property.property && property.property.isShownAsAdditionalCosts
                    && ((!property.property.isOderProperty && !App.useVariationOrderProperties)
                    || (isOrderProperty(property)));
}

export function isOrderProperty(property)
{
    return property.property.isOderProperty && App.useVariationOrderProperties;
}
