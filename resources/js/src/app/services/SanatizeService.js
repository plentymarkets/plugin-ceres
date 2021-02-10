import DOMPurify from "dompurify";

/**
 * Returns sanitize string
 * @param {String} input - String to sanitize
 */
export function sanitizeString(input)
{
    return DOMPurify.sanitize(input);
}

export function sanatizeObject(input)
{
    // iterate object
}

export default { sanitizeString };
