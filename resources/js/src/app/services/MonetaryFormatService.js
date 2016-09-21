var currencySymbolMap = require('currency-symbol-map');
var accounting = require('accounting');

module.exports = (function($)
{
    return {
        formatMonetary: formatMonetary
    };

    function formatMonetary(price, currency)
    {
        var currencySymbol = currencySymbolMap.getSymbolFromCurrency(currency);
        if (currencySymbol)
        {
            currency = currencySymbol;
        }

        // (%v = value, %s = symbol)
        var options = {
        	symbol : currency,
        	decimal : ",",
        	thousand: ".",
        	precision : 2,
        	format: "%v %s"
        };

        return accounting.formatMoney(price, options);
    }
})(jQuery);
