var ApiService = require("services/ApiService");

module.exports = (function($)
{

    return {
        getItemList: getItemList
    };

    function getItemList(searchString)
    {
        var searchParams =
            {
                searchString: searchString,
                itemsPerPage: 20,
                orderBy: "itemName",
                orderByKey: "ASC",
                page: 1
            };

        return ApiService.get("/rest/item/search", searchParams);
    }
})(jQuery);
