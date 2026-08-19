<template>
    <img :src="src" class="img-fluid" :alt="alt">
</template>

<script>
export default {
    name: "guarantee-notice-image",

    props: {
        src: {
            type: String,
            required: true
        },
        alt: {
            type: String,
            default: ""
        }
    }
};
</script>
