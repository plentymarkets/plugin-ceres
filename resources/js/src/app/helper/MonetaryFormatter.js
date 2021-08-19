import { isNullOrUndefined } from "./utils";

const MonetaryFormatter = (function()
{
    const T_DIGIT       = 0;
    const T_DECIMAL     = 1;
    const T_CURRENCY    = 2;
    const T_SIGN        = 3;
    const T_CHAR        = 4;

    function MonetaryFormatter()
    {
        this.setPattern(App.currencyPattern.pattern);
        this.separatorThousands = App.currencyPattern.separator_thousands;
        this.separatorDecimals = App.currencyPattern.separator_decimal;
        this.sign = "-";
    }

    function _parse(pattern)
    {
        const parsed = [];

        while (pattern.length > 0)
        {
            if (pattern.indexOf("\u00a4") === 0)
            {
                parsed.push({
                    type: T_CURRENCY
                });
                pattern = pattern.substr(1);
            }
            else if (pattern.indexOf("#,##0") === 0)
            {
                parsed.push({
                    type: T_DIGIT
                });
                pattern = pattern.substr(5);
            }
            else if (/^\.0+/.test(pattern))
            {
                const match = /^\.(0+)/.exec(pattern);

                parsed.push({
                    type: T_DECIMAL,
                    value: match[1].length
                });
                pattern = pattern.substr(match[0].length);
            }
            else if (pattern.indexOf("-") === 0)
            {
                parsed.push({
                    type: T_SIGN
                });
                pattern = pattern.substr(1);
            }
            else
            {
                parsed.push({
                    type: T_CHAR,
                    value: pattern.charAt(0)
                });
                pattern = pattern.substr(1);
            }
        }

        return parsed;
    }

    MonetaryFormatter.prototype.setPattern = function(pattern)
    {
        this.pattern = [];
        pattern.split(";").forEach(subpattern =>
        {
            this.pattern.push(
                _parse(subpattern)
            );
        });
    };

    MonetaryFormatter.prototype.setSeparators = function(separatorThousands, separatorDecimals)
    {
        this.separatorThousands = separatorThousands;
        this.separatorDecimals = separatorDecimals;
    };

    MonetaryFormatter.prototype.setSign = function(sign)
    {
        this.sign = sign;
    };

    MonetaryFormatter.prototype.format = function(value, currency)
    {
        let patternIndex = 0;

        let prefix = "";

        const displayCurrency = App.config.currency.format === "symbol"
            ? App.currencyPattern.symbols[currency]
            : Object.keys(App.currencyPattern.symbols).find(isoCode => App.currencyPattern.symbols[isoCode] === currency);

        currency = displayCurrency || currency;

        if (isNullOrUndefined(value) || Number.isNaN(parseFloat(value)))
        {
            value = 0;
        }

        if (value < 0)
        {
            if (this.pattern.length > 1)
            {
                patternIndex = 1;
            }
            else
            {
                prefix = this.sign;
            }
        }

        const formatDecimals = (value, numberOfDecimals) =>
        {
            // FIX: add smallest number next to 0 to value to avoid float conversion errors, eg 0.005 => 0.004999999.
            let result =  Math.round((value + (1/Number.MAX_SAFE_INTEGER)) * Math.pow(10, numberOfDecimals))
                .toFixed(0)
                .substr(-1 * numberOfDecimals, numberOfDecimals);

            while (result.length < numberOfDecimals)
            {
                result = "0" + result;
            }

            return result;
        };

        return prefix + this.pattern[patternIndex].map((partial, index, pattern) =>
        {
            switch (partial.type)
            {
            case T_DIGIT: {
                if (value < 0)
                {
                    value *= -1;
                }
                // check if pattern include decimals to decide if digits should be rounded or not
                const roundDigits = !pattern.some(subpattern =>
                {
                    return subpattern.type === T_DECIMAL
                        && parseInt(formatDecimals(value, parseInt(subpattern.value))) !== 0;
                });

                // cut decimal places instead of rounding
                // revert the value to insert thousands separators next
                let digits = (roundDigits ? Math.round(value * 100) / 100 : parseInt(value))
                    .toFixed(0)
                    .split("").reverse().join("");

                // insert thousands separator
                for (let i = 3; i < digits.length; i += 4)
                {
                    digits = digits.substr(0, i) + this.separatorThousands + digits.substr(i);
                }

                // revert back again
                digits = digits.split("").reverse().join("");

                return digits;
            }
            case T_DECIMAL: {
                const numberOfDecimals = parseInt(partial.value);

                return this.separatorDecimals + formatDecimals(value, numberOfDecimals);
            }
            case T_CURRENCY: {
                return currency;
            }
            case T_SIGN: {
                return this.sign;
            }
            case T_CHAR: {
                return partial.value;
            }
            default: {
                console.warn("Unknown pattern type: " + partial.type);
                return "";
            }
            }
        }).join("");
    };

    return MonetaryFormatter;
})();

export default MonetaryFormatter;
