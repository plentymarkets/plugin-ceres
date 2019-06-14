import { transformVariationProperties } from "../../services/VariationPropertyService";
import { get } from "../../helper/get";
import { isNullOrUndefined } from "../../helper/utils";

Vue.component("single-item", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-single-item"
        }
    },

    jsonDataFields: [
        "itemData",
        "attributes",
        "variations"
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
        this.$store.commit("setItemAttributes", this.attributes);
        this.$store.commit("setItemVariations", this.variations);
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
