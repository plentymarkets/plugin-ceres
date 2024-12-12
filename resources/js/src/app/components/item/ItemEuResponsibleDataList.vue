<template>
  <div v-if="itemComponents.length > 0">
    <template v-for="component in itemComponents">
      <eu-responsible-details v-if="component.manufacturer"
          :manufacturer="component.manufacturer"
          :concatenated-names="component.concatenatedNames"
      />
      <hr>
    </template>
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
