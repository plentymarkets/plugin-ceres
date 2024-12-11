<template>
  <div v-if="itemComponents.length > 0">
    <div v-for="(component, index) in itemComponents" :key="index">
      <eu-responsible-details
          :manufacturer="component.manufacturer"
          :concatenated-names="component.concatenatedNames"
      />
      <hr>
    </div>
  </div>
</template>

<script>
import EuResponsibleDetails from "./EuResponsibleDetails.vue";

export default {
  name: "item-eu-responsible-data-list",
  components: {
    EuResponsibleDetails
  },
  props: {
    itemComponents: {
      type: Array,
      default: () => []
    }
  }
};
</script>
