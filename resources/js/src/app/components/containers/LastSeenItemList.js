Vue.component("last-seen-item-list", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-last-seen-item-list"
        },

        maxItems:
        {
            type: Number,
            default: App.config.itemLists.lastSeenNumber || 4
        },

        itemsPerPage:
        {
            type: Number,
            default: 4
        }
    },

    computed: Vuex.mapState({
        items: state => state.lastSeen.lastSeenItems
    }),

    created()
    {
        this.$options.template = this.template;
    },

    beforeMount()
    {
        this.$store.dispatch("getLastSeenItems", this.maxItems);
    }
});
