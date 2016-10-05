var ApiService = require("services/ApiService");

module.exports = (function($)
{

    var basket;
    var readyDeferred;
    var loading            = false;
    var watchers           = [];
    var basketItemToDelete = {};

    return {
        init                 : init,
        watch                : watch,
        getBasket            : getBasket,
        addBasketItem        : addBasketItem,
        updateBasketItem     : updateBasketItem,
        deleteBasketItem     : deleteBasketItem,
        updateShippingCountry: updateShippingCountry,
        basketItemToDelete   : basketItemToDelete
    };

    /**
     * Initialise the basket
     * @param basketData
     * @returns {*}
     */
    function init(basketData)
    {
        if (!readyDeferred)
        {
            readyDeferred = $.Deferred();
            if (!!basketData)
            {
                basket = basketData;
                notify();
                readyDeferred.resolve();
            }
            else
            {
                ApiService.get("/rest/basket").done(function(response)
                {
                    basket = response;
                    notify();
                    readyDeferred.resolve();
                });
            }

        }

        return readyDeferred;
    }

    /**
     * Add a watcher to the basket
     * @param callback
     */
    function watch(callback)
    {
        watchers.push(callback);
        if (!!basket)
        {
            callback(basket);
        }
    }

    /**
     *
     */
    function notify()
    {
        for (var i = 0; i < watchers.length; i++)
        {
            watchers[i](basket);
        }
    }

    function getBasket()
    {
        return basket;
    }

    function addBasketItem(basketItem)
    {
        var self = this;
        return ApiService.post("/rest/basket/items/", basketItem)
            .done(function(response)
            {
                basket = response;
                notify();
            });
    }

    function updateBasketItem(basketItem)
    {
        var self = this;
        return ApiService.put("/rest/basket/items/" + basketItem.id, basketItem)
            .done(function(response)
            {
                basket = response;
                notify();
            });
    }

    function updateShippingCountry(basket)
    {
        var id   = basket.shippingCountryId;
        var self = this;
        return ApiService.put("/rest/deliverycountry/" + id, basket)
            .done(function(response)
            {
                basket = response;
                notify();
            });
    }

    function deleteBasketItem(basketItem)
    {
        var self = this;
        var basketItemId;
        if (typeof basketItem === "number")
        {
            basketItemId = basketItem;
        }
        else
        {
            basketItemId = basketItem.id;
        }

        return ApiService.delete("/rest/basket/items/" + basketItemId)
            .done(function(response)
            {
                basket = response;
                notify();
            });
    }

})(jQuery);
