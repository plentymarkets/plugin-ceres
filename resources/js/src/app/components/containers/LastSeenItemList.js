Vue.component("last-seen-item-list", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-last-seen-item-list"
        },

        itemsPerPage:
        {
            type: Number,
            default: 4
        }
    },

    computed: Vuex.mapState({
        items: state => state.lastSeen.lastSeenItems,
        containers: state => state.lastSeen.containers
    }),

    created()
    {
        this.$options.template = this.template;
    },

    beforeMount()
    {
        this.$store.dispatch("getLastSeenItems");
    },

    methods:
    {
        getContainerContentById(variationId, containerKey)
        {
            const container = this.containers[variationId];

            if (!!container && !!container[containerKey])
            {
                return container[containerKey];
            }

            return [];
        }
    }
});
