<template>
  <div>

    <div v-if="isItemSet">
      <div class="my-4" v-for="manufacturerItem in currentVariation.setComponents">
        <div class="p-0">
          <span>{{ manufacturerItem.name }}</span>
        </div>

        <div class="p-0">
          <span>{{ manufacturerItem.legalName }}</span>
        </div>

        <div class="p-0">
          <span>{{ manufacturerItem.street }}</span>
          <span>{{ manufacturerItem.houseNo }}</span>
        </div>

        <div class="p-0">
          <span>{{ manufacturerItem.postcode }}</span>
          <span>{{ manufacturerItem.town }}</span>
          <span v-if="manufacturerItem.countryObject">
            {{ manufacturerItem.countryObject.name }}
          </span>
        </div>

        <div class="p-0">
          <span>{{ manufacturerItem.email }}</span>
        </div>

        <div class="p-0">
          <span>{{ manufacturerItem.url }}</span>
        </div>

        <div class="p-0">
          <span>{{ manufacturerItem.phoneNumber }}</span>
        </div>

        <div class="p-0">
          <span>{{ manufacturerItem.faxNumber }}</span>
        </div>

        <div class="p-0">
          <span>{{ manufacturerItem.contactUrl }}</span>
        </div>
      </div>
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
      default: "manufacturer"
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
