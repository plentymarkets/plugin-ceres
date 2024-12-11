<template>
  <div>
    <b v-if="concatenatedNames">{{ concatenatedNames }}</b>

    <div v-if="manufacturer.name" class="p-0">
      <span>{{ manufacturer.name }}</span>
    </div>
    <div v-else-if="manufacturer.externalName" class="p-0">
      <span>{{ manufacturer.externalName }}</span>
    </div>

    <div class="p-0">
      <span>{{ manufacturer.legalName }}</span>
    </div>

    <div class="p-0">
      <span>{{ manufacturer.street }}</span>
      <span>{{ manufacturer.houseNo }}</span>
    </div>

    <div class="p-0">
      <span>{{ manufacturer.postcode }}</span>
      <span>{{ manufacturer.town }}</span>
      <span v-if="manufacturer.countryObject">{{ manufacturer.countryObject.name }}</span>
    </div>

    <div class="p-0">
      <span>{{ manufacturer.email }}</span>
    </div>

    <div class="p-0">
      <span>{{ manufacturer.url }}</span>
    </div>

    <div class="p-0">
      <span>{{ manufacturer.phoneNumber }}</span>
    </div>

    <div class="p-0">
      <span>{{ manufacturer.faxNumber }}</span>
    </div>

    <div class="p-0">
      <span>{{ manufacturer.contactUrl }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManufacturerDetails",
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
