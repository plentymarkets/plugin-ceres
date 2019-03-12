import { isNullOrUndefined } from "../helper/utils";
import { floatLength } from "../helper/number";

Vue.filter("numberFormat", function(number, decimals, separator)
{
    number = parseFloat(number);
    if (isNaN(number))
    {
        return "";
    }
    if (isNullOrUndefined(decimals))
    {
        decimals = floatLength(number);
    }
    if (isNullOrUndefined(separator))
    {
        separator = App.decimalSeparator;
    }
    return number.toFixed(decimals).replace(".", separator);
});
