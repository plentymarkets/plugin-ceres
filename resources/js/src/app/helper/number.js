import { isNullOrUndefined } from "./utils";

/**
 * Get the number of decimal places of a float value.
 *
 * @param value     The float value to count decimal places for
 * @returns {number}
 */
export function floatLength(value)
{
    const match = ("" + value).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);

    if (!match)
    {
        return 0;
    }

    return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? match[2] : 0));
}

/**
 * Limit a numeric value on a defined interval.
 * If value is smaller than minimum, minimum value will be returned.
 * If value is greater than maximum, maximum value will be returned.
 * If value is between minimum and maximum, the value will be returned.
 *
 * @param {number}  value     The value to check against min and max
 * @param {number}  min       Minimum value
 * @param {number}  max       Maximum value
 *
 * @returns {number}
 */
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

/**
 * Format float value by cutting decimal places.
 *
 * @param {number}  value       The value to be formatted
 * @param {number}  decimals    Number of decimal places to keep
 * @param {boolean} round       Flag indicating if original value should be rounded before cutting decimal values
 *
 * @returns {number}
 */
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
