Vue.component("comp2", {
    template: "<button @click='dispatchy()'>Hallo2</button>",
    methods:
    {
        dispatchy()
        {
            this.$store.dispatch("updateField", "dispatchyyy");
        }
    }
});
