const NotificationService = require("services/NotificationService");

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
                this.isActive = true;
                this.changeTooltipText();

                this.$store.dispatch("addToWishList", parseInt(this.variationId)).then(response =>
                {
                    this.isLoading = false;

                    NotificationService.success(Translations.Template.itemWishListAdded);
                },
                error =>
                {
                    this.isLoading = false;
                    this.isActive = false;
                    this.changeTooltipText();
                });
            }
        },

        removeFromWishList()
        {
            if (!this.isLoading)
            {
                this.isLoading = true;
                this.isActive = false;
                this.changeTooltipText();

                this.$store.dispatch("removeWishListItem", {id: parseInt(this.variationId)}).then(response =>
                {
                    this.isLoading = false;

                    NotificationService.success(Translations.Template.itemWishListRemoved);
                },
                error =>
                {
                    this.isLoading = false;
                    this.isActive = true;
                    this.changeTooltipText();
                });
            }
        },

        changeTooltipText()
        {
            const tooltipText = this.isActive ? "itemWishListRemove" : "itemWishListAdd";

            $(".add-to-wish-list").attr("data-original-title", Translations.Template[tooltipText]).tooltip("hide").tooltip("setContent");
        }
    }
});
