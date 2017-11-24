const accounting = require("accounting");

Vue.filter("currency", function(price)
{
    const currencyPattern = App.config.currencyPattern;

    // (%v = value, %s = symbol)
    const options = {
        symbol   : App.config.activeCurrency,
        decimal  : currencyPattern.separator_decimal,
        thousand : currencyPattern.separator_thousands,
        precision: 2,
        format   : currencyPattern.pattern.indexOf("¤") < currencyPattern.pattern.indexOf("#,##00.00") ? "%s %v" : "%v %s"
    };

    return accounting.formatMoney(price, options);
});
