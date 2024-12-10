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

  data()
  {
    return {
      manufacturerList: []
    };
  },

  mounted()
  {
    this.$nextTick(() =>
        {
          this.getItemSetComponents();
    });

  },

  methods: {
    getItemSetComponents() {
      if(this.isItemSet)
      {
        const components = this.currentVariation.setComponents;
        const setComponents = [];
        components.forEach(itemData =>
        {

          this.manufacturerList.push({

          });
        });
      }
    }
  }

}
</script>
