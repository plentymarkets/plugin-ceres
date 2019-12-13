import { transformVariationProperties } from "../../services/VariationPropertyService";
import { get } from "../../helper/get";
import { isNullOrUndefined } from "../../helper/utils";
import Vue from "vue";
import { mapState, mapGetters } from "vuex";

Vue.component("single-item", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-single-item"
        },
        pleaseSelectOptionVariationId:
        {
            type: Number,
            default: 0
        },
        initPleaseSelectOption:
        {
            type: Boolean,
            default: false
        }
    },

    jsonDataFields: [
        "itemData",
        "attributesData",
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
            return transformVariationProperties(this.currentVariation, [], "showInItemListing");
        },

        addPleaseSelectOption()
        {
            return App.config.item.showPleaseSelect;
        },

        ...mapState({
            currentVariation: state => state.item.variation.documents[0].data,
            isVariationSelected: state => state.variationSelect.isVariationSelected,
            attributes: state => state.variationSelect.attributes,
            units: state => state.variationSelect.units
        }),

        ...mapGetters([
            "variationTotalPrice",
            "variationMissingProperties",
            "variationGroupedProperties",
            "variationGraduatedPrice"
        ])
    },

    created()
    {
        this.$store.commit("setVariation", this.itemData);
        this.$store.commit("setPleaseSelectVariationId", this.pleaseSelectOptionVariationId);
        this.$store.dispatch("addLastSeenItem", this.currentVariation.variation.id);

        this.$store.dispatch("setVariationSelect", {
            attributes:         this.attributesData,
            variations:         this.variations,
            initialVariationId: this.currentVariation.variation.id,
            isPleaseSelectOption: this.initPleaseSelectOption
        });
    },

    methods:
    {
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
