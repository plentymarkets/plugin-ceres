module.exports = (function($)
{
    return {
        getUrlParams: _getUrlParams,
        setUrlParam: _setUrlParam
    };

    function _getUrlParams(urlParams)
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

    function _setUrlParams(urlParams)
    {
        var pathName = window.location.pathname;
        var params = $.isEmptyObject(urlParams) ? "" : "?" + $.param(urlParams);
        var title = document.getElementsByTagName("title")[0].innerHTML;

        window.history.replaceState({}, title, pathName + params);
    }

    function _setUrlParam(key, value)
    {
        urlParams = _getUrlParams(document.location.search);

        if (value !== null)
        {
            urlParams[key] = value;
        }
        else
        {
            delete urlParams[key];
        }

        _setUrlParams(urlParams);
    }

})(jQuery);
