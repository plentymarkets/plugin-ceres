import Vue from "vue";
import { mapMutations } from "vuex";

Vue.component("privacy-settings", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-privacy-settings"
        },
        cardClass:
        {
            type: String,
            default: ""
        },
        cardStyle:
        {
            type: String,
            default: ""
        }
    },

    data()
    {
        return {
            expandedGroups: {}
        };
    },

    methods:
    {
        ...mapMutations([
            "toggleConsent"
        ]),

        isConsented(key, defaultValue)
        {
            return this.$store.getters.isConsented(key, defaultValue);
        },

        setGroupVisibility(groupKey, value, event)
        {
            event.preventDefault();
            event.stopPropagation();
            this.$set(this.expandedGroups, groupKey, value);
        }
    }
});
