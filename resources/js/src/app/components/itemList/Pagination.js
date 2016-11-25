var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("pagination", {

    template: "#vue-pagination",

    props: [
        "itemsPerPage"
    ],

    data: function()
    {
        return {
            itemList: {
                page       : 1,
                totalsCount: 0
            }
        };
    },

    created: function()
    {
        ItemListService.setItemsPerPage(this.itemsPerPage);
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
    },

    methods:
    {
        setPage: function(page)
        {
            ItemListService.setPage(page);
            // call to get data for page

        },

        getItemList: function()
        {
            ItemListService.getItemList(this.searchString)
                .done(function(response)
                {
                    ResourceService.getResource("itemList").set(response);

                })
                .fail(function()
                {
                    NotificationService.error("Error while searching").closeAfter(5000);
                });
        }
    },

    computed:
    {
        page: function()
        {
            return this.itemList.page || 1;
        },

        pageMax: function()
        {
            var pageMax = this.itemList.totalsCount / this.itemsPerPage;

            if (this.itemList.totalsCount % this.itemsPerPage > 0)
            {
                pageMax += 1;
            }

            return parseInt(pageMax) || 1;
        }
    }
});
