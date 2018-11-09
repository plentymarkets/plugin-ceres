import $ from "jquery";
import {isDefined}from "../helper/utils";
import {normalizeUrl}from "../helper/url";
import store from "../store/index";

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
    var pathName = isDefined(store.state.navigation.currentCategory) ? store.state.navigation.currentCategory.url : window.location.pathname;
    var params = $.isEmptyObject(urlParams) ? "" : "?" + $.param(urlParams);
    var titleElement = document.getElementsByTagName("title")[0];

    window.history.pushState({requireReload: true}, titleElement ? titleElement.innerHTML : "", pathName + params);
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

export function navigateTo(url)
{
    url = normalizeUrl(url);
    window.location.assign(url);
}

export default {setUrlParams, getUrlParams, navigateTo};
