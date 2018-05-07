import $ from "jquery";
import {isNullOrUndefined}from "../helper/utils";
import {normalizeUrl}from "../helper/url";

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

export function navigateTo(url)
{
    url = normalizeUrl(url);
    window.location.assign(url);
}

export function switchUrl(url, title)
{
    if (isNullOrUndefined(title))
    {
        title = document.getElementsByTagName("title")[0].innerHTML;
    }
    url = _normalizeUrl(url);
    window.history.pushState({}, title, url);
}

export default {setUrlParam, setUrlParams, getUrlParams, navigateTo, switchUrl};
