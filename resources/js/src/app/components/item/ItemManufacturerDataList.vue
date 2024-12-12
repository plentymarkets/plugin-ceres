<template>
  <div v-if="itemComponents.length > 0">
    <template v-for="component in itemComponents">
      <manufacturer-details v-if="component.manufacturer"
          :manufacturer="component.manufacturer"
          :concatenated-names="component.concatenatedNames"
      />
      <hr>
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
    }
  },
}
</script>
