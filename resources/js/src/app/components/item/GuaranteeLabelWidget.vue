<template>
    <div v-if="isVisible" :class="['widget', 'widget-guarantee-label', customClass, spacingClasses]" :style="inlineSpacings">
        <button type="button" class="guarantee-badge-toggle btn-collapse p-0 border-0 bg-transparent collapsed"
                data-toggle="collapse" :data-target="'#' + collapseId"
                aria-expanded="false" :aria-controls="collapseId"
                :aria-label="badgeAltText">
            <guarantee-badge :guarantee="durabilityYears"></guarantee-badge>
        </button>

        <div :id="collapseId" class="collapse guarantee-label-collapse">
            <guarantee-label-full :guarantee="durabilityYears" :brand="brandValue" :model="modelValue"></guarantee-label-full>
        </div>
    </div>
</template>

<script>
export default {

    name: "guarantee-label-widget",

    props: {
        collapseId: String,
        customClass: {
            type: String,
            default: ""
        },
        spacingClasses: {
            type: String,
            default: ""
        },
        inlineSpacings: {
            type: String,
            default: ""
        },
        badgeAltText: {
            type: String,
            default: ""
        }
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

        brandValue() {
            return this.currentVariation?.item?.manufacturer?.externalName || "";
        },

        modelValue() {
            return this.currentVariation?.variation?.model || "";
        },

        durabilityYears() {
            return this.currentVariation?.variation?.durabilityYears || "";
        },

        isVisible() {
            return this.brandValue.length > 0 && this.modelValue.length > 0 && String(this.durabilityYears).length > 0;
        }
    }
}
</script>
