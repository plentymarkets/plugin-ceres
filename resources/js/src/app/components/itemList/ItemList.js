var ResourceService = require("services/ResourceService");
var ItemListService = require("services/ItemListService");

Vue.component("item-list", {

    props: [
        "template"
    ],

    data: function()
    {
        return {
            itemList: {},
            isLoading: false,
            filterListState: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
        ResourceService.bind("isLoading", this);

        ItemListService.setSearchParams(document.location.search);

        this.watchFacetOpeningState();
    },

    methods:
    {
        watchFacetOpeningState: function()
        {
            if (document.getElementById("filterCollapse") !== null)
            {
                var observer = new MutationObserver(function(mutation)
                {
                    if (!document.getElementById("filterCollapse").classList.contains("collapsing"))
                    {
                        this.filterListState = document.getElementById("filterCollapse").classList.contains("in");
                    }
                }.bind(this));

                var targetToWatch = document.getElementById("filterCollapse");

                observer.observe(targetToWatch, {attributes: true, subtree: true});
            }
        }
    },

    watch:
    {
        isLoading: function()
        {
            this.watchFacetOpeningState();
        },

        itemList: function()
        {
            if (!$.isEmptyObject(this.itemList) && document.getElementById("filterCollapse") !== null)
            {
                if (this.filterListState)
                {
                    document.getElementById("filterCollapse").classList.add("in");
                }
            }
        }
    }
});
