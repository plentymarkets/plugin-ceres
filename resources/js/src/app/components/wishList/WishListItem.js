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
        itemDetailsData:
        {
            type: Array,
            default: () => [""]
        },
        wishListItem: Object
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
        }
    },

    methods:
    {
        isDataFieldVisible(value)
        {
            return this.itemDetailsData.includes(value);
        }
    }
};
