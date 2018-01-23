Vue.component("single-item", {

    props: [
        "template",
        "itemData",
        "variationListData",
        "attributeNameMap"
    ],

    computed:
    {
        ...Vuex.mapState({
            currentVariation: state => state.item.variation.documents[0].data,
            variations: state => state.item.variationList,
            isInWishList: state => state.item.variation.documents[0].isInWishListVariation
        }),

        ...Vuex.mapGetters([
            "variationTotalPrice",
            "variationGraduatedPrice"
        ])
    },

    created()
    {
        this.$options.template = this.template;
        this.$store.commit("setVariation", this.itemData);
        this.$store.commit("setVariationList", this.variationListData);

        this.$store.watch(() => this.$store.getters.variationTotalPrice, () =>
        {
            $(this.$refs.variationTotalPrice).fadeTo(100, 0.1).fadeTo(400, 1.0);
        });
    }
});
