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
    if (browser.name === "firefox" && browser.version === 65)
    {
        isSupported = true;
    }

    return isSupported;
}
