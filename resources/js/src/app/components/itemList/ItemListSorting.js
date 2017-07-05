const ItemListService = require("services/ItemListService");

import UrlService from "services/UrlService";

Vue.component("item-list-sorting", {

    props: [
        "sortData",
        "template"
    ],

    data()
    {
        return {
            selectedSorting: {},
            dataTranslationMapping:
            {
                "default.recommended_sorting"               : "itemRecommendedSorting",
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

    created()
    {
        this.$options.template = this.template;

        if (App.isSearch)
        {
            this.sortData.unshift("item.score");
            this.dataTranslationMapping["item.score"] = "itemRelevance";
        }

        this.buildData();
        this.setDefaultSorting();

        this.setSelectedValueByUrl();
    },

    methods:
    {
        buildData()
        {
            for (const i in this.sortData)
            {
                const data = this.sortData[i];
                const sortItem =
                    {
                        value      : data,
                        displayName: Translations.Template[this.dataTranslationMapping[data]]
                    };

                this.sortData[i] = sortItem;
            }
        },

        setDefaultSorting()
        {
            const defaultSortKey = App.isSearch ? App.config.defaultSortingSearch : App.config.defaultSorting;

            this.selectedSorting = this.sortData.find(entry => entry.value === defaultSortKey);
        },

        updateSorting()
        {
            ItemListService.setOrderBy(this.selectedSorting.value);
            ItemListService.getItemList();
        },

        setSelectedValueByUrl()
        {
            const urlParams = UrlService.getUrlParams(document.location.search);

            if (urlParams.sorting)
            {
                for (const i in this.sortData)
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
