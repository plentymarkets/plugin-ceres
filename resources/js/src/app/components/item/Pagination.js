var PaginationService = require("services/PaginationService");

Vue.component("item-list-pagination", {

    template: "#vue-item-list-pagination",

    props: [
        "paginationPosition",
        "position",
        "itemList",
        "maxCount"
    ],

    data: function()
    {
        return {
            currentPaginationEntry: 1,
            currentURL            : "",
            numberOfEntries       : 1
        };
    },

    /**
     * initialize pagination necessary variables
     */
    ready: function()
    {
        this.currentPaginationEntry = this.getQueryStringValue("page");
        var url                     = window.location.href;

        this.currentURL = url.replace("&page=" + this.currentPaginationEntry, "");
        this.currentPaginationEntry = parseInt(this.currentPaginationEntry) || 1;

        this.numberOfEntries = this.calculateMaxPages();

        if (this.currentPaginationEntry < 0)
        {
            this.currentPaginationEntry = 1;
        }
        else if (this.currentPaginationEntry > this.numberOfEntries)
        {
            this.currentPaginationEntry = this.numberOfEntries;
        }
    },

    methods: {
        /**
         * get param from the url
         * @param key
         * @returns {string}
         */
        getQueryStringValue: function(key)
        {
            return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        },

        /**
         * calculate how much pages exist
         * @returns {*}
         */
        calculateMaxPages: function()
        {
            var pages        = (this.maxCount / PaginationService.itemsPerPage);
            var roundedPages = pages.toString().split(".");

            if (roundedPages[1] > 0)
            {
                roundedPages[0] = parseInt(roundedPages[0]) + 1;
            }

            return roundedPages[0];
        },

        /**
         * get the new items and update the category list
         * @param page
         */
        updateItemCategoryList: function(page)
        {
            if (this.currentURL.split("?").length > 0)
            {
                this.currentURL = this.currentURL.split("?")[0];
            }

            var url = this.currentURL + "?page=" + page + "&items_per_page=" + PaginationService.itemsPerPage;

            window.open(url, "_self");
        },

        /**
         * show pagination top, bottom or top-bottom
         * @returns {*}
         */
        showPagination: function()
        {
            return this.paginationPosition.includes(this.position);
        },

        /**
         * show the first pagination entry
         * @returns {boolean}
         */
        showFirstPaginationEntry: function()
        {
            var show = true;

            if (this.currentPaginationEntry <= 2)
            {
                show = false;
            }

            return show;
        },

        /**
         * get the last entry in the pagination
         * @returns {*}
         */
        getLastPaginationEntry: function()
        {
            return this.numberOfEntries;
        },

        /**
         * show the last pagination entry
         * @returns {boolean}
         */
        showLastPaginationEntry: function()
        {
            var show = false;

            if (this.currentPaginationEntry < this.numberOfEntries - 1)
            {
                show = true;
            }

            return show;
        },

        /**
         * get the previous pagination entry
         * @returns {number}
         */
        previousPaginationEntry: function()
        {
            var previousPage = this.currentPaginationEntry - 1;

            if (previousPage <= 1)
            {
                previousPage = 1;
            }

            return previousPage;
        },

        /**
         * get the next pagination entry
         * @returns {*}
         */
        nextPaginationEntry: function()
        {
            var nextPage = this.currentPaginationEntry + 1;

            if (nextPage >= this.numberOfEntries)
            {
                nextPage = this.numberOfEntries;
            }

            return nextPage;
        },

        /**
         * show the dots on the left side
         * @returns {boolean}
         */
        showDotsLeft: function()
        {
            var show = true;

            if (this.currentPaginationEntry <= 3)
            {
                show = false;
            }

            return show;
        },

        /**
         * show the dots on the right side
         * @returns {boolean}
         */
        showDotsRight: function()
        {
            var show = true;

            if (this.currentPaginationEntry >= this.numberOfEntries - 2)
            {
                show = false;
            }

            return show;
        },

        /**
         * show the arrows on the left side
         * @returns {boolean}
         */
        showArrowsLeft: function()
        {
            var show = false;

            if (this.currentPaginationEntry > 1)
            {
                show = true;
            }

            return show;
        },

        /**
         * show the arrows on the right side
         * @returns {boolean}
         */
        showArrowsRight: function()
        {
            var show = true;

            if (this.currentPaginationEntry === this.numberOfEntries)
            {
                show = false;
            }

            return show;
        }
    }
});
