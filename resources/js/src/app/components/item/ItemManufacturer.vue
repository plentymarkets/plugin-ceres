<template>
  <div>

    <div v-if="isItemSet">

    </div>

    <div v-else-if="isBundle">

    </div>
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
    selectionType: {
      type: String,
      default: null
    }
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
    isItemSet() {
      return this.$store.getters[`${this.itemId}/currentItemVariation`].item.itemType === 'set';
    },
  },

  mounted()
  {
    this.getItemSetComponents();
  },

  methods: {
    getItemSetComponents() {
      if(this.isItemSet)
      {
        const setComponents = [];
        this.$store.state.items.setComponentIds.forEach(itemId =>
        {
          const setComponent = this.$store.getters[`${itemId}/currentItemVariation`];

          const variationId = setComponent && setComponent.variation.id;

          console.log(setComponent);
          setComponents.push({
            variationId: variationId,
          });
        });
      }
    }
  }

}
</script>
