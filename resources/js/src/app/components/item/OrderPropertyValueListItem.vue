<template>
    <li>
        <span class="d-block">
            <strong :class="{ 'colon': property.property.valueType.length > 0 }">
                {{ property.property.names.name }} 
                <template v-if="surcharge > 0">
                    <template v-if="isPropertyWithAdditionalCosts">
                        ({{ $translate("Ceres::Template.basketPlusAbbr") }} {{ surcharge | currency }})
                    </template>
                    <template v-else>
                        ({{ $translate("Ceres::Template.basketIncludeAbbr") }} {{ surcharge | currency }})
                    </template>
                </template>
            </strong>
            <span>
                <span v-if="property.property.valueType === 'file'">
                    <a :href="property.property.value | fileUploadPath" target="_blank">
                        <i class="fa fa-external-link" aria-hidden="true"></i>
                        {{ property.property.value | fileName }}
                    </a>
                </span>
                <span v-else-if="property.property.valueType !== 'empty'">{{ property.property.value }}</span>
            </span>
        </span>
    </li>
</template>

<script>
export default {
    name: "order-property-value-list-item",

    props:
    {
        property:
        {
            required: true,
            type: Object
        }
    },

    computed:
    {
        surcharge()
        {
            return this.$options.filters.propertySurcharge([property], property.propertyId);
        },

        isPropertyWithAdditionalCosts()
        {
            return this.property.property &&
                this.property.property.isShownAtCheckout &&
                this.property.property.isShownAsAdditionalCosts &&
                !this.property.property.isOderProperty
        }
    }
}
</script>
