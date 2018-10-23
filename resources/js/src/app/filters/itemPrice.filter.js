Vue.filter("itemPrice", function(defaultPrice, prices, priceType)
{
    return prices[priceType] ? prices[priceType] : defaultPrice;
});
