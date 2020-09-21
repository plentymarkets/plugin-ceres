import { isNullOrUndefined } from "./utils";

export function normalizeUrl(url)
{
    const urlParts = url.split("?");
    const urlParams = urlParts[1];

    let urlPath = urlParts[0];

    if (App.urlTrailingSlash && urlPath.substr(-1, 1) !== "/")
    {
        urlPath += "/";
    }
    else if (!App.urlTrailingSlash && urlPath.substr(-1, 1) === "/")
    {
        urlPath = urlPath.substr(0, urlPath.length - 1);
    }

    let targetUrl = urlPath;

    if (!isNullOrUndefined(urlParams) && urlParams.length > 0)
    {
        targetUrl += "?" + urlParams;
    }

    return targetUrl;
}

export function pathnameEquals(pathname)
{
    return window.location.pathname === pathname ||
        window.location.pathname === pathname + "/" ||
        window.location.pathname + "/" === pathname;
}
