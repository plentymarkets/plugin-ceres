<template>
  <div>

    <div v-if="isItemSet">
      <div v-if="selectionType === 'manufacturer'">
          <item-manufacturer-data-list :set-components="setComponents"></item-manufacturer-data-list>
      </div>

      <div v-if="selectionType === 'eu-responsible'">
        <item-eu-responsible-data-list :set-components="setComponents"></item-eu-responsible-data-list>
      </div>
    </div>
    <div v-else-if="isBundle">

    </div>
  </div>
</template>

<script>

import ItemManufacturerDataList from "./ItemManufacturerDataList.vue";
import ItemEuResponsibleDataList from "./ItemEuResponsibleDataList.vue";

export default {

  name: "item-manufacturer",

  components: {
    ItemManufacturerDataList,
    ItemEuResponsibleDataList
  },

  props: {
    paddingClasses: String,
    paddingInlineStyles: String,
    selectionType: String
  },

  inject: {
    itemId: {
      default: null
    }
  },

  computed: {
    currentVariation() {
      return this.$store.getters[`${this.itemId}/currentItemVariation`];
    },
    isBundle() {
      return this.$store.getters[`${this.itemId}/currentItemVariation`].variation.bundleType === 'bundle';
    },
    bundleComponents () {
      return this.$store.getters[`${this.itemId}/currentItemVariation`].bundleComponents;
    },
    isItemSet() {
      return this.$store.getters[`${this.itemId}/currentItemVariation`].item.itemType === 'set';
    },
    setComponents() {
      return this.$store.getters[`${this.itemId}/currentItemVariation`].setComponents
          .filter((value, index, array) => array.indexOf(value) === index);
    },
  },
}
</script>
