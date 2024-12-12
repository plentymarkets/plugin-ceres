<template>
  <div>

    <template v-if="itemComponents.length > 0">
      <template v-for="component in itemComponents">
        <manufacturer-details
            :manufacturer="component.manufacturer"
            :concatenated-names="component.concatenatedNames"
            :visible-fields="visibleFields"
        />
        <hr>
      </template>
    </template>
  </div>
</template>

<script>
import ManufacturerDetails from "./ManufacturerDetails.vue";

export default {
  name: "item-manufacturer-data-list",
  components: {
    ManufacturerDetails
  },
  props: {
    itemComponents: {
      type: Array,
      default: () => []
    },
    visibleFields: {
      type: Array,
      default: () => []
    }
  },
}
</script>
