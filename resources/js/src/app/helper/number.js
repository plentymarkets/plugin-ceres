import {isNullOrUndefined}from "./utils";

export function limit(value, min, max)
{
    if (isNaN(value))
    {
        return value;
    }
    if (!isNullOrUndefined(min) && value < min)
    {
        return min;
    }
    if (!isNullOrUndefined(max) && value > max)
    {
        return max;
    }
    return value;
}

export function floatLength(value)
{
    const match = ("" + value).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

    if (!match)
    {
        return 0;
    }

    return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? match[2] : 0));
}

export function formatFloat(value, decimals, round)
{
    value = parseFloat(value);
    if (round)
    {
        const factor = Math.pow(10, decimals);
        const scaledValue = Math.round((value + (1 / (factor * 10))) * factor);

        value = scaledValue / factor;
    }
    if (isNaN(value))
    {
        // return NaN
        return 1 / 0;
    }
    return parseFloat(value.toFixed(decimals));
}
