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
            firstVariationChange: true
        };
    },

    computed: Vuex.mapState({
        currentVariation: state => state.item.variation.documents[0].data,
        variations: state => state.item.variationList,
        isInWishList: state => state.item.variation.documents[0].isInWishListVariation
    }),

    created()
    {
        this.$options.template = this.template;
        this.$store.commit("setVariation", this.itemData);
        this.$store.commit("setVariationList", this.variationListData);

        this.lol();
    },

    methods:
    {
        lol()
        {
            document.addEventListener("onVariationChanged", event =>
            {
                if (this.firstVariationChange)
                {
                    const twigSingleItem = document.querySelector("#twig-rendered-single-item");

                    twigSingleItem.parentElement.removeChild(twigSingleItem);

                    this.firstVariationChange = false;

                    this.$el.style.removeProperty("display");
                }
            });
        }
    }
});
