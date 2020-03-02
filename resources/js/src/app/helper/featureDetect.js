/**
 * Synchronous function to detect if WebP images are supported.
 *
 * @param browser object delivered by detect-browser
 * @returns {boolean}
 */
export function detectWebP(browser)
{
    let isSupported = false;
    const canvas = document.createElement("canvas");

    // If canvas can return a WebP image, it is supported
    if (canvas.getContext && canvas.getContext("2d"))
    {
        isSupported = canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
    }

    // Firefox 65 returns a false negative, even though it supports WebP
    const version = browser.version.split(".")[0];

    if (browser.name === "firefox" && parseInt(version) >= 65)
    {
        isSupported = true;
    }

    return isSupported;
}

export function detectWebPAsync()
{
    const testUri = "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";

    const img = new Image();

    img.onload = function()
    {
        App.features.webp = (img.width > 0) && (img.height > 0);
    };

    img.onerror = function()
    {
        App.features.webp = false;
    };

    img.src = "data:image/webp;base64," + testUri;
}
