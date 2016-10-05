var PaginationService = require("services/PaginationService");

Vue.component("item-list-sort", {

    template: "#vue-item-list-sort",

    props: {
        sortedDataList    : String,
        defaultSorting    : String,
        topCell           : String,
        itemAsc           : String,
        itemDesc          : String,
        nameAsc           : String,
        nameDesc          : String,
        priceAsc          : String,
        priceDesc         : String,
        releaseAsc        : String,
        releaseDesc       : String,
        storeSpecialAsc   : String,
        storeSpecialDesc  : String,
        idDesc            : String,
        random            : String,
        paginationPosition: String,
        defaultItemPerPage: String,
        position          : String
    },

    data: function()
    {
        return {
            sortingList         : [],
            itemPerPageList     : [],
            itemsPerPageSelected: 0
        };
    },

    methods: {
        /**
         * Initialise the available sorting options
         */
        initPropsValues: function()
        {
            this.sortedDataList = JSON.parse(this.sortedDataList);

            if (this.sortedDataList)
            {
                this.topCell = this.sortedDataList.indexOf("top_cell") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.itemAsc = this.sortedDataList.indexOf("item_asc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.itemDesc = this.sortedDataList.indexOf("item_desc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.nameAsc = this.sortedDataList.indexOf("name_asc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.nameDesc = this.sortedDataList.indexOf("name_desc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.priceAsc = this.sortedDataList.indexOf("price_asc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.priceDesc = this.sortedDataList.indexOf("price_desc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.releaseAsc = this.sortedDataList.indexOf("release_asc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.releaseDesc = this.sortedDataList.indexOf("release_desc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.storeSpecialAsc = this.sortedDataList.indexOf("store_special_asc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.storeSpecialDesc = this.sortedDataList.indexOf("store_special_desc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.idDesc = this.sortedDataList.indexOf("id_desc") > -1 || this.sortedDataList.indexOf("all") > -1;
                this.random = this.sortedDataList.indexOf("random") > -1 || this.sortedDataList.indexOf("all") > -1;
            }
        },

        /**
         * Get the parameters from the URL
         * @param key
         * @returns {string}
         */
        getQueryStringValue: function(key)
        {
            return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        },

        /**
         * Get the current URL without any parameters
         * @returns {*}
         */
        currentURL: function()
        {
            var url = window.location.href.split("?")[0];

            return url;
        },

        /**
         * Show the pagination at the position which is set in the config
         * @returns {boolean}
         */
        showPagination: function()
        {
            var show = this.paginationPosition;

            return show;
        },

        /**
         * Set the items per page box value to the value of the service
         */
        updateSelectedItemsPerPage: function()
        {
            PaginationService.itemsPerPage = this.itemsPerPageSelected;
        },

        /**
         * Initialise the default sorting option
         * @returns {Array}
         */
        initSortingList: function()
        {
            var defaultSortingOptions = [];

            if (this.topCell == true)
            {
                defaultSortingOptions.push({value: "top_cell", selected: this.defaultSorting == "top_cell", name: Translations.Callisto.itemCategoryTopItems});
            }
            if (this.itemAsc == true)
            {
                defaultSortingOptions.push({value: "item_asc", selected: this.defaultSorting == "item_asc", name: Translations.Callisto.itemCategoryItemAsc});
            }
            if (this.itemDesc == true)
            {
                defaultSortingOptions.push({value: "item_desc", selected: this.defaultSorting == "item_desc", name: Translations.Callisto.itemCategoryItemDesc});
            }
            if (this.nameAsc == true)
            {
                defaultSortingOptions.push({value: "name_asc", selected: this.defaultSorting == "name_asc", name: Translations.Callisto.itemCategoryNameAsc});
            }
            if (this.nameDesc == true)
            {
                defaultSortingOptions.push({value: "name_desc", selected: this.defaultSorting == "name_desc", name: Translations.Callisto.itemCategoryNameDesc});
            }
            if (this.priceAsc == true)
            {
                defaultSortingOptions.push({value: "price_asc", selected: this.defaultSorting == "price_asc", name: Translations.Callisto.itemCategoryPriceAsc});
            }
            if (this.priceDesc == true)
            {
                defaultSortingOptions.push({value: "price_desc", selected: this.defaultSorting == "price_desc", name: Translations.Callisto.itemCategoryPriceDesc});
            }
            if (this.releaseAsc == true)
            {
                defaultSortingOptions.push({value: "release_asc", selected: this.defaultSorting == "release_asc", name: Translations.Callisto.itemCategoryReleaseAsc});
            }
            if (this.releaseDesc == true)
            {
                defaultSortingOptions.push({value: "release_desc", selected: this.defaultSorting == "release_desc", name: Translations.Callisto.itemCategoryReleaseDesc});
            }
            if (this.storeSpecialAsc == true)
            {
                defaultSortingOptions.push({value: "store_special_asc", selected: this.defaultSorting == "store_special_asc", name: Translations.Callisto.itemCategoryStoreSpecialAsc});
            }
            if (this.storeSpecialDesc == true)
            {
                defaultSortingOptions.push({value: "store_special_desc", selected: this.defaultSorting == "store_special_desc", name: Translations.Callisto.itemCategoryStoreSpecialDesc});
            }
            if (this.idDesc == true)
            {
                defaultSortingOptions.push({value: "id_desc", selected: this.defaultSorting == "id_desc", name: Translations.Callisto.itemCategoryIdDesc});
            }
            if (this.random == true)
            {
                defaultSortingOptions.push({value: "random", selected: this.defaultSorting == "random", name: Translations.Callisto.itemCategoryRandom});
            }

            return defaultSortingOptions;
        },

        /**
         * Initialise the default values for the items per page box
         * @returns {Array}
         */
        initItemPerPageList: function()
        {
            var defaultItemPerPageOptions = [];

            defaultItemPerPageOptions.push({value: 20, selected: this.defaultItemPerPage === 20});
            defaultItemPerPageOptions.push({value: 50, selected: this.defaultItemPerPage === 50});
            defaultItemPerPageOptions.push({value: 100, selected: this.defaultItemPerPage === 100});

            return defaultItemPerPageOptions;
        }
    },

    /**
     * Initialise sorting and pagination
     */
    ready: function()
    {
        this.initPropsValues();

        var itemSorting      = this.getQueryStringValue("itemSorting");
        var listItemsPerPage = this.getQueryStringValue("items_per_page");

        if (itemSorting.length > 0)
        {
            this.defaultSorting = itemSorting;
        }
        if (listItemsPerPage.length > 0)
        {
            this.defaultItemPerPage = listItemsPerPage;
            this.itemsPerPageSelected = this.defaultItemPerPage;
        }
        else
        {
            this.itemsPerPageSelected = this.defaultItemPerPage;
        }

        PaginationService.itemsPerPage = this.itemsPerPageSelected;

        this.sortingList = this.initSortingList();
        this.itemPerPageList = this.initItemPerPageList();
    }
});
