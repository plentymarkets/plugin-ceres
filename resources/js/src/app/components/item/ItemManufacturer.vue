<template>
  <div>

    <div v-if="isItemSet">
      <div v-if="selectionType === 'manufacturer'">
          <div v-for="(component, index) in setComponents" :key="index">
            <div class="p-0">
              <span>{{ component.manufacturer.name }}</span>
            </div>

            <div class="p-0">
              <span>{{ component.manufacturer.legalName }}</span>
            </div>

            <div class="p-0">
              <span>{{ component.manufacturer.street }}</span>
              <span>{{ component.manufacturer.houseNo }}</span>
            </div>

            <div class="p-0">
              <span>{{ component.manufacturer.postcode }}</span>
              <span>{{ component.manufacturer.town }}</span>
              <span v-if="component.manufacturer.countryObject">
                {{ component.manufacturer.countryObject.name }}
              </span>
            </div>

            <div class="p-0">
              <span>{{ component.manufacturer.email }}</span>
            </div>

            <div class="p-0">
              <span>{{ component.manufacturer.url }}</span>
            </div>

            <div class="p-0">
              <span>{{ component.manufacturer.phoneNumber }}</span>
            </div>

            <div class="p-0">
              <span>{{ component.manufacturer.faxNumber }}</span>
            </div>

            <div class="p-0">
              <span>{{ component.manufacturer.contactUrl }}</span>
            </div>
          </div>
          <hr>
      </div>

      <div v-if="selectionType === 'eu-responsible'">
        <div v-for="(component, index) in setComponents" :key="index">
          <div class="p-0">
            <span>{{ component.manufacturer.responsibleName }}</span>
          </div>

          <div class="p-0">
            <span>{{ component.manufacturer.responsibleStreet }}</span>
            <span>{{ component.manufacturer.responsibleHouseNo }}</span>
          </div>

          <div class="p-0">
            <span>{{ component.manufacturer.responsiblePostCode }}</span>
            <span>{{ component.manufacturer.responsibleTown }}</span>
            <span v-if="component.manufacturer.responsibleCountryObject">
              {{ component.manufacturer.responsibleCountryObject.name }}
            </span>
          </div>

          <div class="p-0">
            <span>{{ component.manufacturer.responsibleEmail }}</span>
          </div>

          <div class="p-0">
            <span>{{ component.manufacturer.responsiblePhoneNo }}</span>
          </div>

          <div class="p-0">
            <span>{{ component.manufacturer.responsibleContactUrl }}</span>
          </div>
        </div>
        <hr>
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
    setComponents() {
      return this.$store.getters[`${this.itemId}/currentItemVariation`].setComponents
          .filter((value, index, array) => array.indexOf(value) === index);
    },
  },
}
</script>
