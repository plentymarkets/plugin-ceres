Vue.component("category-breadcrumbs",
    {
        delimiters: ["${", "}"],

        props: [
            "template"
        ],

        computed: Vuex.mapGetters([
            "breadcrumbs"
        ])
    });
