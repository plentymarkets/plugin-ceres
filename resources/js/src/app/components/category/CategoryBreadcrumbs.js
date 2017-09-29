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
             * @param currentCategory
             */
            selectBreadcrumb(currentCategory)
            {
                this.$store.commit("setCurrentCategory", currentCategory);
                CategoryRendererService.renderItems();
                return false;
            }
        }
    });
