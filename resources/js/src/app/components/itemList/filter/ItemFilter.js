var FilterService   = require("services/ItemFilterService");
var ResourceService = require("services/ResourceService");

Vue.component("item-filter", {

    props: [
        "template",
        "facet"
    ],

    data: function()
    {
        return {
            selected: []
        };
    },

    created: function()
    {
        this.$options.template = this.template || "#vue-item-filter";

        this.selected = FilterService.getFilterValuesByName(this.facet.names[0].name);

        console.log(FilterService.getFilterValues());
    },

    computed:
    {
        selectedNames: function()
        {
            if (this.selected.length > 0)
            {
                var names = [];

                for (var i = 0; i < this.selected.length; i++)
                {
                    for (var index = 0; index < this.facet.values.length; index++)
                    {
                        if (this.facet.values[index].id == this.selected[i] && names.indexOf(this.facet.values[index].names[0].name) == -1)
                        {
                            names.push(this.facet.values[index].names[0].name);
                        }
                    }
                }

                return names;
            }

            return "";
        }
    },

    methods:
    {
        getFilteredItems: function()
        {
            //call service
        }
    }
});
