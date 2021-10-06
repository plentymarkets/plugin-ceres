import { normalizeUrl } from "../helper/url";
import { isDefined, isNullOrUndefined } from "../helper/utils";

const NotificationService = require("./NotificationService");

const _eventListeners = {};

export function initListener()
{
    $(document).ready(() =>
    {
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $("input[id=\"csrf-token\"]").val()
            }
        });
    });

    $(document).ajaxComplete((ajaxEvent, xhr, options) =>
    {
        let response;

        try
        {
            response = JSON.parse(xhr.responseText);
        }
        catch (exception)
        {

        }

        if (response)
        {
            triggerEvent("_before", response);

            for (const event in response.events)
            {
                triggerEvent("_before_" + event, response.events[event]);
                triggerEvent(event, response.events[event]);
                triggerEvent("_after_" + event, response.events[event]);
            }

            if (!options.supressNotifications)
            {
                _printMessages(response);
            }

            triggerEvent("_after", response);
        }
    });
}

export function listen(event, handler)
{
    _eventListeners[event] = _eventListeners[event] || [];
    _eventListeners[event].push(handler);
}

export function before(event, handler)
{
    if (isNullOrUndefined(handler) && typeof event === "function")
    {
        listen("_before", event);
    }
    else
    {
        listen("_before_" + event, handler);
    }
}

export function after(event, handler)
{
    if (isNullOrUndefined(handler) && typeof event === "function")
    {
        listen("_after", event);
    }
    else
    {
        listen("_after_" + event, handler);
    }
}

export function triggerEvent(event, payload)
{
    if (_eventListeners[event])
    {
        for (let i = 0; i < _eventListeners[event].length; i++)
        {
            const listener = _eventListeners[event][i];

            if (typeof listener !== "function")
            {
                continue;
            }
            listener.call(Object, payload);
        }
    }
}

export function get(url, data, config)
{
    config = config || {};
    config.method = "GET";
    return send(url, data, config);
}

export function put(url, data, config)
{
    config = config || {};
    config.method = "PUT";
    return send(url, data, config);
}

export function post(url, data, config)
{
    config = config || {};
    config.method = "POST";
    return send(url, data, config);
}

export function del(url, data, config)
{
    config = config || {};
    config.method = "DELETE";
    return send(url, data, config);
}

export function send(url, data = {}, config)
{
    const deferred = $.Deferred();

    data = isDefined(data) ? data : {};
    url = normalizeUrl(url);
    config = config || {};
    config.dataType = config.dataType || "json";
    config.contentType = typeof config.contentType !== "undefined" ? config.contentType : "application/x-www-form-urlencoded; charset=UTF-8";
    config.doInBackground = !!config.doInBackground;
    config.supressNotifications = !!config.supressNotifications;
    config.keepOriginalResponse = !!config.keepOriginalResponse;
    config.headers = config.headers || { "Accept-Language": App.language };

    const csrfToken = config.headers["X-CSRF-TOKEN"] || (document.getElementById("csrf-token") || {}).value;

    if (csrfToken)
    {
        config.headers["X-CSRF-TOKEN"] = csrfToken;
    }

    data.templateType = App.templateType;
    config.data = data;

    const request = $.ajax(url, config)
        .done(function(response)
        {
            if (config.keepOriginalResponse)
            {
                deferred.resolve(response);
            }
            else
            {
                deferred.resolve(response.data || response);
            }
        })
        .fail(function(jqXHR)
        {
            const response = jqXHR.responseText ? $.parseJSON(jqXHR.responseText) : {};

            deferred.reject(response, jqXHR.status);
        });

    deferred.abort = request.abort;

    return deferred;
}

function _printMessages(response)
{
    let notification;

    if (response.error && response.error.message.length > 0)
    {
        notification = NotificationService.error(response.error);
    }

    if (response.success && response.success.message.length > 0)
    {
        notification = NotificationService.success(response.success);
    }

    if (response.warn && response.warn.message.length > 0)
    {
        notification = NotificationService.warn(response.warn);
    }

    if (response.info && response.info.message.length > 0)
    {
        notification = NotificationService.info(response.info);
    }

    if (response.debug && response.debug.class.length > 0)
    {
        notification.trace(response.debug.file + "(" + response.debug.line + "): " + response.debug.class);
        for (let i = 0; i < response.debug.trace.length; i++)
        {
            notification.trace(response.debug.trace[i]);
        }
    }
}

export function setToken(token)
{
    this._token = token;
}

export function getToken()
{
    return this._token;
}

export default { get, put, post, del, send, setToken, getToken, listen, before, after, initListener };
