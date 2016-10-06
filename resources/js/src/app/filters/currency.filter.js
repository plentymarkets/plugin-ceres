var ResourceService   = require("services/ResourceService");
var currencySymbolMap = require("currency-symbol-map");
var accounting        = require("accounting");

Vue.filter("currency", function(price, customCurrency)
{
    var basket = ResourceService.getResource("basket").val();

    var currency = customCurrency || basket.currency;

    if (currency)
    {
        var currencySymbol = currencySymbolMap.getSymbolFromCurrency(currency);

        if (currencySymbol)
        {
            currency = currencySymbol;
        }
    }

    // (%v = value, %s = symbol)
    var options = {
        symbol   : currency,
        decimal  : ",",
        thousand : ".",
        precision: 2,
        format   : "%v %s"
    };

    return accounting.formatMoney(price, options);
});
