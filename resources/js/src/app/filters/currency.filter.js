import MonetaryFormatter from "../helper/MonetaryFormatter";

const formatter = new MonetaryFormatter();

Vue.filter("currency", function(price)
{
    if(price === "N / A")
    {
        return price;
    }

    return formatter.format(parseFloat(price).toFixed(2), App.activeCurrency);
});
