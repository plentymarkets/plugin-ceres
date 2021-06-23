import jQuery from "jquery";

let _jQuery;

function setJQuery(newJQuery)
{
    if (_jQuery && _jQuery !== newJQuery)
    {
        console.warn(`jQuery ${ _jQuery.fn.jquery } is already included in Ceres. It\'s not recommended to register new instances of jQuery.`);

        // Copy ajax config to new jQuery instance
        newJQuery.ajaxSetup(_jQuery.ajaxSetup());

        // Copy registered jQuery plugins to new jQuery instance
        Object.keys(_jQuery.fn).forEach(jQueryFn =>
        {
            if (!newJQuery.fn.hasOwnProperty(jQueryFn))
            {
                newJQuery.fn[jQueryFn] = _jQuery.fn[jQueryFn];
            }
        });

        // unset existing setter to avoid endless loop
        delete window.jQuery;
    }

    // Store new jQuery instance in global object
    _jQuery = newJQuery;

    // Add new setter to catch new assignments of jQuery instances
    if (!window.__defineGetter__)
    {
        Object.defineProperty(window, "jQuery", {
            get: () => _jQuery,
            set: setJQuery
        });
        Object.defineProperty(window, "$", {
            get: () => _jQuery,
            set: setJQuery
        });
    }
    else
    {
        window.__defineGetter__("jQuery", () => _jQuery);
        window.__defineSetter__("jQuery", setJQuery);

        window.__defineGetter__("$", () => _jQuery);
        window.__defineSetter__("$", setJQuery);
    }
}

// assign initial jQuery instance
setJQuery(jQuery);
