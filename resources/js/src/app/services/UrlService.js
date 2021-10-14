import { isDefined, isNullOrUndefined } from "../helper/utils";
import { normalizeUrl } from "../helper/url";
import { set } from "../helper/set";

function _parseUrlParam(paramKey, paramValue, result)
{
    if (isNullOrUndefined(result))
    {
        result = {};
    }

    const regex = /(^([^\[]+)|\[([^\]]*)\])/gm;

    let match;
    const keyList = [];

    while ((match = regex.exec(paramKey)) !== null)
    {
        if (match.index === regex.lastIndex)
        {
            regex.lastIndex++;
        }

        keyList.push(match[2] || match[3]);
    }

    return set(result, keyList, paramValue);
}

function _createQueryString(params)
{
    const _createParamStrings = function(params, prefix, result)
    {
        if ( Array.isArray(params) )
        {
            params.forEach(param =>
            {
                _createParamStrings(param, prefix + "[]", result);
            });
        }
        else if ( typeof params === "object" )
        {
            for ( const key in params)
            {
                if ( prefix.length > 0 )
                {
                    _createParamStrings(params[key], prefix + "[" + key + "]", result);
                }
                else
                {
                    _createParamStrings(params[key], key, result);
                }
            }
        }
        else
        {
            result.push(
                encodeURIComponent(prefix) + "=" + encodeURIComponent(params)
            );
        }

        return result;
    };

    const paramStrings = _createParamStrings(params, "", []);

    if (paramStrings.length > 0)
    {
        return "?" + paramStrings.join("&");
    }

    return "";
}

export function getUrlParams(urlParams)
{
    if (isNullOrUndefined(urlParams) && isDefined(document.location.search))
    {
        urlParams = document.location.search;
    }

    const regex = /[\\?&]([^=&#]+)=([^&#]*)/gm;

    let result = {};

    let match;

    while ((match = regex.exec(urlParams)) !== null)
    {
        if (match.index === regex.lastIndex)
        {
            regex.lastIndex++;
        }
        result = _parseUrlParam(decodeURIComponent(match[1]), decodeURIComponent(match[2]), result);
    }

    return result;
}

export function setUrlParams(urlParams, pushState = true)
{
    const pathName = window.location.pathname;
    const params = _createQueryString(urlParams);
    const titleElement = document.getElementsByTagName("title")[0];

    if (pushState)
    {
        window.history.pushState({ requireReload: true }, titleElement ? titleElement.innerHTML : "", pathName + params + window.location.hash );
    }
    else
    {
        window.history.replaceState({ requireReload: true }, titleElement ? titleElement.innerHTML : "", pathName + params + window.location.hash );
    }

    document.dispatchEvent(new CustomEvent("onHistoryChanged", { detail: { title: titleElement ? titleElement.innerHTML : "", url:pathName + params + window.location.hash } }));

    Array.prototype
        .slice
        .call(document.querySelectorAll("a[href][data-update-url]"))
        .forEach(element =>
        {
            const href = /^([^?]*)(\?.*)?$/.exec(element.href);

            if (href && href[1])
            {
                element.href = href[1] + params;
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
    const url = normalizeUrl(window.location.pathname + "?" + encodeParams(urlParams));

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
    return encodeURIComponent(prefix) + "=" + encodeURIComponent(params);
}

export function setUrlByItem(itemData, keepVariationId)
{
    const url = vueApp.$options.filters.itemURL(itemData, keepVariationId);
    const title = document.getElementsByTagName("title")[0].innerHTML;

    window.history.replaceState({}, title, url);
    document.dispatchEvent(new CustomEvent("onHistoryChanged", { detail: { title, url } }));
}

export default { setUrlParams, getUrlParams, navigateTo, setUrlParam, removeUrlParams, removeUrlParam, setUrlByItem };
