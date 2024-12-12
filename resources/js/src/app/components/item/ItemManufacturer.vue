<template>
  <div>
    <template v-if="isItemSet">
      <template v-if="selectionType === 'manufacturer'">
          <item-manufacturer-data-list
              :visible-fields="visibleFields"
              :item-components="setComponents">
          </item-manufacturer-data-list>
      </template>

      <template v-if="selectionType === 'eu-responsible'">
        <item-eu-responsible-data-list
            :visible-fields-eu="visibleFieldsEu"
            :item-components="setComponents">
        </item-eu-responsible-data-list>
      </template>
    </template>

    <template v-else-if="isBundle">
      <template v-if="selectionType === 'manufacturer'">
        <item-manufacturer-data-list
            :visible-fields="visibleFields"
            :item-components="bundleComponents">
        </item-manufacturer-data-list>
      </template>

      <template v-if="selectionType === 'eu-responsible'">
        <item-eu-responsible-data-list
            :visible-fields-eu="visibleFieldsEu"
            :item-components="bundleComponents">
        </item-eu-responsible-data-list>
      </template>
    </template>

    <template v-else>
      <manufacturer-details
          v-if="selectionType === 'manufacturer' && simpleItemManufacturer"
          :visible-fields="visibleFields"
          :manufacturer="simpleItemManufacturer"
      />
      <eu-responsible-details
          v-else-if="selectionType === 'eu-responsible' && simpleItemManufacturer"
          :visible-fields-eu="visibleFieldsEu"
          :manufacturer="simpleItemManufacturer"
      />
    </template>
  </div>
</template>

<script>
import ItemManufacturerDataList from "./ItemManufacturerDataList.vue";
import ItemEuResponsibleDataList from "./ItemEuResponsibleDataList.vue";
import ManufacturerDetails from "./ManufacturerDetails.vue";
import EuResponsibleDetails from "./EuResponsibleDetails.vue";

export default {

  name: "item-manufacturer",

  components: {
    ItemManufacturerDataList,
    ItemEuResponsibleDataList,
    ManufacturerDetails,
    EuResponsibleDetails
  },

  props: {
    selectionType: String,
    visibleFields: {
      type: Array,
      default: () => []
    },
    visibleFieldsEu: {
      type: Array,
      default: () => []
    },
  },

  inject: {
    itemId: {
      default: null
    },
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
      const bundleComponents = this.$store.getters[`${this.itemId}/currentItemVariation`].bundleComponents || [];

      const items = bundleComponents.map(component => ({
        manufacturerId: component.data.item.manufacturerId,
        manufacturer: component.data.item.manufacturer,
        texts: component.data.texts
      }));

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
        const itemName = item.texts?.name1 || '';
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
