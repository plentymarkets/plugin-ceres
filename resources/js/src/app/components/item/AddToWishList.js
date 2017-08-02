const ApiService = require("services/ApiService");

Vue.component("add-to-wish-list", {

    props: [
        "isActive",
        "variationId",
        "template"
    ],

    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
        switchState()
        {
            if (this.isActive)
            {
                this.removeFromWishList();
            }
            else
            {
                this.addToWishList();
            }
        },

        addToWishList()
        {
            ApiService.post("/rest/io/itemWishList", {variationId: this.variationId})
                .done(function()
                {
                    this.isActive = true;
                }.bind(this));
        },

        removeFromWishList()
        {
            ApiService.delete("/rest/io/itemWishList/" + this.variationId)
                .done(function()
                {
                    this.isActive = false;
                }.bind(this));
        }
    }
});
