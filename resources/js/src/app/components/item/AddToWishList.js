import TranslationService from "services/TranslationService";
import { isNullOrUndefined } from "../../helper/utils";

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
            return this.wishListIds.includes(this.currentVariationId);
        },

        currentVariationId()
        {
            return !isNullOrUndefined(this.variationId) ? this.variationId : this.currentVariationVariationId;
        },

        ...Vuex.mapState({
            currentVariationVariationId(state)
            {
                const currentVariation = state.item.variation && state.item.variation.documents && state.item.variation.documents[0].data;

                if (isNullOrUndefined(currentVariation))
                {
                    return null;
                }

                return currentVariation && currentVariation.variation && currentVariation.variation.id;
            },
            wishListIds: state => state.wishList.wishListIds
        })
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
                this.$store.dispatch("addToWishList", parseInt(this.currentVariationId)).then(
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
                this.$store.dispatch("removeWishListItem", { id: parseInt(this.currentVariationId) }).then(response =>
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
                `Ceres::Template.${this.isVariationInWishList ? "singleItemWishListRemove" : "singleItemWishListAdd"}`
            );

            $(".add-to-wish-list")
                .attr("data-original-title", tooltipText)
                .tooltip("hide")
                .tooltip("setContent");
        }
    },

    watch:
    {
        isVariationInWishList()
        {
            this.changeTooltipText();
        }
    }
});
