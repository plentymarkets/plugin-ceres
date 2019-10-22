import Vue from "vue";
import { mapMutations } from "vuex";

Vue.component("cookie-bar", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-cookie-bar"
        },
        styles: String,
        classes: String
    },

    data()
    {
        return {
            isCollapsed: true,
            isExpanded: false
        };
    },

    computed:
    {
        isVisible()
        {
            return App.isShopBuilder || !this.$store.state.consents.hasResponse || !this.isCollapsed;
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
