import Vue from "vue";
import { mapMutations } from "vuex";

Vue.component("cookie-bar", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-cookie-bar"
        }
    },

    data()
    {
        return {
            isCollapsed: true,
            isExpanded: false
        };
    },

    created()
    {
        // this.isCollapsed = this.hasResponse();
    },

    computed:
    {
        isVisible()
        {
            if (!this.$store.state.consents.hasResponse)
            {
                return true;
            }

            return !this.isCollapsed;
        }
    },

    methods:
    {
        ...mapMutations([
            "storeConsents",
            "acceptAll"
        ]),

        close()
        {
            this.isCollapsed = true;
            this.isExpanded = false;
        },

        isConsented(groupKey)
        {
            return this.$store.getters.isConsented(groupKey + ".*");
        },

        toggleConsent(groupKey)
        {
            this.$store.commit("toggleConsent", groupKey + ".*");
        }
    }
});
