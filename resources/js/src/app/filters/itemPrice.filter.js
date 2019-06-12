Vue.filter("specialOffer", function(defaultPrice, prices, priceType, exact)
{
    let price;

    if (prices.specialOffer)
    {
        if (exact)
        {
            price = prices.specialOffer[priceType][exact] ? prices.specialOffer[priceType][exact] : defaultPrice;
        }
        else
        {
            price = prices.specialOffer[priceType] ? prices.specialOffer[priceType] : defaultPrice;
        }
    }
    else
    {
        price = defaultPrice;
    }

    return price;
});
