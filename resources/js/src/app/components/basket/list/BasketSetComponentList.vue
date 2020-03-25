<template>
    <div v-if="setComponents.length > 0" class="set-data small">
        <div class="mb-2"><strong>{{ $translate("Ceres::Template.itemSetContent") }}</strong></div>
        <div class="d-flex mb-2 test" v-for="setComponent in setComponents">
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

                <div class="text-muted small">
                    <template v-for="propertyGroup in setComponent.variation.data.variationProperties">
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
