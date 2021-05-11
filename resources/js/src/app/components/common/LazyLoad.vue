<template>
    <div v-if="enabled && isLoaded">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "lazy-load",

    props: {
        component: String
    },

    computed: {
        isLoaded() {
            return !!this.$store.state.lazyComponent.components[this.component];
        }
    },

    data() {
        return {
            enabled: false
        }
    },

    mounted() {
        this.enabled = true;
    }
}
</script>
