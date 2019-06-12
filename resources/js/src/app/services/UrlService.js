import $ from "jquery";
import { isDefined, isNullOrUndefined } from "../helper/utils";
import { normalizeUrl } from "../helper/url";
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

    const result = {};
    const params = (window.location.search.split("?")[1] || "").split("&");

    for (const param in params)
    {
        if (params.hasOwnProperty(param))
        {
            const paramParts = params[param].split("=");

            result[paramParts[0]] = decodeURIComponent(paramParts[1] || "");
        }
    }

    if (result.hasOwnProperty(""))
    {
        delete result[""];
    }

    return result;
}

export function setUrlParams(urlParams, pushState = true)
{
    const pathName =
        isDefined(store.state.navigation.currentCategory) &&
        isDefined(store.state.navigation.currentCategory.url) ?
            store.state.navigation.currentCategory.url :
            window.location.pathname;

    const params = $.isEmptyObject(urlParams) ? "" : "?" + $.param(urlParams);
    const titleElement = document.getElementsByTagName("title")[0];

    if (pushState)
    {
        window.history.pushState({ requireReload: true }, titleElement ? titleElement.innerHTML : "", pathName + params);
    }
    else
    {
        window.history.replaceState({ requireReload: true }, titleElement ? titleElement.innerHTML : "", pathName + params);
    }

    document.dispatchEvent(new CustomEvent("onHistoryChanged", { detail: { title: titleElement ? titleElement.innerHTML : "", url:pathName + params } }));

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
    const url = normalizeUrl(pathName + "?" + encodeParams(urlParams));

    window.location.assign(url);
}

export function encodeParams(params, prefix)
{
    if (isNullOrUndefined(params))
    {
        return "";
    }

    if (Array.isArray(params))
    {
        return params.map((listValue, i) =>
        {
            return encodeParams(listValue, `${prefix}[${i}]`);
        }).join("&");
    }
    else if (typeof params === "object")
    {
        return Object.keys(params)
            .filter(key =>
            {
                return !(isNaN(params[key]) && typeof params[key] === "number") && !isNullOrUndefined(params[key]);
            })
            .map(key =>
            {
                return encodeParams(params[key], !isNullOrUndefined(prefix) ? `${prefix}[${key}]` : key);
            })
            .join("&");
    }

    if (isNullOrUndefined(prefix))
    {
        return encodeURIComponent(params);
    }
    return prefix + "=" + encodeURIComponent(params);
}

export default { setUrlParams, getUrlParams, navigateTo, setUrlParam, removeUrlParams, removeUrlParam };
