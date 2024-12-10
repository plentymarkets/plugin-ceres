<template>
  <div>

    <div v-if="isItemSet && selectionType === 'manufacturer'">
      <ul>
        <li v-for="manufacturer in setComponents" :key="manufacturer.itemId">
          {{ manufacturer.name }}
        </li>
      </ul>
    </div>

    <div v-else-if="isBundle">

    </div>
  </div>
</template>

<script>

export default {

  name: "item-manufacturer",

  props:{
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
    setComponents () {
      return this.$store.getters[`${this.itemId}/currentItemVariation`].setComponents;
    },
  },
}
</script>
