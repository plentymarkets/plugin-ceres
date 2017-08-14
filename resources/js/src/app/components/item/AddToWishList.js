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
            wishListCount: 0,
            isLoading: false
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
            if (!this.isLoading)
            {
                this.isLoading = true;

                this.$store.dispatch("addToWishList", this.variationId).then(response =>
                {
                    this.isActive = true;
                    this.isLoading = false;
                    this.changeTooltipText();
                    this.updateWatchListCount(parseInt(this.wishListCount.count) + 1);
                },
                error =>
                {
                    this.isLoading = false;
                });
            }
        },

        removeFromWishList()
        {
            if (!this.isLoading)
            {
                this.isLoading = true;

                this.$store.dispatch("removeWishListItem", this.variationId).then(response =>
                {
                    this.isActive = false;
                    this.isLoading = false;
                    this.changeTooltipText();
                    this.updateWatchListCount(parseInt(this.wishListCount.count) - 1);
                },
                error =>
                {
                    this.isLoading = false;
                });
            }
        },

        changeTooltipText()
        {
            const tooltipText = this.isActive ? "itemRemoveFromWishList" : "itemAddToWishList";

            $(".add-to-wish-list").attr("data-original-title", Translations.Template[tooltipText]).tooltip("hide").tooltip("setContent");
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
