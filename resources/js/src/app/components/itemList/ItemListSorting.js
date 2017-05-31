var ItemListService = require("services/ItemListService");

import UrlService from "services/UrlService";

Vue.component("item-list-sorting", {

    props: [
        "sortData",
        "template",
        "isSearch"
    ],

    data: function()
    {
        return {
            selectedSorting: {},
            dataTranslationMapping:
            {
                "default.standard_sorting"   : "itemStandardSorting",
                "item.id_asc"                : "itemId_asc",
                "item.id_desc"               : "itemId_desc",
                "texts.name1_asc"            : "itemName_asc",
                "texts.name1_desc"           : "itemName_desc",
                "item.position_asc"          : "itemPosition_asc",
                "item.position_desc"         : "itemPosition_desc",
                "item.salesPrice.price_asc"  : "itemPrice_asc",
                "item.salesPrice.price_desc" : "itemPrice_desc",
                "variation.createdAt_asc"    : "variationCreateTimestamp_asc",
                "variation.createdAt_desc"   : "variationCreateTimestamp_desc",
                "variation.id_asc"           : "variationId_asc",
                "variation.id_desc"          : "variationId_desc",
                "variation.number_asc"       : "variationCustomNumber_asc",
                "variation.number_desc"      : "variationCustomNumber_desc",
                "variation.updatedAt_asc"    : "variationLastUpdateTimestamp_asc",
                "variation.updatedAt_desc"   : "variationLastUpdateTimestamp_desc",
                "variation.position_asc"     : "variationPosition_asc",
                "variation.position_desc"    : "variationPosition_desc",
                "variation.isActive_asc"     : "variationActive_asc",
                "variation.isActive_desc"    : "variationActive_desc",
                "variation.isMain_asc"       : "variationPrimary_asc",
                "variation.isMain_desc"      : "variationPrimary_desc",
                "item.manufacturer.name_asc" : "itemProducerName_asc",
                "item.manufacturer.name_desc": "itemProducerName_desc"
            }
        };
    },

    created: function()
    {
        this.$options.template = this.template;

        if (this.isSearch)
        {
            this.sortData.push("item.score");
            this.dataTranslationMapping["item.score"] = "itemRelevance";
        }

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
                        displayName: Translations.Template[this.dataTranslationMapping[data]]
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

            if (urlParams.sorting)
            {
                for (var i in this.sortData)
                {
                    if (this.sortData[i].value === urlParams.sorting)
                    {
                        this.selectedSorting = this.sortData[i];
                        ItemListService.setOrderBy(this.selectedSorting.value);
                    }
                }
            }
        }
    }
});
