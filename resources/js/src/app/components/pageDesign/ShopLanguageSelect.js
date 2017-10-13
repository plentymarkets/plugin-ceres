Vue.component("shop-language-select", {

    delimiters: ["${", "}"],

    props: [
        "countryFlagPrefix",
        "template"
    ],

    computed: {
        ...Vuex.mapState({
            localization: state => state.localization
        }),

        ...Vuex.mapGetters([
            "languageList"
        ])
    },

    created()
    {
        this.$options.template = this.template;
    }
});
