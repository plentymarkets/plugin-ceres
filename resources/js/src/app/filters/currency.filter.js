import MonetaryFormatter from "../helper/MonetaryFormatter";

const formatter = new MonetaryFormatter();

Vue.filter("currency", function(price)
{
    return formatter.format(price, App.activeCurrency);
});
