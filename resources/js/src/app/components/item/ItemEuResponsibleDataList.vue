<template>
  <div>

    <template v-if="itemComponents.length > 0">
      <template v-for="component in itemComponents">
        <eu-responsible-details
            :manufacturer="component.manufacturer"
            :concatenated-names="component.concatenatedNames"
            :visible-fields-eu="visibleFieldsEu"
        />
        <hr>
      </template>
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
    },
    visibleFieldsEu: {
      type: Array,
      default: () => []
    }
  }
};
</script>
