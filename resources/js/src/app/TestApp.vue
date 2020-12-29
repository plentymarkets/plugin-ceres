<template>
    <div>
        <h1>Hallo Welt</h1>
        <p>{{ count }}</p>
    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                count: 0
            }
        },
        mounted()
        {
            console.log("Mounted!");
            window.setInterval(() => {
                this.count++;
            }, 1000);
        }
    }
</script>
