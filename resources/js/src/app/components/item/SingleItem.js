Vue.component("single-item", {

    props: [
        "template",
        "itemData",
        "variationListData",
        "attributeNameMap"
    ],

    data()
    {
        return {
            isVariationSelected: true
        };
    },

    computed:
    {
        isDescriptionTabActive()
        {
            return App.config.item.itemData.includes("item.description") && !!this.currentVariation.texts.description.length;
        },

        isTechnicalDataTabActive()
        {
            return App.config.item.itemData.includes("item.technical_data") && !!this.currentVariation.texts.technicalData.length;
        },

        ...Vuex.mapState({
            currentVariation: state => state.item.variation.documents[0].data,
            variations: state => state.item.variationList,
            isInWishList: state => state.item.variation.documents[0].isInWishListVariation
        }),

        ...Vuex.mapGetters([
            "variationTotalPrice",
            "variationMissingProperties",
            "variationGroupedProperties",
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
