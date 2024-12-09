<template>
  <div>
    <p>item manufacturer widget</p>
  </div>
</template>

<script>

export default {

  name: "item-manufacturer",

  props:{
    isPreview: Boolean,
    paddingClasses: {
      type: String,
      default: null
    },
    paddingInlineStyles: {
      type: String,
      default: null
    },
  },

  inject: {
    itemId: {
      default: null
    }
  },

  computed: {
    // bundleType() {
    //     return this.isPreview ? 'bundle' : this.$store.getters[`${this.itemId}/currentItemVariation`].variation.bundleType
    // },
    //
    currentVariation() {
      return this.$store.getters[`${this.itemId}/currentItemVariation`];
    },
  }
}
</script>
