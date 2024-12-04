<template>
  <div>
    <p>item manufacturer widget</p>
  </div>
</template>

<script>
// import ItemBundle from "./ItemBundle.vue";

export default {

  name: "item-manufacturer",

  components: {
    // ItemBundle
  },

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
    // bundleComponents () {
    //     return this.$store.getters[`${this.itemId}/currentItemVariation`].bundleComponents;
    // }
  }
}
</script>
