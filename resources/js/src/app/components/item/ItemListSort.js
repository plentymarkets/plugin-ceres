var PaginationService = require('services/PaginationService');

Vue.component('item-list-sort', {

    template: '#vue-item-list-sort',

    props: {
        sortedDataList    : String,
        defaultSorting    : String,
        paginationPosition: String,
        defaultItemPerPage: String
    },

    data: function()
    {
        return {
            sortingList         : [],
            itemPerPageList     : [],
            itemsPerPageSelected: 0,
            sortPossibilityLang: {
                "itemId_asc"                        : "Item ID (ascending)",
                "itemId_desc"                       : "Item ID (descending)",
                "itemName_asc"                      : "Item name (ascending)",
                "itemName_desc"                     : "Item name (descending)",
                "itemPosition_asc"                  : "Item position (ascending)",
                "itemPosition_desc"                 : "Item position (descending)",
                "itemPrice_asc"                     : "Item price (ascending)",
                "itemPrice_desc"                    : "Item price (descending)",
                "itemRating_asc"                    : "Item rating (ascending)",
                "itemRating_desc"                   : "Item rating (descending)",
                "variationCreateTimestamp_asc"      : "Variation creation time (ascending)",
                "variationCreateTimestamp_desc"     : "Variation creation time (descending)",
                "variationId_asc"                   : "Variation ID (ascending)",
                "variationId_desc"                  : "Variation ID (descending)",
                "variationCustomNumber_asc"         : "Variation custom number (ascending)",
                "variationCustomNumber_desc"        : "Variation custom number (descending)",
                "variationLastUpdateTimestamp_asc"  : "Variation last update timestamp (ascending)",
                "variationLastUpdateTimestamp_desc" : "Variation last update timestamp (descending)",
                "variationName_asc"                 : "Variation name (ascending)",
                "variationName_desc"                : "Variation name (descending)",
                "variationPosition_asc"             : "Variation position (ascending)",
                "variationPosition_desc"            : "Variation position (descending)",
                "variationActive_asc"               : "Variation active (ascending)",
                "variationActive_desc"              : "Variation active (descending)",
                "variationPrimary_asc"              : "Variation primary (ascending)",
                "variationPrimary_desc"             : "Variation primary (descending)",
                "itemRand"                          : "Item random",
                "itemProducerName_asc"              : "Variation custom number (ascending)",
                "itemProducerName_desc"             : "Variation custom number (descending)",








                "top_sell": Translations.Callisto.itemCategoryTopItems,
                "item_asc": Translations.Callisto.itemCategoryItemAsc,
                "item_desc": Translations.Callisto.itemCategoryItemDesc,
                "name_asc": Translations.Callisto.itemCategoryNameAsc,
                "name_desc": Translations.Callisto.itemCategoryNameDesc,
                "price_asc": Translations.Callisto.itemCategoryPriceAsc,
                "price_desc": Translations.Callisto.itemCategoryPriceDesc,
                "release_asc": Translations.Callisto.itemCategoryReleaseAsc,
                "release_desc": Translations.Callisto.itemCategoryReleaseDesc,
                "store_special_asc": Translations.Callisto.itemCategoryStoreSpecialAsc,
                "store_special_desc": Translations.Callisto.itemCategoryStoreSpecialDesc,
                "id_desc": Translations.Callisto.itemCategoryIdDesc,
                "random": Translations.Callisto.itemCategoryRandom
            }
        };
    },

    ready: function()
    {
        this.initSorting();
        this.initItemsPerPageList();

        console.log(this);
    },

    methods: {
        initSorting: function()
        {
            var sortBy = this.getQueryStringValue("itemSorting") || this.defaultSorting;

            var sortList = JSON.parse(this.sortedDataList);
            for (var entry in sortList)
            {
                var sortKey = sortList[entry];
                if (sortKey) {
                    this.sortingList.push({
                        value: sortKey,
                        selected: (sortKey == sortBy),
                        name: (this.sortPossibilityLang[sortKey] || sortKey)
                    });
                }
            }
        },

        initItemsPerPageList: function ()
        {
            var listItemsPerPage = this.getQueryStringValue("items_per_page");
            if (listItemsPerPage.length > 0)
            {
                this.defaultItemPerPage   = listItemsPerPage;
                this.itemsPerPageSelected = this.defaultItemPerPage;
            }
            else
            {
                this.itemsPerPageSelected = this.defaultItemPerPage;
            }
            PaginationService.itemsPerPage = this.itemsPerPageSelected;

            var defaultItemPerPageOptions = [];
            defaultItemPerPageOptions.push({value: 20, selected: 20 == this.defaultItemPerPage});
            defaultItemPerPageOptions.push({value: 50, selected: 50 == this.defaultItemPerPage});
            defaultItemPerPageOptions.push({value: 100, selected: 100 == this.defaultItemPerPage});

            this.itemPerPageList = defaultItemPerPageOptions;
        },

        getQueryStringValue: function(key)
        {
            return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        },

        currentURL: function()
        {
            return window.location.href.split('?')[0];
        },

        updateSelectedItemsPerPage: function()
        {
            PaginationService.itemsPerPage = this.itemsPerPageSelected;
        }
    }
});
