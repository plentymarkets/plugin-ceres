<template>
  <div>
    <h4>{{ $translate("Ceres::Template.itemEuResponsiblePersonTitle") }}</h4>

    <template v-if="manufacturer && isEuResponsibleTabShown">
      <div v-if="concatenatedNames" class="mb-2">
        <b>{{ concatenatedNames }}</b>
      </div>

      <div v-if="visibleFieldsEu.includes('EUname')" class="p-0" >
        <span>{{ manufacturer.responsibleName }}</span>
      </div>

      <div class="p-0">
        <span v-if="visibleFieldsEu.includes('EUstreet')">{{ manufacturer.responsibleStreet }}</span>
        <span v-if="visibleFieldsEu.includes('EUhouseNr')">{{ manufacturer.responsibleHouseNo }}</span>
      </div>

      <div class="p-0">
        <span v-if="visibleFieldsEu.includes('EUzipcode')">{{ manufacturer.responsiblePostCode }}</span>
        <span v-if="visibleFieldsEu.includes('EUcity')">{{ manufacturer.responsibleTown }}</span>
        <span v-if="manufacturer.responsibleCountryObject && visibleFieldsEu.includes('EUcountry')">
          {{ manufacturer.responsibleCountryObject.name }}
        </span>
      </div>

      <div v-if="visibleFieldsEu.includes('EUmail')" class="p-0" >
        <span>{{ manufacturer.responsibleEmail }}</span>
      </div>

      <div v-if="visibleFieldsEu.includes('EUphone')" class="p-0">
        <span>{{ manufacturer.responsiblePhoneNo }}</span>
      </div>

      <div v-if="visibleFieldsEu.includes('EUcontactForm')" class="p-0">
        <span>{{ manufacturer.responsibleContactUrl }}</span>
      </div>
    </template>

    <template v-else>
      {{ $translate("Ceres::Template.itemEuResponsibleNoInformation") }}
    </template>
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
    },
    visibleFieldsEu: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isEuResponsibleTabShown()
    {
      return (this.manufacturer.responsibleEmail !== "") ||
          (this.manufacturer.responsibleHouseNo !== "") ||
          (this.manufacturer.responsibleName !== "") ||
          (this.manufacturer.responsiblePhoneNo !== "") ||
          (this.manufacturer.responsiblePostCode !== "") ||
          (this.manufacturer.responsibleStreet !== "") ||
          (this.manufacturer.responsibleTown !== "") ||
          (this.manufacturer.responsibleContactUrl !== "") ||
          (this.manufacturer.responsibleCountry !== 0);
    },
  }
};
</script>
