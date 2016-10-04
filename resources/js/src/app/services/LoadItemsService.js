var ApiService = require("services/ApiService");

module.exports = (function($)
{
    return {
        loadItems: _loadItems
    };

    function _loadItems(categoryID, data, el, callback)
    {
        var url = "/rest/category_items_list/" + categoryID + "/";

        ApiService.get(url, data)
            .done(function(response)
            {
                callback(response);
            }).fail(function(error)
            {
                console.log("error by: ", url, error);
            }
        );
    }
});
