<template>
    <li>
        <span class="d-block">
            <strong :class="{ 'colon': showColon }">
                {{ property.property.names.name }} 
                <template v-if="surcharge > 0">
                    <template v-if="isAdditionalCost || isTaxless">
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
import { hasVat, isAdditionalCosts } from "../../helper/OrderPropertyHelper";
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

        isAdditionalCost()
        {
            return isAdditionalCosts(this.property);
        },

        isTaxless()
        {
            return !hasVat(this.property) && App.useVariationOrderProperties;
        },

        showColon()
        {
            return this.property && this.property.property.value && this.property.property.valueType !== "empty";
        }
    }
}
</script>
