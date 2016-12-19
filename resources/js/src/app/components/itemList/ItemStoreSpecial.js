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
            tagClass: "bg-",
            label: ""
        };
    },

    ready: function()
    {
        this.setStoreSpecial();
    },

    methods:
    {
        /**
         * set the store-special based on instances' data
         */
        setStoreSpecial : function()
        {
            if (this.storeSpecial === 1)
            {
                this.setStoreSpecialSale();
            }
            else if (this.storeSpecial === 2)
            {
                this.setStoreSpecialNew();
            }
            else if (this.storeSpecial === 3)
            {
                this.setStoreSpecialTop();
            }
        },

        /**
         * set the store-special to SALE
         */
        setStoreSpecialSale: function()
        {
            this.tagClass += "danger";

            var percent = 100 - (this.recommendedRetailPrice / this.variationRetailPrice * 100);

            if (percent > 0)
            {
                this.label = "SALE";
            }
            else
            {
                percent = accounting.formatNumber(percent, this.decimalCount, "");
                this.label = percent + "%";
            }
        },

        /**
         * set the store-special to NEW
         */
        setStoreSpecialNew: function()
        {
            this.tagClass += "primary";
            this.label = "NEW";
        },

        /**
         * set the store-special to TOP
         */
        setStoreSpecialTop: function()
        {
            this.tagClass += "success";
            this.label = "TOP";
        }
    }
});
