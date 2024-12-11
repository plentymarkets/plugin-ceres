<template>
  <div :class="paddingClasses" :style="paddingInlineStyles">
    <div v-if="isItemSet">
      <div v-if="selectionType === 'manufacturer'">
          <item-manufacturer-data-list :item-components="setComponents"></item-manufacturer-data-list>
      </div>

      <div v-if="selectionType === 'eu-responsible'">
        <item-eu-responsible-data-list :item-components="setComponents"></item-eu-responsible-data-list>
      </div>
    </div>

    <div v-else-if="isBundle">
      <div v-if="selectionType === 'manufacturer'">
        <item-manufacturer-data-list :item-components="bundleComponents"></item-manufacturer-data-list>
      </div>

      <div v-if="selectionType === 'eu-responsible'">
        <item-eu-responsible-data-list :item-components="bundleComponents"></item-eu-responsible-data-list>
      </div>
    </div>

    <div v-else>
      <div v-if="selectionType === 'manufacturer'">
        <div v-if="simpleItemManufacturer.name" class="p-0">
          <span>{{ simpleItemManufacturer.name }}</span>
        </div>
        <div v-else-if="simpleItemManufacturer.externalName" class="p-0">
          <span>{{ simpleItemManufacturer.externalName }}</span>
        </div>

        <div class="p-0">
          <span>{{ simpleItemManufacturer.street }}</span>
          <span>{{ simpleItemManufacturer.houseNo }}</span>
        </div>

        <div class="p-0">
          <span>{{ simpleItemManufacturer.postcode }}</span>
          <span>{{ simpleItemManufacturer.town }}</span>
          <span v-if="simpleItemManufacturer.countryObject">
                {{ simpleItemManufacturer.countryObject.name }}
              </span>
        </div>

        <div class="p-0">
          <span>{{ simpleItemManufacturer.email }}</span>
        </div>

        <div class="p-0">
          <span>{{ simpleItemManufacturer.url }}</span>
        </div>

        <div class="p-0">
          <span>{{ simpleItemManufacturer.phoneNumber }}</span>
        </div>

        <div class="p-0">
          <span>{{ simpleItemManufacturer.faxNumber }}</span>
        </div>

        <div class="p-0">
          <span>{{ simpleItemManufacturer.contactUrl }}</span>
        </div>
      </div>

      <div v-if="selectionType === 'eu-responsible'">
        <b v-if="simpleItemManufacturer.concatenatedNames">{{ component.concatenatedNames }}</b>
        <div class="p-0">
          <span>{{ simpleItemManufacturer.responsibleName }}</span>
        </div>

        <div class="p-0">
          <span>{{ simpleItemManufacturer.responsibleStreet }}</span>
          <span>{{ simpleItemManufacturer.responsibleHouseNo }}</span>
        </div>

        <div class="p-0">
          <span>{{ simpleItemManufacturer.responsiblePostCode }}</span>
          <span>{{ simpleItemManufacturer.responsibleTown }}</span>
          <span v-if="simpleItemManufacturer.responsibleCountryObject">
          {{ simpleItemManufacturer.responsibleCountryObject.name }}
        </span>
        </div>

        <div class="p-0">
          <span>{{ simpleItemManufacturer.responsibleEmail }}</span>
        </div>

        <div class="p-0">
          <span>{{ simpleItemManufacturer.responsiblePhoneNo }}</span>
        </div>

        <div class="p-0">
          <span>{{ simpleItemManufacturer.responsibleContactUrl }}</span>
        </div>
      </div>
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
    simpleItemManufacturer() {
      if (!this.isItemSet && !this.isBundle) {
        return this.$store.getters[`${this.itemId}/currentItemVariation`].item.manufacturer;
      }
    },
    currentVariation() {
      return this.$store.getters[`${this.itemId}/currentItemVariation`];
    },
    isBundle() {
      return this.$store.getters[`${this.itemId}/currentItemVariation`].variation.bundleType === 'bundle';
    },
    bundleComponents () {
      const items = this.$store.getters[`${this.itemId}/currentItemVariation`].bundleComponents.map(component => {
        return component.data.item
      }) || [];

      return this.transformComponents(items);
    },
    isItemSet() {
      return this.$store.getters[`${this.itemId}/currentItemVariation`].item.itemType === 'set';
    },
    setComponents() {
      const items = this.$store.getters[`${this.itemId}/currentItemVariation`].setComponents || [];

      return this.transformComponents(items);
    },
  },

  methods: {
    transformComponents(components) {
      const manufacturerMap = {};

      components.forEach(item => {
        const manufacturerId = item.manufacturerId;
        const itemName = item.texts.name1 || '';
        const manufacturer = item.manufacturer;

        if (!manufacturerMap[manufacturerId]) {
          manufacturerMap[manufacturerId] = {
            manufacturerId: manufacturerId,
            manufacturer: manufacturer,
            concatenatedNames: []
          };
        }

        manufacturerMap[manufacturerId].concatenatedNames.push(itemName);
      });

      return Object.values(manufacturerMap).map(item => ({
        ...item,
        concatenatedNames: item.concatenatedNames.join(', ')
      }));
    }
  }
}
</script>
