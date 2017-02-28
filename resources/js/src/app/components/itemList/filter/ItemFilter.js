var FilterService = require("services/ItemFilterService");

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
                    if (typeof this.selected[i].names != "undefined")
                    {
                        names.push(this.selected[i].names[0].name);
                    }
                    else
                    {
                        for (var index = 0; index < this.facet.values.length; index++)
                        {
                            if (this.facet.values[index].id == this.selected[i])
                            {
                                names.push(this.facet.values[index].names[0].name);
                            }
                        }
                    }
                }

                return names;
            }

            return "";
        }
    }
});
