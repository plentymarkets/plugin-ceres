import MonetaryFormatter from "../helper/MonetaryFormatter";

const formatter = new MonetaryFormatter();

Vue.filter("currency", function(price)
{
    if (isNaN(parseFloat(price)))
    {
        return "N / A";
    }
    return formatter.format(parseFloat(price).toFixed(2), App.activeCurrency);
});
