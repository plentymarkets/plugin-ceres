import { isNullOrUndefined } from "./utils";

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
