import store from "store/index.js";

const currencySymbolMap = require("currency-symbol-map");
const accounting = require("accounting");

Vue.filter("currency", function(price, customCurrency)
{
    const currency = customCurrency || store.state.basket.data.currency;

    // (%v = value, %s = symbol)
    const options = {
        symbol   : "",
        decimal  : ",",
        thousand : ".",
        precision: 2,
        format   : "%v %s"
    };

    if (currency)
    {
        options.symbol = currencySymbolMap.getSymbolFromCurrency(currency) || currency;
    }

    return accounting.formatMoney(price, options);
});
