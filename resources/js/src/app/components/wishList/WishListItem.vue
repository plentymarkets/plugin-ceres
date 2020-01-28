<template>
    <div class="basket-item-container basket-list-item">
        <div class="basket-item component-loading with-icon">
            <div class="image-container">
                <img class="img-basket-small" v-if="image" :src="image" :title="wishListItem | itemName">
            </div>

            <div class="meta-container-wrapper">
                <div class="meta-container-wrapper-inner mb-2">
                    <div class="meta-container">
                        <div>
                            <a :href="wishListItem | itemURL" class="item-name text-primary text-appearance">
                                {{ wishListItem | itemName }}
                            </a>

                            <div class="item-base-price">
                                {{ unitPrice | currency }}
                            </div>

                            <div class="item-small-prices text-muted" v-if="!(wishListItem.unit.unitOfMeasurement === 'C62' && wishListItem.unit.content === 1) && wishListItem.variation.mayShowUnitPrice">
                                <div>
                                    {{ basePrice }}
                                </div>
                                <div>
                                    <strong>{{ $translate("Ceres::Template.wishListContent") }}: </strong>
                                    {{ wishListItem.unit.content }} {{ wishListItem.unit.names.name }}
                                </div>
                            </div>

                            <div class="item-small-prices">
                                <div v-for="(attribute, index) in wishListItem.attributes" :key="index">
                                    <strong>{{ attribute.attribute.names.name }}: </strong>
                                    <span>{{ attribute.value.names.name }}</span>
                                </div>
                            </div>

                            <div class="item-small-prices text-muted">
                                <template v-for="propertyGroup in transformedVariationProperties">
                                    <div v-for="(property, index) in propertyGroup.properties" :key="index">
                                        <strong v-if="propertyGroup.name">{{ propertyGroup.name }}: </strong>
                                        <span>{{ property.names.name }}</span>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="basket-item-container-right">
                        <div class="qty-box-container">
                            <quantity-input
                                @quantity-change="quantity = $event"
                                :value="quantity"
                                :min="wishListItem.variation.minimumOrderQuantity"
                                :max="wishListItem.variation.maximumOrderQuantity"
                                :timeout="0"
                                :interval="wishListItem.variation.intervalQuantity"
                                :variation-id="wishListItem.variation.id">
                            </quantity-input>
                        </div>

                        <div class="price-box mb-1">
                            <div class="item-total-price">
                                {{ quantity * unitPrice | currency }}
                            </div>

                            <div class="item-remove-container">
                                <div class="btn btn-sm item-remove-button" @click="removeItem()">
                                    <span>
                                        {{ $translate("Ceres::Template.wishListDelete") }}
                                        <i v-waiting-animation-infinite class="fa fa-trash-o" aria-hidden="true"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-right">
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
                        :prop-quantity="quantity">
                    </add-to-basket>
                </div>

                <div class="item-additional-information-container">
                    <div class="item-additional-information">
                        <template v-if="isDataFieldVisible('wishListItem.item.id')">
                            <div class="mt-3">
                                <strong>{{ $translate("Ceres::Template.wishListItemId") }}:</strong>
                                <span>{{ wishListItem.item.id }}</span>
                            </div>
                        </template>

                        <template v-if="isDataFieldVisible('wishListItem.variation.number')">
                            <div v-if="wishListItem.variation.number">
                                <strong>{{ $translate("Ceres::Template.wishListItemNumber") }}:</strong>
                                <span>{{ wishListItem.variation.number }}</span>
                            </div>
                        </template>

                        <template v-if="isDataFieldVisible('wishListItem.variation.availability')">
                            <div v-if="wishListItem.variation.availability.names.name">
                                <strong>{{ $translate("Ceres::Template.wishListAvailability") }}:</strong>
                                <span class="badge" :class="'availability_' + wishListItem.variation.availability.id">{{ wishListItem.variation.availability.names.name }}</span>
                            </div>
                        </template>

                        <template v-if="isDataFieldVisible('wishListItem.texts.description')">
                            <p class="my-3" v-if="wishListItem.texts.description" v-html="wishListItem.texts.description"></p>
                        </template>

                        <template v-if="isDataFieldVisible('wishListItem.texts.shortDescription')">
                            <p class="my-3" v-if="wishListItem.texts.shortDescription" v-html="wishListItem.texts.shortDescription"></p>
                        </template>
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
import { transformVariationProperties } from "../../services/VariationPropertyService";

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
                    this.$translate("Ceres::Template.wishListRemoved")
                ));
        },

        ...mapActions([
            "removeWishListItem"
        ])
    }
}
</script>