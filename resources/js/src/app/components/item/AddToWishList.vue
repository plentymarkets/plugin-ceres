<template>
    <a class="btn btn-link btn-sm text-muted" 
        @click.prevent="switchState()"
        data-toggle="tooltip"
        data-placement="top"
        ref="addToWishList"
        title="">
        <icon icon="heart" class="default-float" :class="{'text-appearance text-danger': isVariationInWishList}" :loading="isLoading"></icon>
        {{ $translate("Ceres::Template.singleItemWishList") }}
    </a>
</template>

<script>
import { isNullOrUndefined } from "../../helper/utils";
import { mapState } from "vuex";

const NotificationService = require("../../services/NotificationService");

export default {
    props: {
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

        ...mapState({
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
                            this.$translate("Ceres::Template.singleItemWishListAdded")
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
                            this.$translate("Ceres::Template.singleItemWishListRemoved")
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
            const tooltipText = this.$translate(
                "Ceres::Template." + (this.isVariationInWishList ? "singleItemWishListRemove" : "singleItemWishListAdd")
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
}

</script>
