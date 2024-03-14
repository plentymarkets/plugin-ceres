import { isNullOrUndefined, isDefined } from "./utils";

let _supportsPassive;

/**
 * Asynchronous function to detect avif support
 * @param callback
 */
export function detectAvif(callback)
{
    if (!isNullOrUndefined(App.features.avif))
    {
        callback(App.features.avif);
        return;
    }

    const testUris = {
        "avif" : "AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUEAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABYAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgSAAAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB5tZGF0EgAKBzgADlAgIGkyCR/wAABAAACvcA=="
    };

    const promises = [];

    for (const uri in testUris)
    {
        promises.push(new Promise((resolve, reject) =>
        {
            _detectModernImageSupport("avif", testUris[uri], resolve);
        }));
    }

    let isSupported = true;

    Promise.all(promises)
        .then(values =>
        {
            for (const value of values)
            {
                isSupported = isSupported && value;
            }

            App.features.avif = isSupported;

            callback(isSupported);
        });
}

/**
 * Asynchronous function to detect webP support
 * @param callback
 */
export function detectWebP(callback)
{
    if (!isNullOrUndefined(App.features.webp))
    {
        callback(App.features.webp);
        return;
    }

    const testUris = {
        "webp" : "UklGRuUAAABXRUJQVlA4ICAAAAAhEAAESsAAEAAAABAAEAAAICTAEAOw=="
    };

    const promises = [];

    for (const uri in testUris)
    {
        promises.push(new Promise((resolve, reject) =>
        {
            _detectModernImageSupport("avif", testUris[uri], resolve);
        }));
    }

    let isSupported = true;

    Promise.all(promises)
        .then(values =>
        {
            for (const value of values)
            {
                isSupported = isSupported && value;
            }

            App.features.webp = isSupported;

            callback(isSupported);
        });
}

function _detectModernImageSupport(targetExtension, uri, resolve)
{
    const img = new Image();

    img.onload = function()
    {
        resolve((img.width > 0) && (img.height > 0));
    };

    img.onerror = function()
    {
        resolve(false);
    };

    img.src = "data:image/" + targetExtension + ";base64," + uri;
}

/**
 * Detect if the parameter passive is supported for the method addEventListener (MSIE is not)
 */
export function detectPassiveEvents()
{
    if (isDefined(_supportsPassive))
    {
        return _supportsPassive;
    }

    _supportsPassive = false;

    try
    {
        const opts = Object.defineProperty({}, "passive", {
            get()
            {
                _supportsPassive = true;
            }
        });

        window.addEventListener("testPassive", null, opts);
        window.removeEventListener("testPassive", null, opts);
    }
    catch (error)
    {}

    return _supportsPassive;
}

/**
 * Detect if the IntersectionObserver is supported by the browser
 */
export function detectIntersectionObserver()
{
    return "IntersectionObserver" in window;
}
