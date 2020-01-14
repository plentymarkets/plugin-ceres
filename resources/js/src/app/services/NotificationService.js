import { exceptionMap } from "../exceptions/ExceptionMap";
import TranslationService from "./TranslationService";

let notificationCount = 0;
const notifications     = new NotificationList();
const handlerList = [];

export function listen(handler)
{
    handlerList.push(handler);
}

function _trigger()
{
    for (let i = 0; i < handlerList.length; i++)
    {
        handlerList[i].call({}, notifications.all());
    }
}

export function log(message, prefix)
{
    const notification = new Notification(message);

    if (App.config.log.data.indexOf("log_messages") >= 0)
    {
        console.log((prefix || "") + "[" + notification.code + "] " + notification.message);

        for (let i = 0; i < notification.stackTrace.length; i++)
        {
            log(notification.stackTrace[i], " + ");
        }
    }

    return notification;
}

export function info(message)
{
    const notification = new Notification(message, "info");

    if (App.config.log.data.indexOf("print_infos") >= 0)
    {
        _printNotification(notification);
    }

    return notification;
}

export function warn(message)
{
    const notification = new Notification(message, "warning");

    if (App.config.log.data.indexOf("print_warnings") >= 0)
    {
        _printNotification(notification);
    }

    return notification;
}

export function error(message)
{
    const notification = new Notification(message, "danger");

    if (App.config.log.data.indexOf("print_errors") >= 0)
    {
        _printNotification(notification);
    }

    return notification;
}

export function success(message)
{
    const notification = new Notification(message, "success");

    if (App.config.log.data.indexOf("print_success") >= 0)
    {
        _printNotification(notification);
    }

    return notification;
}

export function getNotifications()
{
    return notifications;
}

function _printNotification(notification)
{
    if (notification.code > 0 && exceptionMap.has(notification.code.toString()))
    {
        notification.message = TranslationService.translate(
            "Ceres::Template." + exceptionMap.get(notification.code.toString()),
            notification.placeholder
        );
    }
    notifications.add(notification);
    log(notification);

    _trigger();

    return notification;
}

function Notification(data, context)
{
    if (App.config.log.data.indexOf("print_stack_trace") < 0 && typeof (data) === "object")
    {
        data.stackTrace = [];
    }
    const id   = notificationCount++;
    const self = {
        id        : id,
        code      : data.code || 0,
        message   : data.message || data || "",
        placeholder: data.placeholder || null,
        context   : context || "info",
        stackTrace: data.stackTrace || [],
        close     : close,
        closeAfter: closeAfter,
        trace     : trace
    };

    return self;

    function close()
    {
        notifications.remove(self);
        _trigger();
    }

    function closeAfter(timeout)
    {
        setTimeout(function()
        {
            notifications.remove(self);
            _trigger();
        }, timeout);
    }

    function trace(message, code)
    {
        if (App.config.log.data.indexOf("print_stack_trace") >= 0)
        {
            self.stackTrace.push({
                code   : code || 0,
                message: message
            });
        }
    }
}

function NotificationList()
{
    const elements = [];

    return {
        all   : all,
        add   : add,
        remove: remove
    };

    function all()
    {
        return elements;
    }

    function add(notification)
    {
        elements.push(notification);
    }

    function remove(notification)
    {
        for (let i = 0; i < elements.length; i++)
        {
            if (elements[i].id === notification.id)
            {
                elements.splice(i, 1);
                break;
            }
        }
    }
}

export default { log, info, warn, error, success, getNotifications, listen };
