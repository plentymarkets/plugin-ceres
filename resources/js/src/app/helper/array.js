import { isNullOrUndefined } from "./utils";

/**
 * Checks if array is set otherwise creates new array and pushes the entry
 *
 * @param {arry} array
 * @param {*} entry
 */
export function safePush(array, entry)
{
    if (isNullOrUndefined(array))
    {
        array = [];
    }

    array.push(entry);

    return array;
}

/**
 * Check if the array is null/undefined or empty
 *
 * @param {array} array
 */
export function isEmpty(array)
{
    return isNullOrUndefined(array) || array.length <= 0;
}

/**
 * Returns true if the array is filled
 * @param {array} array
 */
export function isFilled(array)
{
    return !isEmpty(array);
}

/**
 * Returns sorted array. Note: the original array will be touched.
 * @param {array} array
 * @param {string} key
 * @param {boolean} reverse
 */
export function sortByKey(array, key, reverse)
{
    const factor = reverse === true ? -1 : 1;

    return array.sort((elementA, elementB) =>
    {
        if (elementA[key] > elementB[key])
        {
            return 1 * factor;
        }
        if (elementA[key] < elementB[key])
        {
            return -1 * factor;
        }

        return 0;
    });
}
