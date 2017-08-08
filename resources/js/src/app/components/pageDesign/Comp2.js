Vue.component("comp2", {
    template: "<input v-model=\"message\" @input=\"updateField(message)\">",

    data()
    {
        return {
            message: "message"
        };
    },

    ready()
    {
    },

    methods: Vuex.mapActions(["updateField"])
});
