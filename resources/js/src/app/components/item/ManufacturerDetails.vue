<template>
  <div>
    <h4>{{ $translate("Ceres::Template.itemManufacturerDetailsTitle") }}</h4>

    <template v-if="manufacturer && isManufacturerTabShown">
      <div v-if="concatenatedNames" class="mb-2">
        <b>{{ concatenatedNames }}</b>
      </div>

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
    </template>

    <template v-else>
      {{ $translate("Ceres::Template.itemManufacturerNoInformation") }}
    </template>


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
  },
  computed: {
    isManufacturerTabShown()
    {
      return (this.manufacturer.url !== "") ||
          (this.manufacturer.street !== "") ||
          (this.manufacturer.houseNo !== "") ||
          (this.manufacturer.postcode !== "") ||
          (this.manufacturer.town !== "") ||
          (this.manufacturer.countryId !== 0) ||
          (this.manufacturer.phoneNumber !== "") ||
          (this.manufacturer.faxNumber !== "") ||
          (this.manufacturer.email !== "") ||
          (this.manufacturer.legalName !== "") ||
          (this.manufacturer.contactUrl !== "") ||
          (this.manufacturer.name !== "") ||
          (this.manufacturer.externalName !== "");
    },
  }
};
</script>
