<template>
    <span v-if="currentVariation.variation.availability"
        :class="classes"
        :style="paddingStyles">
        <span>
            {{ currentVariation.variation.availability.names.name }}
        </span>
    </span>
</template>

<script>
export default {
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
        currentVariation() {
            return this.$store.state.items[this.itemId] && this.$store.state.items[this.itemId].variation.documents[0].data;
        },

        classes()
        {
            return [
                "availability",
                "badge",
                "availability-" + this.currentVariation.variation.availability.id,
                this.paddingClasses
            ];
        }

    }
}
</script>
