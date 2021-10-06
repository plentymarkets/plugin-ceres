import { isNullOrUndefined, isDefined } from "./utils";

let _supportsPassive;

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
        "lossy" : "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
        "lossless": "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
        "alpha": "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
        "animation": "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };

    const promises = [];

    for (const uri in testUris)
    {
        promises.push(new Promise((resolve, reject) =>
        {
            _detectWebPSupport(testUris[uri], resolve);
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

function _detectWebPSupport(uri, resolve)
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

    img.src = "data:image/webp;base64," + uri;
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
