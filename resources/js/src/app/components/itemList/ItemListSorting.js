var ItemListService = require("services/ItemListService");

import UrlService from "services/UrlService";

Vue.component("item-list-sorting", {

    props: [
        "sortData",
        "template"
    ],

    data: function()
    {
        return {
            selectedSorting: {},
            dataTranslationMapping:
            {
                "texts.name1_asc"                           : "itemName_asc",
                "texts.name1_desc"                          : "itemName_desc",
                "item.salesPrices.price_asc"                : "itemPrice_asc",
                "item.salesPrices.price_desc"               : "itemPrice_desc",
                "variation.createdAt_asc"                   : "variationCreateTimestamp_asc",
                "variation.createdAt_desc"                  : "variationCreateTimestamp_desc",
                "variation.availability.averageDays_asc"    : "availabilityAverageDays_asc",
                "variation.availability.averageDays_desc"   : "availabilityAverageDays_desc",
                "variation.number_asc"                      : "variationCustomNumber_asc",
                "variation.number_desc"                     : "variationCustomNumber_desc",
                "variation.updatedAt_asc"                   : "variationLastUpdateTimestamp_asc",
                "variation.updatedAt_desc"                  : "variationLastUpdateTimestamp_desc",
                "item.manufacturer.externalName_asc"        : "itemProducerName_asc",
                "item.manufacturer.externalName_desc"       : "itemProducerName_desc"
            }
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
