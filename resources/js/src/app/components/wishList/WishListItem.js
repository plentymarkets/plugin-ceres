const NotificationService = require("../../services/NotificationService");

import TranslationService from "../../services/TranslationService";
import { mapState, mapActions } from "vuex";
import { isNullOrUndefined } from "../../helper/utils";
import { transformVariationProperties } from "../../services/VariationPropertyService";

export default {
    props:
    {
        template:
        {
            type: String,
            default: "#vue-wish-list-item"
        },
        imageAccessor:
        {
            type: String,
            default: "urlPreview"
        },
        itemDetailsData:
        {
            type: Array,
            default: () => ["wishListItem.variation.availability"]
        },
        wishListItemRaw: Object
    },

    data()
    {
        return {
            wishListItem: null,
            quantity: 1
        };
    },

    computed:
    {
        image()
        {
            const itemImages = this.$options.filters.itemImages(this.wishListItem.images, this.imageAccessor);

            return this.$options.filters.itemImage(itemImages);
        },

        unitPrice()
        {
            if (!isNullOrUndefined(this.wishListItem.prices.specialOffer))
            {
                return this.wishListItem.prices.specialOffer.unitPrice.value;
            }

            return this.wishListItem.prices.default.unitPrice.value;
        },

        basePrice()
        {
            if (!isNullOrUndefined(this.wishListItem.prices.specialOffer))
            {
                return this.wishListItem.prices.specialOffer.basePrice;
            }

            return this.wishListItem.prices.default.basePrice;
        },

        transformedVariationProperties()
        {
            return transformVariationProperties(this.wishListItem, [], "showInItemListing");
        },

        ...mapState({
            wishListItems: state => state.wishList.wishListItems
        })
    },

    created()
    {
        this.wishListItem = this.wishListItemRaw.data;
    },

    methods:
    {
        isDataFieldVisible(value)
        {
            return this.itemDetailsData.includes(value);
        },

        removeItem()
        {
            const item =
            {
                id: this.wishListItem.variation.id,
                wishListItem: this.wishListItemRaw,
                index: this.wishListItems.findIndex(item => item.id === this.wishListItemRaw.id)
            };

            this.removeWishListItem(item)
                .then(() => NotificationService.success(
                    TranslationService.translate("Ceres::Template.wishListRemoved")
                ));
        },

        ...mapActions([
            "removeWishListItem"
        ])
    }
};
