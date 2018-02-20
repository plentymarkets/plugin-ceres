Vue.component("category-breadcrumbs",
    {
        delimiters: ["${", "}"],

        props: [
            "template"
        ],

        computed: Vuex.mapGetters([
            "breadcrumbs"
        ]),

        created()
        {
            this.$options.template = this.template;
        }
    });
