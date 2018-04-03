import $ from "jquery";
import {isNullOrUndefined}from "../helper/utils";

export function getUrlParams(urlParams)
{
    if (urlParams)
    {
        var tokens;
        var params = {};
        var regex = /[?&]?([^=]+)=([^&]*)/g;

        urlParams = urlParams.split("+").join(" ");

        // eslint-disable-next-line
        while (tokens = regex.exec(urlParams))
        {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }

        return params;
    }

    return {};
}

export function setUrlParams(urlParams)
{
    var pathName = window.location.pathname;
    var params = $.isEmptyObject(urlParams) ? "" : "?" + $.param(urlParams);
    var titleElement = document.getElementsByTagName("title")[0];

    window.history.replaceState({}, titleElement ? titleElement.innerHTML : "", pathName + params);

    $("a[href][data-update-url]").each((i, element) =>
    {
        const $element  = $(element);
        const href      = /^([^?]*)(\?.*)?$/.exec($element.attr("href"));

        if (href && href[1])
        {
            $element.attr("href", href[1] + params);
        }
    });
}

export function setUrlParam(key, value)
{
    var urlParams = getUrlParams(document.location.search);

    if (value !== null)
    {
        urlParams[key] = value;
    }
    else
    {
        delete urlParams[key];
    }

    setUrlParams(urlParams);
}

function _normalizeUrl(url)
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
        urlPath = url.substr(0, url.length - 1);
    }

    let targetUrl = urlPath;

    if (!isNullOrUndefined(urlParams) && urlParams.length > 0)
    {
        targetUrl += "?" + urlParams;
    }

    return targetUrl;
}

export function navigateTo(url)
{
    url = _normalizeUrl(url);
    window.location.assign(url);
}

export function switchUrl(url, title)
{
    if (isNullOrUndefined(title))
    {
        title = document.getElementsByTagName("title")[0].innerHTML;
    }
    url = _normalizeUrl(url);
    window.history.replaceState({}, title, url);
}

export default {setUrlParam, setUrlParams, getUrlParams, navigateTo, switchUrl};
