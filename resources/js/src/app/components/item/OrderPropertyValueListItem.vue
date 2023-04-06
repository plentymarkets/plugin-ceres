<template>
    <li>
          <strong :class="{ 'colon': showColon }">
              <i class="fa fa-check"></i> {{ property.property.names.name }}
          </strong>
          <span>
              <span v-if="property.property.valueType === 'file'">
                  <a :href="property.property.value | fileUploadPath" target="_blank">
                      <i class="fa fa-external-link" aria-hidden="true"></i>
                      {{  property.property.value | fileName }}
                  </a>
              </span>
              <span v-else-if="property.property.valueType !== 'empty'">{{  property.property.value }}</span>
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
