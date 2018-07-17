Vue.component("last-seen-item-list", {

    props: {
        template: {
            type: String,
            default: "#vue-last-seen-item-list"
        },
        variationId: Number
    },

    computed: Vuex.mapState({
        items: state => state.lastSeen.lastSeenItems
    }),

    created()
    {
        this.$options.template = this.template;
    },

    ready()
    {
        if (this.variationId > 0)
        {
            this.$store.dispatch("addLastSeenItem", this.variationId);
        }
        else
        {
            this.$store.dispatch("getLastSeenItems");
        }
    }
});
