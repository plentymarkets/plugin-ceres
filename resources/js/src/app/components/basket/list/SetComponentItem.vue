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

            <div class="small" v-if="orderProperties && orderProperties.length">
                <div class="font-weight-bold my-1">{{ $translate("Ceres::Template.basketAdditionalOptions") }}:</div>
                <ul class="ml-1 pl-3">
                    <li v-for="property in orderProperties" :key="property.propertyId" v-show="isPropertyVisible(property.propertyId)">
                        <span class="d-block">
                            <strong :class="{ 'colon': property.type.length > 0 }">{{ property.name }} ({{ $translate("Ceres::Template.basketIncludeAbbr") }} {{ variation.properties | propertySurcharge(property.propertyId, rebate) | currency }})</strong>
                            <span>
                                <order-property-value :property="property"></order-property-value>
                            </span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "set-component-item",
    
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
        }
    },

    methods: {
        isPropertyVisible(propertyId)
        {
            const property = this.variation.properties.find(property => property.property.id === parseInt(propertyId));

            return property ? property.property.isShownAtCheckout : false;
        }
    }
}
</script>