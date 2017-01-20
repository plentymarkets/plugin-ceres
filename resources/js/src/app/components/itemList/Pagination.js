var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("pagination", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            itemSearch: {},
            itemList: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        ResourceService.bind("itemSearch", this);
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
            var pageMax = this.itemList.totalsCount / this.itemSearch.itemsPerPage;

            if (this.itemList.totalsCount % this.itemSearch.itemsPerPage > 0)
            {
                pageMax += 1;
            }

            return parseInt(pageMax) || 1;
        }
    }
});
