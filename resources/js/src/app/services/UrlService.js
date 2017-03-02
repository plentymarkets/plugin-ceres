module.exports = (function($)
{
    return {
        getUrlParams: _getUrlParams,
        setUrlParams: _setUrlParams
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
        var url = window.location.pathname + "?" + $.param(urlParams);
        var title = document.getElementsByTagName("title")[0].innerHTML;

        window.history.replaceState({}, title, url);
    }

})(jQuery);
