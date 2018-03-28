import {isNullOrUndefined}from "./utils";

/**
 * Replace all occurrences of a string
 *
 * @param {string}  input           The string to apply replacements on
 * @param {string}  search          Substring to be replaced
 * @param {string}  replacement     String to replace each match with
 *
 * @returns {string}
 */
export function replaceAll(input, search, replacement)
{
    if (isNullOrUndefined(input))
    {
        return input;
    }
    return (input + "").split(search).join(replacement);
}

/**
 * Capitalize first letter of a string
 *
 * @param {string}  input   The string to capitalize
 *
 * @returns {string}
 */
export function capitalize(input)
{
    if (isNullOrUndefined(input))
    {
        return input;
    }
    return ("" + input).charAt(0).toUpperCase() + ("" + input).substr(1);
}
