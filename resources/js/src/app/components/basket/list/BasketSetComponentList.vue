<template>
    <div v-if="setComponents.length > 0" class="set-data small">
        <div class="mb-2"><strong>{{ $translate("Ceres::Template.itemSetContent") }}</strong></div>
        <div class="d-flex mb-2" v-for="setComponent in setComponents">
            <span class="text-muted">{{ setComponent.quantity }}x</span>
            <div class="image-container mx-1">
                <lazy-img
                    picture-class="d-block mw-100 mh-100"
                    v-if="getImage(setComponent)"
                    :image-url="getImage(setComponent)"
                    :alt="getAltText(setComponent)"
                    :title="getItemName(setComponent)">
                </lazy-img>
            </div>
            <div>
                <a :href="setComponent.variation.data | itemURL" class="item-name text-primary text-appearance font-weight-bold text-break">
                    {{ getItemName(setComponent) }}
                </a>
                <div class="small" v-for="attribute in setComponent.variation.data.attributes">
                    <strong>{{ attribute.attribute.names.name }}: </strong>
                    <span>{{ attribute.value.names.name }}</span>
                </div>

                <div class="small" v-if="setComponent.basketItemOrderParams && setComponent.basketItemOrderParams.length">
                    <div class="font-weight-bold my-1">{{ $translate("Ceres::Template.basketAdditionalOptions") }}:</div>
                    <ul class="ml-3">
                        <li v-for="property in setComponent.basketItemOrderParams" :key="property.propertyId" v-show="isPropertyVisible(property.propertyId)">
                            <span class="d-block text-truncate">
                                <strong :class="{ 'colon': property.type.length > 0 }">{{ property.name }} ({{ $translate("Ceres::Template.basketIncludeAbbr") }} {{ setComponent.variation.data.properties | propertySurcharge(property.propertyId) | currency }})</strong>
                                <span>
                                    <order-property-value :property="property"></order-property-value>
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "basket-set-component-list",

    props: {
        setComponents: {
            type: Array,
            default: () => []
        }
    },

    methods:
    {
        getImage(setComponent)
        {
            const itemImages = this.$options.filters.itemImages(setComponent.variation.data.images, "urlPreview");

            return this.$options.filters.itemImage(itemImages);
        },

        getAltText(setComponent)
        {
            const images = this.$options.filters.itemImages(setComponent.variation.data.images, "urlPreview");
            const altText =  this.$options.filters.itemImageAlternativeText(images);

            if (altText)
            {
                return altText;
            }

            return this.getItemName(setComponent);
        },

        getItemName(setComponent)
        {
            return this.$options.filters.itemName(setComponent.variation.data);
        }
    }

}
</script>
