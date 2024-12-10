<template>
  <div>

    <div v-if="isItemSet">
      <ul>
        <li v-for="manufacturer in currentVariation.setComponents">
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
          // this.getItemSetComponents();
    });

  },

  methods: {
    getItemSetComponents() {
      if(this.isItemSet) {
        const components = this.currentVariation.setComponents;

        components.forEach(component => {
          this.manufacturerList.push({
            name: component.texts.name1,
            manufacturer: component.manufacturer,
            manufacturerId: component.manufacturerId
          });
        });
      }
    }
  }

}
</script>
