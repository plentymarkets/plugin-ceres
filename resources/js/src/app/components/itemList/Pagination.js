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
        // TODO
        // ItemListService.setItemsPerPage(this.itemsPerPage, false);
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
