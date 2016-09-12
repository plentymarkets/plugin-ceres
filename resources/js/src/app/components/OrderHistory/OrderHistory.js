var ApiService = require('services/ApiService');

Vue.component('order-history', {

    template: '#vue-order-history',

    props: [
        "contactId",
        "orderMaxCountPagination"
    ],

    data: function()
    {
        return {
            //needed for pagination
            currentPaginationEntry: 1,
            numberOfEntries       : 1,
            showItemsOf           : "1-6",
            itemsPerPage          : 6,
            //orderObjectToRender
            orderList             : []
        };
    },

    ready: function()
    {
        this.updateOrderList(1);

        this.numberOfEntries = this.calculateMaxPages();
    },

    methods: {
        //extend this method params for filter handling
        updateOrderList: function(page)
        {
            this.currentPaginationEntry = page;

            var self = this;

            ApiService.get("/rest/order?page=" + page + "&items=" + this.itemsPerPage)
                .done(function(response)
                {
                    ApiService.setToken(response);

                    self.orderList = response["entries"];

                    //calculate the show X - X items
                    this.showItemsOf = (((this.currentPaginationEntry - 1) * this.itemsPerPage) + 1) + " - " + (((this.currentPaginationEntry - 1) * this.itemsPerPage) + this.itemsPerPage);
                })
                .fail(function(response)
                {
                    //todo
                });
        },

        calculateMaxPages: function()
        {
            var pages        = this.orderMaxCountPagination / this.itemsPerPage;
            var roundedPages = Math.floor(pages);

            return roundedPages;
        },

        showFirstPaginationEntry: function()
        {
            var show = true;

            if (this.currentPaginationEntry <= 2)
            {
                show = false;
            }

            return show;
        },

        getLastPaginationEntry: function()
        {
            return this.numberOfEntries;
        },

        showLastPaginationEntry: function()
        {
            var show = false;

            if (this.currentPaginationEntry < this.numberOfEntries - 1)
            {
                show = true;
            }

            return show;
        },

        previousPaginationEntry: function()
        {
            var previousPage = this.currentPaginationEntry - 1;

            if (previousPage <= 1)
            {
                previousPage = 1;
            }

            return previousPage;
        },

        nextPaginationEntry: function()
        {
            var nextPage = this.currentPaginationEntry + 1;

            if (nextPage >= this.numberOfEntries)
            {
                nextPage = this.numberOfEntries;
            }

            return nextPage;
        },

        showDotsLeft: function()
        {
            var show = true;

            if (this.currentPaginationEntry <= 3)
            {
                show = false;
            }

            return show;
        },

        showDotsRight: function()
        {
            var show = true;

            if (this.currentPaginationEntry >= this.numberOfEntries - 2)
            {
                show = false;
            }

            return show;
        },

        showArrowsLeft: function()
        {
            var show = false;

            if (this.currentPaginationEntry > 1)
            {
                show = true;
            }

            return show;
        },

        showArrowsRight: function()
        {
            var show = true;

            if (this.currentPaginationEntry == this.numberOfEntries)
            {
                show = false;
            }

            return show;
        }
    }
});
