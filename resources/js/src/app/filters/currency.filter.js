import MonetaryFormatter from "../helper/MonetaryFormatter";
import Vue from "vue";

const formatter = new MonetaryFormatter();

Vue.filter("currency", function(price)
{
    if (price === "N / A")
    {
        return price;
    }

    return formatter.format(parseFloat(price), App.activeCurrency);
});
