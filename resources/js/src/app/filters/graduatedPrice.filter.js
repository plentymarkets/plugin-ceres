Vue.filter("graduatedPrice", function(item, quantity)
{
    const graduatedPrices = item.calculatedPrices.graduatedPrices;

    let returnPrice;

    if (graduatedPrices[0])
    {
        const prices = graduatedPrices.filter(price =>
        {
            return parseInt(quantity) >= price.minimumOrderQuantity;
        });

        if (prices[0])
        {
            returnPrice = prices.reduce((prev, current) => (prev.minimumOrderQuantity > current.minimumOrderQuantity) ? prev : current);
            returnPrice = returnPrice.price;
        }
    }

    return returnPrice || item.calculatedPrices.default.unitPrice;
});
