<template>
    <div class="d-flex mb-2">
        <span class="text-muted">{{ quantity }}x</span>
        <div class="image-container mx-1">
            <lazy-img
                picture-class="d-block mw-100 mh-100"
                v-if="itemImage"
                :image-url="itemImage"
                :alt="altText"
                :title="itemName">
            </lazy-img>
        </div>
        <div>
            <a :href="variation | itemURL" class="item-name text-primary text-appearance font-weight-bold text-break">
                {{ itemName }}
            </a>
            <div class="small" v-for="attribute in variation.attributes">
                <strong>{{ attribute.attribute.names.name }}: </strong>
                <span>{{ attribute.value.names.name }}</span>
            </div>

            <div class="text-muted small">
                <template v-for="propertyGroup in variation.variationProperties">
                    <div v-for="property in propertyGroup.properties">
                        <strong v-if="propertyGroup.name">{{ propertyGroup.name }}: </strong>
                        <span>{{ property.names.name }}</span>
                        <span v-if="property.cast == 'file'">
                            <a :href="property.values.value | propertyFileUrl" v-html="property.values.value" target="_blank"></a>
                        </span>
                        <span v-else v-html="property.values.value"></span>
                    </div>
                </template>
            </div>

            <order-property-value-list :basket-item="mappedBasketItem"></order-property-value-list>
        </div>
    </div>
</template>

<script>
import OrderPropertyValueList from "../../item/OrderPropertyValueList.vue"

export default {
    name: "set-component-item",

    components: {
        OrderPropertyValueList
    },
    
    props: {
        variation: Object,
        quantity: Number,
        orderProperties: Array,
        rebate: Number
    },
    computed: {
        itemImage()
        {
            const itemImages = this.$options.filters.itemImages(this.variation.images, "urlPreview");

            return this.$options.filters.itemImage(itemImages);
        },

        altText()
        {
            const images = this.$options.filters.itemImages(this.variation.images, "urlPreview");

            return this.$options.filters.itemImageAlternativeText(images) || this.itemName;
        },

        itemName()
        {
            return this.$options.filters.itemName(this.variation);
        },

        mappedBasketItem()
        {
            // bring given data in basket item structure
            return {
                variation:
                {
                    data: this.variation
                },
                basketItemOrderParams: this.orderProperties
            };
        }
    }
}
</script>