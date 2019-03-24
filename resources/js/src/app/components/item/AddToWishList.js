import TranslationService from "services/TranslationService";

const NotificationService = require("services/NotificationService");

Vue.component("add-to-wish-list", {

    props: {
        template: {
            type: String,
            default: "#vue-add-to-wish-list"
        },
        variationId: Number
    },

    data()
    {
        return {
            isLoading: false
        };
    },

    computed:
    {
        isVariationInWishList()
        {
            return this.wishListIds.includes(this.variationId);
        },

        ...Vuex.mapState({
            wishListIds: state => state.wishList.wishListIds
        })
    },

    watch:
    {
        isVariationInWishList()
        {
            this.changeTooltipText();
        }
    },

    methods:
    {
        switchState()
        {
            if (this.isVariationInWishList)
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
                this.$store.dispatch("addToWishList", parseInt(this.variationId)).then(
                    response =>
                    {
                        this.isLoading = false;

                        NotificationService.success(
                            TranslationService.translate("Ceres::Template.singleItemWishListAdded")
                        );
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
                this.$store.dispatch("removeWishListItem", { id: parseInt(this.variationId) }).then(response =>
                {
                    this.isLoading = false;

                    NotificationService.success(
                        TranslationService.translate("Ceres::Template.singleItemWishListRemoved")
                    );
                },
                error =>
                {
                    this.isLoading = false;
                });
            }
        },

        changeTooltipText()
        {
            const tooltipText = TranslationService.translate(
                "Ceres::Template." + (this.isVariationInWishList ? "singleItemWishListRemove" : "singleItemWishListAdd")
            );

            $(".add-to-wish-list")
                .attr("data-original-title", tooltipText)
                .tooltip("hide")
                .tooltip("setContent");
        }
    }
});
