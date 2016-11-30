var ItemListService = require("services/ItemListService");

Vue.component("item-list-sorting", {

    template: "#vue-item-list-sorting",

    props: [
        "sortData"
    ],

    data: function()
    {
        return {
            selectedSorting: {}
        };
    },

    created: function()
    {
        this.buildData();
        this.selectedSorting = this.sortData[0];
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
        }
    }
});
