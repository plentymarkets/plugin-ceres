import {isDefined}from "../../helper/utils";

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
            const containersById = this.containers[variationId];

            if (isDefined(containersById))
            {
                const container = containersById[containerKey];

                if (isDefined(container))
                {
                    return container;
                }
            }

            return "";
        }
    }
});
