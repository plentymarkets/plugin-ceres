module.exports = (function($)
{

    var itemsPerPagePrivate = 0;
    var sortModePrivate     = "";

    return {
        itemsPerPage   : itemsPerPagePrivate,
        sortMode       : sortModePrivate,
        setItemsPerPage: setItemsPerPage,
        setSortMode    : setSortMode
    };

    function setItemsPerPage(itemsPerPage)
    {
        this.itemsPerPagePrivate = itemsPerPage;
    }

    function setSortMode(sortMode)
    {
        this.sortModePrivate = sortMode;
    }

})(jQuery);
