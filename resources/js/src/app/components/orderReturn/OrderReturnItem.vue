<template>
    <article class="basket-list-item py-3">
        <div class="basket-item d-flex">
            <div class="image-container">
                <img class="d-block mw-100 mh-100"
                     v-if="orderItemImage"
                     :src="orderItemImage"
                     :alt="orderItem | itemBundleName"
                     :title="orderItem | itemBundleName">
            </div>

            <div class="meta-container-wrapper">
                <div class="meta-container-wrapper-inner">
                    <div class="meta-container">
                        <div class="position-relative w-100">
                            <a :href="orderItemURL" class="item-name text-primary text-appearance small font-weight-bold text-break">
                                {{ orderItem | itemBundleName }}
                            </a>

                            <div class="item-base-price small">
                                <template v-if="isNet">
                                    {{ amount.priceNet | currency(amount.currency) }}
                                </template>
                                <template v-if="!isNet">
                                    {{ amount.priceGross | currency(amount.currency) }}
                                </template>
                            </div>

                            <item-bundle
                                    :bundle-type="orderItem.bundleType"
                                    :bundle-components="orderItem.bundleComponents"></item-bundle>

                            <order-return-set-component-list v-if="orderItem.setComponents" :set-components="orderItem.setComponents" :variations="variations"></order-return-set-component-list>

                            <div class="item-small-prices small">
                                <div v-for="attribute in variation.attributes">
                                    <strong>{{ attribute.attribute.names.name }}: </strong>
                                    <span>{{ attribute.value.names.name }}</span>
                                </div>
                            </div>

                            <div class="item-small-prices text-muted small" v-if="orderItem.orderProperties">
                                <div v-for="property in orderItem.orderProperties">
                                    <strong>{{ property.name }}: </strong>
                                    <span v-if="property.type === 'file'">
                                        <a :href="getOrderPropertyFileUrl(property)" target="_blank" class="text-primary text-appearance">
                                            <i class="fa fa-external-link" aria-hidden="true"></i>
                                            {{ property.value | fileName }}
                                        </a>
                                    </span>
                                    <span v-else-if="property.type === 'selection'">{{ property.selectionValueName }}</span>
                                    <span v-else-if="!!property.type">{{ property.value }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="basket-item-container-right ml-3">
                        <div class="qty-box-container">
                            <quantity-input
                                    @quantity-change="updateQuantity"
                                    :value="returnCount"
                                    :interval="orderItem.minQuantity > 0 ? orderItem.minQuantity :1"
                                    :min="0"
                                    :max="orderItem.quantity"></quantity-input>
                        </div>

                        <div class="price-box ml-2">
                            <div class="item-total-price font-weight-bold text-right text-nowrap" v-if="isNet">
                                {{ orderItem.quantity * amount.priceNet | currency(amount.currency) }}
                            </div>

                            <div class="item-total-price font-weight-bold text-right text-nowrap" v-if="!isNet">
                                {{ orderItem.quantity * amount.priceGross | currency(amount.currency) }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="small" v-if="variation">

                    <template v-if="isDataFieldVisible('item_id') && variation.item.id">
                        <div class="mt-3">
                            <strong>{{ $translate("Ceres::Template.basketItemId") }}:</strong>
                            <span>{{ variation.item.id }}</span>
                        </div>
                    </template>

                    <template v-if="isDataFieldVisible('custom_number') && variation.variation.number">
                        <div>
                            <strong>{{ $translate("Ceres::Template.basketItemNumber") }}:</strong>
                            <span>{{ variation.variation.number }}</span>
                        </div>
                    </template>

                    <template v-if="isDataFieldVisible('availability') && variation.variation.availability.names.name">
                        <div>
                            <strong>{{ $translate("Ceres::Template.basketAvailability") }}:</strong>
                            <span class="badge" :class="'availability-' + variation.variation.availability.id">
                                {{ variation.variation.availability.names.name }}
                            </span>
                        </div>
                    </template>

                    <template v-if="isDataFieldVisible('description_long') && variation.texts.description">
                        <p class="my-3" v-html="variation.texts.description"></p>
                    </template>

                    <template v-if="isDataFieldVisible('description_short') && variation.texts.shortDescription">
                        <p class="my-3" v-html="variation.texts.shortDescription"></p>
                    </template>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
import OrderReturnSetComponentList from "./OrderReturnSetComponentList.vue";

export default {

    name: "order-return-item",

    components: {
        OrderReturnSetComponentList
    },

    props: {
        orderItem:
        {
            type: Object,
            required: true
        },

        itemDetailsData:
        {
            type: Array,
            default: () => []
        },

        isNet:
        {
            type: Boolean,
            default: false
        }
    },

    data()
    {
        return {
            returnCount: 0
        };
    },

    created()
    {
        vueEventHub.$on("select-all-items", () => this.selectItem());
    },

    computed:
    {
        orderItemImage()
        {
            return this.$store.getters.getOrderItemImage(this.orderItem.itemVariationId);
        },

        orderItemURL()
        {
            return this.$store.getters.getOrderItemURL(this.orderItem.itemVariationId);
        },

        variation()
        {
            return this.$store.getters.getOrderItemVariation(this.orderItem.itemVariationId);
        },

        variations()
        {
            return this.$store.state.orderReturn.orderData.variations;
        },

        amount()
        {
            return this.orderItem.amounts.find((amount) => !amount.isSystemCurrency) || this.orderItem.amounts[0];
        }
    },

    methods:
    {
        updateQuantity(quantity)
        {
            this.returnCount = quantity;
            if (this.returnCount > this.orderItem.quantity)
            {
                this.returnCount = this.orderItem.quantity;
            }
            else if (this.returnCount < 0)
            {
                this.returnCount = 0;
            }

            this.$store.commit("updateOrderReturnItems", { quantity: parseInt(this.returnCount), orderItem: this.orderItem });
        },

        selectItem()
        {
            this.returnCount = this.orderItem.quantity;
        },

        isDataFieldVisible(value)
        {
            return this.itemDetailsData.includes(value);
        },

        getOrderPropertyFileUrl(property)
        {
            return property.fileUrl || this.$options.filters.fileUploadPath(property.value);
        }
    }
}
</script>
