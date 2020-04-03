<template>
    <div class="loading d-flex text-center">
        <div class="loading-animation m-auto">
            <div class="rect1 bg-appearance"></div>
            <div class="rect2 bg-appearance"></div>
            <div class="rect3 bg-appearance"></div>
            <div class="rect4 bg-appearance"></div>
            <div class="rect5 bg-appearance"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            template: {
                default: "#vue-loading-animation",
                type: String
            }
        }
    }
</script>
