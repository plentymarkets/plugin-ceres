var ItemListService = require("services/ItemListService");
var UrlService = require("services/UrlService");

Vue.component("item-list-sorting", {

    props: [
        "sortData",
        "template"
    ],

    data: function()
    {
        return {
            selectedSorting: {}
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        this.buildData();
        this.selectedSorting = this.sortData[0];

        this.setSelectedValueByUrl();
    },

    methods:
    {
        buildData: function()
        {
            for (var i in this.sortData)
            {
                var data = this.sortData[i];
                var sortItem =
                    {
                        value      : data,
                        displayName: Translations.Template[data]
                    };

                this.sortData[i] = sortItem;
            }
        },

        updateSorting: function()
        {
            ItemListService.setOrderBy(this.selectedSorting.value);
            ItemListService.getItemList();
        },

        setSelectedValueByUrl: function()
        {
            var urlParams = UrlService.getUrlParams(document.location.search);

            if (urlParams.orderBy)
            {
                for (var i in this.sortData)
                {
                    if (this.sortData[i].value === urlParams.orderBy)
                    {
                        this.selectedSorting = this.sortData[i];
                        ItemListService.setOrderBy(this.selectedSorting.value);
                    }
                }
            }
        }
    }
});
