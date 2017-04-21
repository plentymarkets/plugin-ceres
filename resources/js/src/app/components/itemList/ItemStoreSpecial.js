var ResourceService = require("services/ResourceService");
var accounting = require("accounting");

Vue.component("item-store-special", {

    template: "#vue-item-store-special",

    props: [
        "storeSpecial",
        "recommendedRetailPrice",
        "variationRetailPrice",
        "decimalCount"
    ],

    data: function()
    {
        return {
            tagClassPrefix: "bg-",
            localization  : {}
        };
    },

    created: function()
    {
        ResourceService.bind("localization", this);
    },

    methods: {
        getPercentageSale: function()
        {
            var percent = 100 - (this.recommendedRetailPrice / this.variationRetailPrice * 100);

            return accounting.formatNumber(percent, this.decimalCount, "");
        }
    },

    computed: {
        label: function()
        {
            if (this.storeSpecial.id === 1)
            {
                var percent = this.getPercentageSale();

                if (percent <= 0)
                {
                    return percent + "%";
                }
            }

            return this.storeSpecial.names.name;
        },

        tagClass: function()
        {
            if (this.storeSpecial.id === 1)
            {
                return this.tagClassPrefix + "danger";
            }
            else if (this.storeSpecial.id === 2)
            {
                return this.tagClassPrefix + "primary";
            }
            return this.tagClassPrefix + "success";
        }
    }
});
