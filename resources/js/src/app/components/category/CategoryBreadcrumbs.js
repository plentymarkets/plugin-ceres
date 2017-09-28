import CategoryRendererService from "services/CategoryRendererService";

Vue.component("category-breadcrumbs",
    {

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
                // CategoryRendererService.renderItems();
                return false;
            }
        }
    });
