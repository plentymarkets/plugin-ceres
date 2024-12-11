<template>
  <div v-if="itemComponents.length > 0">
    <div v-for="(component, index) in itemComponents" :key="index">
      <manufacturer-details v-if="component.manufacturer"
          :manufacturer="component.manufacturer"
          :concatenated-names="component.concatenatedNames"
      />
      <hr>
    </div>
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
