<template>
    <span v-if="availability"
        :class="classes"
        :style="paddingStyles">
        <span>
            {{ name }}
        </span>
    </span>
</template>

<script>
export default {
    name: "item-availability",

    props: {
        paddingClasses: String,
        paddingStyles: String
    },

    inject: {
        itemId: {
            default: null
        }
    },

    computed:
    {
        availability() {
            const currentVariation = this.$store.getters[`${this.itemId}/currentItemVariation`];
            return currentVariation && currentVariation.variation && currentVariation.variation.availability;
        },

        classes() {
            return [
                "availability",
                "badge",
                "availability-" + (this.availability && this.availability.id),
                this.paddingClasses
            ];
        },

        name() {
            return this.availability && this.availability.names && this.availability.names.name;
        }
    }
}
</script>
