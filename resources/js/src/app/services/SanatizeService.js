import DOMPurify from "dompurify";

/**
 * Returns sanitize string
 * @param {String} input - String to sanitize
 */
export function sanitizeString(input)
{
    return DOMPurify.sanitize(input);
}

export function sanitizeObject(input)
{
    // iterate object and sani
    return input;
}

export default { sanitizeString, sanitizeObject };
