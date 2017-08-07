const ApiService      = require("services/ApiService");
const ResourceService = require("services/ResourceService");

Vue.component("add-to-wish-list", {

    props: [
        "isActive",
        "variationId",
        "template"
    ],

    data()
    {
        return {
            wishListCount: 0
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    ready()
    {
        ResourceService.bind("wishListCount", this);

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
                    this.updateWatchListCount(parseInt(this.wishListCount.count) + 1);
                }.bind(this));
        },

        removeFromWishList()
        {
            ApiService.delete("/rest/io/itemWishList/" + this.variationId)
                .done(function()
                {
                    this.isActive = false;
                    this.changeTooltipText();
                    this.updateWatchListCount(parseInt(this.wishListCount.count) - 1);
                }.bind(this));
        },

        changeTooltipText()
        {
            const tooltipText = this.isActive ? "itemRemoveFromWishList" : "itemAddToWishList";

            $(".add-to-wishList").attr("data-original-title", Translations.Template[tooltipText]).tooltip("hide").tooltip("setContent");
        },

        updateWatchListCount(count)
        {
            if (count >= 0)
            {
                ResourceService.getResource("wishListCount").set({count: count});
            }
        }
    }
});
