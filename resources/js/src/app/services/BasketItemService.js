module.exports = (function($) {

    var basketItems = [ ];

    return {
        basketItems: basketItems,
        addBasketItem: addBasketItem,
        getItemCount: getItemCount,
        setBasketItems: setBasketItems
    }

    function addBasketItem(basketItem) {
        basketItems.push(basketItem);
    }

    function setBasketItems(items) {
        basketItems = items;
    }

    function getItemCount()
    {
        var count = 0;
        var basketItems = BasketItemService.basketItems;
        for( var i = 0; i < basketItems.length; i++ )
        {
            count += basketItems[i].quantity;
        }

        return count;
    }

})(jQuery);
