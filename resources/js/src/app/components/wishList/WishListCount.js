import Vue from "vue";

export default Vue.component("wish-list-count", {

    props: {
        template: {
            type: String,
            default: "#vue-wish-list-count"
        }
    },

    computed:
    {
        wishListCount()
        {
            return this.$store.getters.wishListCount;
        }
    }
});
