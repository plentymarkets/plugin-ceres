/**
 * Check if a given value equals to null
 *
 * @param {*}   object
 *
 * @returns {boolean}
 */
export function isNull(object)
{
    return object === null;
}

/**
 * Check if a given value is undefined
 *
 * @param {*} object
 *
 * @returns {boolean}
 */
export function isUndefined(object)
{
    // eslint-disable-next-line
    return typeof object === typeof void 0;
}

/**
 * Check if a given value is null or undefined
 *
 * @param {*}   object
 *
 * @returns {boolean}
 */
export function isNullOrUndefined(object)
{
    return isNull(object) || isUndefined(object);
}

/**
 * Check if a given value is defined. This is a shorthand function for `!isNullOrUndefined(value)`
 * @param {*}   object
 *
 * @returns {boolean}
 */
export function isDefined(object)
{
    return !isNullOrUndefined(object);
}

/**
 * Check if a given value is defined. Otherwise return a default value
 *
 * @param {*}   input
 * @param {*}   defaultValue
 *
 * @returns {*}
 */
export function defaultValue(input, defaultValue)
{
    if (isNullOrUndefined(input))
    {
        return defaultValue;
    }

    return input;
}

export function orderArrayByKey(array, key, desc)
{
    return array.sort((valueA, valueB) =>
    {
        if (valueA[key] > valueB[key])
        {
            return 1;
        }
        if (valueA[key] < valueB[key])
        {
            return -1;
        }

        return 0;
    });
}
