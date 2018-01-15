import TranslationService from "services/TranslationService";

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
            _isActive: this.isActive,
            isLoading: false
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.changeTooltipText();
        });
    },

    methods:
    {
        switchState()
        {
            if (this.$data._isActive)
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
                this.$data._isActive = true;
                this.changeTooltipText();

                this.$store.dispatch("addToWishList", parseInt(this.variationId)).then(
                    response =>
                    {
                        this.isLoading = false;

                        NotificationService.success(
                            TranslationService.translate("Ceres::Template.itemWishListAdded")
                        );
                    },
                    error =>
                    {
                        this.isLoading = false;
                        this.$data._isActive = false;
                        this.changeTooltipText();
                    });
            }
        },

        removeFromWishList()
        {
            if (!this.isLoading)
            {
                this.isLoading = true;
                this.$data._isActive = false;
                this.changeTooltipText();

                this.$store.dispatch("removeWishListItem", {id: parseInt(this.variationId)}).then(response =>
                {
                    this.isLoading = false;

                    NotificationService.success(
                        TranslationService.translate("Ceres::Template.itemWishListRemoved")
                    );
                },
                error =>
                {
                    this.isLoading = false;
                    this.$data._isActive = true;
                    this.changeTooltipText();
                });
            }
        },

        changeTooltipText()
        {
            const tooltipText = TranslationService.translate(
                "Ceres::Template." + this.$data._isActive ? "itemWishListRemove" : "itemWishListAdd"
            );

            $(".add-to-wish-list")
                .attr("data-original-title", tooltipText)
                .tooltip("hide")
                .tooltip("setContent");
        }
    }
});
