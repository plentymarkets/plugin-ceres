<template>
  <div v-if="setComponents.length > 0">

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

        <hr>
      </div>

  </div>
</template>

<script>

export default {

  name: "item-manufacturer-data-list",

  props: {
    setComponents: {
      type: Array,
      default: () => []
    },
  },

}
</script>
