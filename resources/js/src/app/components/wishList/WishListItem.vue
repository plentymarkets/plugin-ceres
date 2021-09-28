<template>
    <div class="basket-list-item py-3">
        <div class="basket-item component-loading with-icon d-flex">
            <div class="image-container">
                <img class="d-block mw-100 mh-100" v-if="image" :src="image" :title="wishListItem | itemName">
            </div>

            <div class="meta-container-wrapper">
                <div class="meta-container-wrapper-inner mb-2">
                    <div class="meta-container">
                        <div class="position-relative w-100">
                            <a :href="wishListItem | itemURL" class="item-name text-appearance font-weight-bold text-break" style="color: #212529;">
                                {{ wishListItem | itemName }}
                            </a>

                            <div class="item-base-price">
                                {{ unitPrice | currency }}
                            </div>

                            <div class="item-small-prices text-muted small" v-if="!(wishListItem.unit.unitOfMeasurement === 'C62' && wishListItem.unit.content === 1) && wishListItem.variation.mayShowUnitPrice">
                                <div>
                                    {{ basePrice }}
                                </div>
                                <div>
                                    <strong>{{ $translate("Ceres::Template.wishListContent") }}: </strong>
                                    {{ wishListItem.unit.content }} {{ wishListItem.unit.names.name }}
                                </div>
                            </div>

                            <div class="item-small-prices small">
                                <div v-for="(attribute, index) in wishListItem.attributes" :key="index">
                                    <strong>{{ attribute.attribute.names.name }}: </strong>
                                    <span>{{ attribute.value.names.name }}</span>
                                </div>
                            </div>

                            <div class="item-small-prices text-muted small">
                                <template v-for="propertyGroup in wishListItem.variationProperties">
                                    <div v-for="(property, index) in propertyGroup.properties" :key="index">
                                        <strong v-if="propertyGroup.name">{{ propertyGroup.name }}: </strong>
                                        <span>{{ property.names.name }}</span>
                                        <span v-if="property.cast === 'file'">
                                            <a :href="property.values.value | propertyFileUrl" v-html="property.values.value" target="_blank"></a>
                                        </span>
                                        <span v-else v-html="property.values.value"></span>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex kk-wishlist-details-box">
                    <div class="d-flex">
                        <div class="availability kk-wishlist-availability-icon mt-auto mb-auto" :class="'availability-'+wishListItem.variation.availability.id"></div>
                        <div class="ml-2 mt-auto mb-auto">
                            {{ wishListItem.variation.availability.names.name }}
                        </div>
                    </div>
                    <div class="d-flex kk-wishlist-delete-and-basket">
                        <div class="btn btn-sm text-danger mt-auto mb-auto kk-border flex-style" style="width: 33px; height: 33px;" @click="removeItem()">
                                    <i v-waiting-animation-infinite class="fa fa-trash-o default-float" aria-hidden="true" style="font-size: 1.2rem; color: grey;"></i>
                        </div>
                        <div>
                            <add-to-basket
                                :variation-id="wishListItem.variation.id"
                                :is-salable="!!wishListItem.filter && wishListItem.filter.isSalable"
                                :has-children="!!wishListItem.filter && wishListItem.filter.hasActiveChildren"
                                :interval-quantity="wishListItem.variation.intervalOrderQuantity || 1"
                                :minimum-quantity="wishListItem.variation.minimumOrderQuantity"
                                :maximum-quantity="!!wishListItem.variation.maximumOrderQuantity && wishListItem.variation.maximumOrderQuantity > 0 ? wishListItem.variation.maximumOrderQuantity : null"
                                :order-properties="wishListItem.properties.filter((prop) => prop.property.isOderProperty)"
                                :has-order-properties="wishListItem.hasOrderProperties"
                                :use-large-scale="false"
                                :show-quantity="false"
                                :item-url="wishListItem | itemURL"
                                :has-price="wishListItem | hasItemDefaultPrice"
                                :is-wish-list="true"
                                :prop-quantity="quantity"
                                :item-type="wishListItem.item.itemType">
                            </add-to-basket>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NotificationService from "../../services/NotificationService";
import { mapState, mapActions } from "vuex";
import { isNullOrUndefined } from "../../helper/utils";

export default {

    name: "wish-list-item",

    props:
    {
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
                    this.$translate("Ceres::Template.wishListRemoved")
                ).closeAfter(3000));
        },

        ...mapActions([
            "removeWishListItem"
        ])
    }
}
</script>
