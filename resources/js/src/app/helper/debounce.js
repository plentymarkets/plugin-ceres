import {defaultValue, isNullOrUndefined} from "./utils";

export function debounce(callback, timeout)
{
    timeout = defaultValue(timeout, 0);
    if (timeout > 0)
    {
        return function()
        {
            const args = arguments;

            if (!isNullOrUndefined(callback.__timeout))
            {
                window.clearTimeout(callback.__timeout);
            }
            callback.__timeout = window.setTimeout(() =>
            {
                callback(...args);
            }, timeout);
        };
    }

    return callback;
}