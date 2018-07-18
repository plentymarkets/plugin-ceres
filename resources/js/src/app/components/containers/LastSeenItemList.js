Vue.component("last-seen-item-list", {

    props: {
        template: {
            type: String,
            default: "#vue-last-seen-item-list"
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
        this.$store.dispatch("getLastSeenItems");
    }
});
