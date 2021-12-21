<template>
    <div class="basket-list-item py-3">
        <div class="basket-item component-loading with-icon d-flex">
            <div class="image-container">
              <a :href="wishListItem | itemURL">
                <img class="d-block mw-100 mh-100" v-if="image" :src="image" :title="wishListItem | itemName">
              </a>
            </div>

            <div class="meta-container-wrapper">
                <div class="meta-container-wrapper-inner mb-2">
                    <div class="meta-container">
                        <div class="position-relative w-100">
                            <a :href="wishListItem | itemURL" class="item-name text-primary text-appearance small font-weight-bold text-break">
                                {{ wishListItem | itemName }}
                            </a>

                            <div class="item-base-price small">
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
                    <div class="basket-item-container-right">
                        <div class="qty-box-container ml-3">
                            <quantity-input
                                @quantity-change="quantity = $event"
                                :value="wishListItem.variation.intervalOrderQuantity"
                                :min="wishListItem.variation.minimumOrderQuantity"
                                :max="wishListItem.variation.maximumOrderQuantity"
                                :timeout="0"
                                :interval="wishListItem.variation.intervalOrderQuantity"
                                :variation-id="wishListItem.variation.id">
                            </quantity-input>
                        </div>

                        <div class="price-box text-right my-1 ml-2">
                            <div class="item-total-price font-weight-bold text-nowrap">
                                {{ quantity * unitPrice | currency }}
                            </div>

                            <div class="btn btn-sm text-danger p-0" @click="removeItem()" data-testing="remove-wlist-item">
                                {{ $translate("Ceres::Template.wishListDelete") }}
                                <i v-waiting-animation-infinite class="fa fa-trash-o default-float" aria-hidden="true"></i>
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
                        :has-required-order-property="wishListItem.hasRequiredOrderProperty"
                        :use-large-scale="false"
                        :show-quantity="false"
                        :item-url="wishListItem | itemURL"
                        :has-price="wishListItem | hasItemDefaultPrice"
                        :is-wish-list="true"
                        :prop-quantity="quantity"
                        :item-type="wishListItem.item.itemType">
                    </add-to-basket>
                </div>

                <div class="small">
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
                            <span class="badge" :class="'availability-' + wishListItem.variation.availability.id">{{ wishListItem.variation.availability.names.name }}</span>
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
