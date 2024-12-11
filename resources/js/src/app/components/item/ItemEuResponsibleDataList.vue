<template>
  <div v-if="setComponents.length > 0">

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

      <hr>
    </div>

  </div>
</template>

<script>

export default {

  name: "item-eu-responsible-data-list",

  props: {
    setComponents: {
      type: Array,
      default: () => []
    },
  },

}
</script>
