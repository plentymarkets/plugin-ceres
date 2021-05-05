<template>
    <div v-if="isClient && isLoaded">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "lazy-load",

    props: {
        component: String,
    },

    computed: {
        isLoaded() {
            return !!this.$store.state.lazyComponent.components[this.component];
        },

        isSSREnabled() {
            return App.isSSREnabled;
        },

        isClient() {
            return App.location === "client";
        }
    }
};
</script>
