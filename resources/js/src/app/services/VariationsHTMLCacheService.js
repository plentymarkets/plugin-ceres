module.exports = (function($)
{

    var cache = {};

    return {
        addToCache  : _addToCache,
        getFromCache: _getFromCache
    };

    function _addToCache(itemId, variationId, html)
    {
        var variationHTML = {html: html};

        if (!cache[itemId])
        {
            cache[itemId] = {};
        }

        cache[itemId][variationId] = variationHTML;
    }

    function _getFromCache(itemId, variationId)
    {
        for (var cachedItemId in cache)
        {
            if (cachedItemId === itemId)
            {
                for (var cachedVariationId in cache[itemId])
                {
                    if (cachedVariationId === variationId)
                    {
                        return cache[itemId][variationId].html;
                    }
                }
            }
        }

        return null;
    }

})(jQuery);
