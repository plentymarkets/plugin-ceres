import $ from "jquery";
import {isDefined, isNullOrUndefined}from "../helper/utils";
import {normalizeUrl}from "../helper/url";
import store from "../store/index";

export function getUrlParams(urlParams)
{
    if (isNullOrUndefined(urlParams) && isDefined(document.location.search))
    {
        urlParams = document.location.search;
    }

    if (isNullOrUndefined(urlParams))
    {
        return {};
    }

    urlParams = urlParams.split("+").join(" ");

    const params = {};
    const re = /[?&]?([^=]+)=([^&]*)/g;
    let tokens;

    while (tokens)
    {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        tokens = re.exec(urlParams);
    }

    return params;
}

export function setUrlParams(urlParams, pushState = true)
{
    var pathName =
        isDefined(store.state.navigation.currentCategory) &&
        isDefined(store.state.navigation.currentCategory.url) ?
            store.state.navigation.currentCategory.url :
            window.location.pathname;

    var params = $.isEmptyObject(urlParams) ? "" : "?" + $.param(urlParams);
    var titleElement = document.getElementsByTagName("title")[0];

    if (pushState)
    {
        window.history.pushState({requireReload: true}, titleElement ? titleElement.innerHTML : "", pathName + params);
    }
    else
    {
        window.history.replaceState({requireReload: true}, titleElement ? titleElement.innerHTML : "", pathName + params);
    }

    document.dispatchEvent(new CustomEvent("onHistoryChanged", {detail: {title: titleElement ? titleElement.innerHTML : "", url:pathName + params}}));

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

export function setUrlParam(urlParam)
{
    const urlParams = getUrlParams();

    for (const key in urlParam)
    {
        urlParams[key] = urlParam[key];
    }

    setUrlParams(urlParams, false);
}

export function removeUrlParam(urlParamToDelete)
{
    removeUrlParams([urlParamToDelete]);
}

export function removeUrlParams(urlParamsToDelete)
{
    const urlParams = getUrlParams();

    for (const param of urlParamsToDelete)
    {
        delete urlParams[param];
    }

    setUrlParams(urlParams, false);
}

export function navigateTo(url)
{
    url = normalizeUrl(url);
    window.location.assign(url);
}

export function navigateToParams(urlParams)
{
    const pathName =
        isDefined(store.state.navigation.currentCategory) &&
        isDefined(store.state.navigation.currentCategory.url) ?
            store.state.navigation.currentCategory.url :
            window.location.pathname;
    const params = $.isEmptyObject(urlParams) ? "" : "?" + $.param(urlParams);
    const url = normalizeUrl(pathName + params);

    window.location.assign(url);
}

export default {setUrlParams, getUrlParams, navigateTo, setUrlParam, removeUrlParams, removeUrlParam};
