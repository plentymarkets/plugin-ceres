// import Vuex from "vuex";

Vue.component("comp1", {
    template: "<button>hallo</button>",

    ready()
    {
        console.log(this);
        this.$store.dispatch("updateField", "initMe");

        setTimeout(() =>
        {
            this.updateField("timeouted");
        }, 3000);
    },

    methods: Vuex.mapActions(["updateField"])
});
