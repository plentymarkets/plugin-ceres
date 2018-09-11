import {isNullOrUndefined}from "./utils";

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
            else if (pattern.indexOf(".00") === 0)
            {
                parsed.push({
                    type: T_DECIMAL
                });
                pattern = pattern.substr(3);
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

    function _getDecimalValue(value)
    {
        const extend = 0;

        value += "";

        if (value.length === 1)
        {
            value = extend + value;
        }
        else
        {
            while (value.length < 2)
            {
                value += extend;
            }
        }

        return value;
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
                const roundDigits = !pattern.some(subpattern => subpattern.type === T_DECIMAL);

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
                return this.separatorDecimals + _getDecimalValue(Math.floor(value * 1000 / 10).toFixed(0).substr(-2, 2));
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
                console.warn("Unkown pattern type: " + partial.type);
                return "";
            }
            }
        }).join("");
    };

    return MonetaryFormatter;
})();

export default MonetaryFormatter;
