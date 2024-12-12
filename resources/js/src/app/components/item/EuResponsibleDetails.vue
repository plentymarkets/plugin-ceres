<template>
  <div>
    <h4>{{ $translate("Ceres::Template.itemEuResponsiblePersonTitle") }}</h4>

    <template v-if="manufacturer && isEuResponsibleTabShown">
      <div v-if="concatenatedNames" class="mb-2">
        <b>{{ concatenatedNames }}</b>
      </div>

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
