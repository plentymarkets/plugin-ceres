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
            default: "urlMiddle"
        },
        wishListItem: Object
    },

    computed:
    {
        image()
        {
            const itemImages = this.$options.filters.itemImages(this.wishListItem.data.images, this.imageAccessor);

            return this.$options.filters.itemImage(itemImages);
        },

        unitPrice()
        {
            if (!isNullOrUndefined(this.wishListItem.data.prices.specialOffer))
            {
                return this.wishListItem.data.prices.specialOffer.unitPrice.value;
            }

            return this.wishListItem.data.prices.default.unitPrice.value;
        },

        basePrice()
        {
            if (!isNullOrUndefined(this.wishListItem.data.prices.specialOffer))
            {
                return this.wishListItem.data.prices.specialOffer.basePrice;
            }

            return this.wishListItem.data.prices.default.basePrice;
        },

        itemTotalPrice()
        {
            return this.wishListItem.data.price;
        },

        transformedVariationProperties()
        {
            return transformVariationProperties(this.wishListItem.data, [], "displayInOrderProcess");
        }
    }
};
