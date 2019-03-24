import { transformVariationProperties } from "../../services/VariationPropertyService";

Vue.component("single-item", {

    delimiters: ["${", "}"],

    props: [
        "template",
        "itemData",
        "variationListData",
        "attributeNameMap",
        "variationUnits"
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

        transformedVariationProperties()
        {
            return transformVariationProperties(this.currentVariation, ["empty"], "showInItemListing");
        },

        ...Vuex.mapState({
            currentVariation: state => state.item.variation.documents[0].data,
            variations: state => state.item.variationList
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
        this.$store.commit("setVariation", this.itemData);
        this.$store.commit("setVariationList", this.variationListData);
        this.$store.dispatch("addLastSeenItem", this.currentVariation.variation.id);

        this.$store.watch(() => this.$store.getters.variationTotalPrice, () =>
        {
            $(this.$refs.variationTotalPrice).fadeTo(100, 0.1).fadeTo(400, 1.0);
        });
    }
});
