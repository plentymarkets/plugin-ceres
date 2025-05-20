<template>
  <div>
    <h4>{{ $translate("Ceres::Template.itemManufacturerDetailsTitle") }}</h4>

    <template v-if="manufacturer && isManufacturerTabShown">
      <div v-if="concatenatedNames" class="mb-2">
        <b>{{ concatenatedNames }}</b>
      </div>

      <div v-if="manufacturer.name && visibleFields.includes('name')" class="p-0">
        <span>{{ manufacturer.name }}</span>
      </div>

      <div v-if="manufacturer.externalName && visibleFields.includes('externalName')" class="p-0">
        <span>{{ manufacturer.externalName }}</span>
      </div>

      <div v-if="visibleFields.includes('legalName')" class="p-0">
        <span>{{ manufacturer.legalName }}</span>
      </div>

      <div class="p-0">
        <span v-if="visibleFields.includes('street')">{{ manufacturer.street }}</span>
        <span v-if="visibleFields.includes('houseNr')">{{ manufacturer.houseNo }}</span>
      </div>

      <div class="p-0">
        <span v-if="visibleFields.includes('zipcode')">{{ manufacturer.postcode }}</span>
        <span v-if="visibleFields.includes('city')">{{ manufacturer.town }}</span>
        <span v-if="manufacturer.countryObject && visibleFields.includes('country')">{{ manufacturer.countryObject.name }}</span>
      </div>

      <div v-if="visibleFields.includes('mail')" class="p-0">
        <span>{{ manufacturer.email }}</span>
      </div>

      <div v-if="visibleFields.includes('homepage')" class="p-0">
        <span>{{ manufacturer.url }}</span>
      </div>

      <div v-if="visibleFields.includes('phone')" class="p-0">
        <span>{{ manufacturer.phoneNumber }}</span>
      </div>

      <div v-if="visibleFields.includes('fax')" class="p-0">
        <span>{{ manufacturer.faxNumber }}</span>
      </div>

      <div v-if="visibleFields.includes('contactForm')" class="p-0">
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
    },
    visibleFields: {
      type: Array,
      default: () => []
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
