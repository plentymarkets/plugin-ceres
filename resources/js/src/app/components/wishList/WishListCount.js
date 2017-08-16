Vue.component("wish-list-count", {

    props: [
        "template",
        "initIds"
    ],

    computed: {
        wishListCount()
        {
            return this.$store.getters.wishListCount;
        }
    },

    created()
    {
        this.$options.template = this.template || "#vue-wish-list-count";
        this.$store.commit("setWishListIds", this.initIds);
    }
});
