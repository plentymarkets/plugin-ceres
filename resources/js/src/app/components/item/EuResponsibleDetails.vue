<template>
  <div>
    <b v-if="concatenatedNames">{{ concatenatedNames }}</b>

    <div class="p-0">
      <span>{{ manufacturer.responsibleName }}</span>
    </div>

    <div class="p-0">
      <span>{{ manufacturer.responsibleStreet }}</span>
      <span>{{ manufacturer.responsibleHouseNo }}</span>
    </div>

    <div class="p-0">
      <span>{{ manufacturer.responsiblePostCode }}</span>
      <span>{{ manufacturer.responsibleTown }}</span>
      <span v-if="manufacturer.responsibleCountryObject">
        {{ manufacturer.responsibleCountryObject.name }}
      </span>
    </div>

    <div class="p-0">
      <span>{{ manufacturer.responsibleEmail }}</span>
    </div>

    <div class="p-0">
      <span>{{ manufacturer.responsiblePhoneNo }}</span>
    </div>

    <div class="p-0">
      <span>{{ manufacturer.responsibleContactUrl }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "EuResponsibleDetails",
  props: {
    manufacturer: {
      type: Object,
      required: true
    },
    concatenatedNames: {
      type: String,
      default: ''
    }
  }
};
</script>
