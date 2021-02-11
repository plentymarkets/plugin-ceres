import DOMPurify from "dompurify";
import { isArray, isObject, isString } from "lodash";

/**
 * Returns sanitize string
 * @param {String} input - String to sanitize
 */
export function sanitizeString(input)
{
    return DOMPurify.sanitize(input);
}

/**
 * Returns sanitized object
 * @param {Object} input - Object to iterate over an sanitize every sting in
 */
export function sanitizeObject(input)
{
    if (isString(input))
    {
        return sanitizeString(input);
    }

    if (isArray(input))
    {
        for (let i = 0; i < input.length; i++)
        {
            input[i] = sanitizeObject(input[i]);
        }

        return input;
    }

    if (isObject(input))
    {
        for (const key in input)
        {
            input[key] = sanitizeObject(input[key]);
        }

        return input;
    }

    return input;
}

export function sanitize(input)
{
    if (isString(input))
    {
        return sanitizeString(input);
    }

    if (isArray(input) || isObject(input))
    {
        return sanitizeObject(JSON.parse(JSON.stringify(input)));
    }

    return input;
}

export default { sanitizeString, sanitizeObject, sanitize };
