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

    ready()
    {
        this.changeTooltipText();
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
                    this.changeTooltipText();
                }.bind(this));
        },

        removeFromWishList()
        {
            ApiService.delete("/rest/io/itemWishList/" + this.variationId)
                .done(function()
                {
                    this.isActive = false;
                    this.changeTooltipText();
                }.bind(this));
        },

        changeTooltipText()
        {
            const tooltipText = this.isActive ? "itemRemoveFromWishList" : "itemAddToWishList";

            $(".add-to-wishList").attr("data-original-title", Translations.Template[tooltipText]).tooltip("hide").tooltip("setContent");
        }
    }
});
