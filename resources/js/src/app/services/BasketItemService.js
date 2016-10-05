module.exports = (function($)
{

    var basketItems = [];

    return {
        basketItems   : basketItems,
        addBasketItem : addBasketItem,
        getItemCount  : getItemCount,
        setBasketItems: setBasketItems
    };

    /**
     * Add an item to the basket
     * @param basketItem
     */
    function addBasketItem(basketItem)
    {
        basketItems.push(basketItem);
    }

    /**
     * Set the basket items to a list of items
     * @param items
     */
    function setBasketItems(items)
    {
        basketItems = items;
    }

    /**
     * Get the items in the basket
     * @returns {number}
     */
    function getItemCount()
    {
        var count       = 0;
        var basketItems = BasketItemService.basketItems;
        for (var i = 0; i < basketItems.length; i++)
        {
            count += basketItems[i].quantity;
        }

        return count;
    }

})(jQuery);
