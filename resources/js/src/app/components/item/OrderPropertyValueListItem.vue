<template>
    <li>
        <span class="d-block">
            <strong :class="{ 'colon': showColon }">
                {{ property.property.names.name }} 
                <template v-if="surcharge > 0">
                    <template v-if="isAdditionalCosts || isTaxless">
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
            return this.$options.filters.propertySurcharge([this.property], this.property.propertyId);
        },

        isAdditionalCosts()
        {
            const property = this.property?.property;
            return property && property.isShownAsAdditionalCosts && property.isShownAtCheckout
                            && ((!property.isOderProperty && !App.useVariationOrderProperties)
                            || (property.isOderProperty && App.useVariationOrderProperties))
        },

        isTaxless()
        {
            const hasVat = this.property.property.vatId !== 'none' && this.property.property.vatId !== null;
            return !hasVat && (this.property.property.isOderProperty && App.useVariationOrderProperties);
        },

        showColon()
        {
            return this.property && this.property.property.value && this.property.property.valueType !== "empty";
        }
    }
}
</script>
