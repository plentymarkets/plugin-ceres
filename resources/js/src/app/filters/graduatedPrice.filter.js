import Vue from "vue";

Vue.filter("graduatedPrice", function(item, quantity)
{
    const graduatedPrices = item.prices.graduatedPrices;

    let returnPrice;

    if (graduatedPrices && graduatedPrices[0])
    {
        const prices = graduatedPrices.filter(price =>
        {
            return parseFloat(quantity) >= price.minimumOrderQuantity;
        });

        if (prices[0])
        {
            returnPrice = prices.reduce((prev, current) => (prev.minimumOrderQuantity > current.minimumOrderQuantity) ? prev : current);
            returnPrice = returnPrice.unitPrice.value;
        }
    }

    return returnPrice || item.prices.default.unitPrice.value;
});
