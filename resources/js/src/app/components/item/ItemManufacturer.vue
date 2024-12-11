<template>
  <div>

    <div v-if="isItemSet">
      <div v-if="selectionType === 'manufacturer'">
          <item-manufacturer-data-list :item-components="setComponents"></item-manufacturer-data-list>
      </div>

      <div v-if="selectionType === 'eu-responsible'">
        <item-eu-responsible-data-list :item-components="setComponents"></item-eu-responsible-data-list>
      </div>
    </div>

    <div v-else-if="isBundle">
<!--      <div v-if="selectionType === 'manufacturer'">-->
<!--        <item-manufacturer-data-list :item-components="bundleComponents"></item-manufacturer-data-list>-->
<!--      </div>-->

<!--      <div v-if="selectionType === 'eu-responsible'">-->
<!--        <item-eu-responsible-data-list :item-components="bundleComponents"></item-eu-responsible-data-list>-->
<!--      </div>-->
    </div>

    <div v-else>
      <div class="p-0">
        <span>{{ simpleItemManufacturer.name }}</span>
      </div>

      <div class="p-0">
        <span>{{ simpleItemManufacturer.legalName }}</span>
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
      return this.$store.getters[`${this.itemId}/currentItemVariation`].bundleComponents;
    },
    isItemSet() {
      return this.$store.getters[`${this.itemId}/currentItemVariation`].item.itemType === 'set';
    },
    setComponents() {
      const items = this.$store.getters[`${this.itemId}/currentItemVariation`].setComponents;

      const manufacturerMap = {};
      console.log(items);
      items.forEach(item => {
          const manufacturerId = item.manufacturerId;
          const itemName = item.texts.name1 || '';
          const manufacturer = item.manufacturer;
          manufacturerMap[manufacturerId]['concatenatedNames'] = manufacturerMap[manufacturerId]['concatenatedNames'] || [];

          if (!manufacturerMap[manufacturerId]) {
            manufacturerMap[manufacturerId] = {
              manufacturerId: manufacturerId,
              manufacturer: manufacturer
            };
          }
          console.log("item: ", item);
          manufacturerMap[manufacturerId]['concatenatedNames'].push(itemName);
      });

      console.log("manufacturerMap: ", manufacturerMap);
      const result = Object.values(manufacturerMap).map(item => ({
        ...item,
            concatenatedNames: item['concatenatedNames'].join(', ')
      }));

      console.log("result: ", result);
      return result;
    },
  },
}
</script>
