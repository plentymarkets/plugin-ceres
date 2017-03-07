var ResourceService = require("services/ResourceService");

Vue.component("item-list", {

    props: [
        "template",
        "itemList"
    ],

    data: function()
    {
        return {
            isLoading: false,
            filterListState: false
        };
    },

    created: function()
    {
        this.$options.template = this.template;
        ResourceService.getResource("itemList").set(this.itemList);
    },

    ready: function()
    {
        ResourceService.bind("itemList", this);
        ResourceService.bind("isLoading", this);
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
        itemList: function()
        {
            this.watchFacetOpeningState();

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
