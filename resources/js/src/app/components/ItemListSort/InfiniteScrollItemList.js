var PaginationService = require('services/PaginationService');
var LoadItemsService  = require('services/LoadItemsService');

Vue.component("infinite-scroll-item-list", {

    props: {
        infiniteConfig: {
            limit     : 20,           // count of items to load.
            offset    : 0,           // amount of items we want to skip on following call.
            isLastPage: false
        }
    },

    directives: {
        'infinite-scroll': require('vue-infinite-scroll').infiniteScroll
    },

    data: function()
    {
        return {
            isBusy: false      // if infinite scroll is busy, load event is disabled.
        };
    },

    methods: {
        loadMoreItems: function(categoryID)
        {
            var self    = this;
            var data    = {
                limit : self.infiniteConfig.limit,
                offset: self.infiniteConfig.offset,
                page  : self.infiniteConfig.offset / self.infiniteConfig.limit
            };
            self.isBusy = true;

            if (!self.isLastPage)
            {
                LoadItemsService().loadItems(categoryID, data, this.$el, function(response)
                {
                    if (response.data)
                    {
                        response = response.data;
                    }

                    if (response.isLastPage || response.entries.length <= 0)
                    {
                        self.isBusy     = true;
                        self.isLastPage = response.isLastPage;
                        // TODO remove log and add "All elements loaded" event
                        console.log("All items loaded. No more items to get.");

                        // update pagination indicator
                        var currentItemAmount = (self.infiniteConfig.offset - parseInt(PaginationService.itemsPerPage) + response.entries.length);

                        if ($(".product-count").find("span:not('.text-muted')"))
                        {
                            $(".product-count").find("span:not('.text-muted')").html("1 - " + currentItemAmount);
                        }
                        return;
                    }
                    self.appendItems(self.$el, response.entries);
                    self.infiniteConfig.offset += parseInt(PaginationService.itemsPerPage);
                    self.isBusy = false;

                    // update pagination indicator
                    if ($(".product-count").find("span:not('.text-muted')"))
                    {
                        $(".product-count").find("span:not('.text-muted')").html("1 - " + self.infiniteConfig.offset);
                    }
                });
            }
        },

        appendItems: function(el, itemList)
        {
            /**
             * Append more items to item list.
             *
             * @type {any}
             */
            var isGridView = $(this.$el).hasClass("grid");
            var newNode;
            var item;
            var att;

            for (var i = 0, length = itemList.length; i < length; i++)
            {
                item              = itemList[i];
                newNode           = document.createElement('li');
                newNode.innerHTML = '<category-list-item :item=\'' + JSON.stringify(item) + '\' base-url=""></category-list-item>';
                newNode           = el.appendChild(newNode);

                // compile new added (directive) element
                this.$compile(newNode);

                // setting up new elements for grid or list view.
                if (isGridView)
                {
                    $(newNode).find("article").addClass("grid");
                }
                else
                {
                    $(newNode).find("article").removeClass("grid");
                }

                newNode = null;
            }
        }
    }
});