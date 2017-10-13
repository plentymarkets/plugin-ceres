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
        },

        methods: {
            /**
             * render items in relation to location
             * @param category
             */
            selectBreadcrumb(category)
            {
                this.$store.dispatch("selectCategory", {category});
                return false;
            }
        }
    });
