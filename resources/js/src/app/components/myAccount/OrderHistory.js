var ApiService = require("services/ApiService");

Vue.component("order-history", {

    template: "#vue-order-history",

    props: [
        "contactId",
        "orderMaxCountPagination"
    ],

    data: function()
    {
        return {
            // Needed for pagination
            currentPaginationEntry: 1,
            numberOfEntries       : 1,
            showItemsOf           : "1-6",
            itemsPerPage          : 6,
            // orderObjectToRender
            orderList             : [],
            statusText            : ""
        };
    },

    /**
     * Get the items of page 1
     * Get the maximum pages for the pagination
     */
    ready: function()
    {
        this.updateOrderList(1);

        this.numberOfEntries = this.calculateMaxPages();

        this.getCurrentOrderStatusText();
    },

    methods: {

        getCurrentOrderStatusText: function()
        {
            var self = this;

            ApiService.get("/rest/order/status/" + 5)
                .done(function(response)
                {
                    ApiService.setToken(response);

                    self.statusText = "DONT WORK";

                    console.log(response);
                })
                .fail(function(response)
                {
                    // TODO
                });
        },

        /**
         * Get a new page of items
         * Extend these method parameters for filter handling
         * @param page
         */
        updateOrderList: function(page)
        {
            this.currentPaginationEntry = page;

            var self = this;

            ApiService.get("/rest/order?page=" + page + "&items=" + this.itemsPerPage)
                .done(function(response)
                {
                    ApiService.setToken(response);

                    self.orderList = response.entries;

                    // Calculate the show X - X items
                    this.showItemsOf = (((this.currentPaginationEntry - 1) * this.itemsPerPage) + 1) + " - " + (((this.currentPaginationEntry - 1) * this.itemsPerPage) + this.itemsPerPage);
                })
                .fail(function(response)
                {
                    // todo
                });
        },

        /**
         * Calculate the number of existing pages
         * @returns {number}
         */
        calculateMaxPages: function()
        {
            var pages        = this.orderMaxCountPagination / this.itemsPerPage;
            var roundedPages = Math.floor(pages);

            return roundedPages;
        },

        /**
         * Show the first pagination entry
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
         * Get the last entry in the pagination
         * @returns {*}
         */
        getLastPaginationEntry: function()
        {
            return this.numberOfEntries;
        },

        /**
         * Show the last pagination entry
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
         * Get the previous pagination entry
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
         * Get the next pagination entry
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
         * Show the dots on the left side
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
         * Show the dots on the right side
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
         * Show the arrows on the left side
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
         * Show the arrows on the right side
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
