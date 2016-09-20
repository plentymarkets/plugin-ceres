module.exports = (function($)
{
    var options = {
        symbol   : "EUR",
        decimal  : ",",
        thousand : ".",
        precision: 2,
        right    : true
    };

    return {
        formatMonetary: formatMonetary,
        initOptions   : initOptions
    };

    function initOptions(number_decimals, separator_decimal, separator_thousands, right, currency)
    {
        var getSymbolFromCurrency = require('currency-symbol-map').getSymbolFromCurrency;
        var symbol                = getSymbolFromCurrency(currency);

        if (right == "true")
        {
            right  = true;
            symbol = " " + symbol;
        }
        else
        {
            right = false;
        }

        this.options = {
            symbol   : symbol,
            decimal  : separator_decimal,
            thousand : separator_thousands,
            precision: parseFloat(number_decimals),
            right    : right
        };
    }

    function formatMonetary(price, currency)
    {
        if (isNaN(price))
        {
            return price + " " + currency;
        }
        else
        {
            price = parseFloat(price);
        }

        var result = formatNumber(price, this.options.precision, this.options.decimal, this.options.thousand);

        if (this.options.right)
        {
            result += this.options.symbol;
        }
        else
        {
            result = this.options.symbol + result;
        }
        return result;
    }

    function formatNumber(price, p, d, t)
    {

        p = isNaN(p = Math.abs(p)) ? 2 : p,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = price < 0 ? "-" : "",
            i = parseInt(price = Math.abs(+price || 0).toFixed(p)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;

        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (p ? d + Math.abs(price - i).toFixed(p).slice(2) : "");
    }

})(jQuery);
