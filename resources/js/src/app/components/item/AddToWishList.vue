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

    name: "add-to-wish-list",

    props: {
        variationId: Number
    },

    inject: {
        itemId: {
            default: null
        }
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

        currentVariationVariationId()
        {
            const currentVariation = this.$store.getters[`${this.itemId}/currentItemVariation`];

            if (isNullOrUndefined(currentVariation))
            {
                return null;
            }

            return currentVariation && currentVariation.variation && currentVariation.variation.id;
        },

        ...mapState({
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
                        ).closeAfter(3000);
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
                        ).closeAfter(3000);
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
