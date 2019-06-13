import { transformVariationProperties } from "../../services/VariationPropertyService";
import { get } from "../../helper/get";
import { isNullOrUndefined } from "../../helper/utils";

Vue.component("single-item", {

    delimiters: ["${", "}"],

    props: [
        "template",
        "attributeNameMap",
        "variationUnits"
    ],

    jsonDataFields: [
        "itemData",
        "variationListData"
    ],

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
            variations: state => state.item.variationList,
            isVariationSelected: state => state.item.isVariationSelected
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
    },

    methods:
    {
        setIsVariationSelected(event)
        {
            this.$store.commit("setIsVariationSelected", event);
        },

        getDataField(field)
        {
            return get(this.currentVariation, field);
        },

        getFilteredDataField(field, filter)
        {
            if (!isNullOrUndefined(this.$options.filters[filter]))
            {
                return this.$options.filters[filter](this.getDataField(field));
            }

            return this.getDataField(field);
        }
    }
});
