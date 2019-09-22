import get from "lodash/get";
import { isNullOrUndefined, isDefined } from "../../helper/utils";
import TranslationService from "../../services/TranslationService";
import Vue from "vue";
import { mapState } from "vuex";

Vue.component("item-data-table", {
    props:
    {
        template:
        {
            type: String,
            default: "#vue-item-data-table"
        },
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        },
        itemInformation:
        {
            type: Array,
            default: () => []
        }
    },

    computed:
    {
        ...mapState({
            currentVariation: state => state.item.variation.documents[0].data
        })
    },

    data()
    {
        return {
            translationMap: {
                "item.id"                         : "singleItemId",
                "item.condition.names.name"       : "singleItemCondition",
                "item.ageRestriction"             : "singleItemAge",
                "variation.externalId"            : "singleItemExternalVariationId",
                "variation.model"                 : "singleItemModel",
                "item.manufacturer.externalName"  : "singleItemManufacturer",
                "item.producingCountry.names.name": "singleItemManufacturingCountry",
                "unit.names.name"                 : "singleItemContent",
                "variation.weightG"               : "singleItemWeight",
                "variation.weightNetG"            : "singleItemNetWeight",
                "item.variationDimensions"        : "singleItemDimensions",
                "item.customsTariffNumber"        : "singleItemCustomsTariffNumber"
            },
            formatMap: {
                "item.ageRestriction": {
                    type: "filter",
                    value: "ageRestriction"
                },
                "variation.weightG": {
                    type: "text",
                    value: " g"
                },
                "variation.weightNetG": {
                    type: "text",
                    value: " g"
                }
            }
        };
    },

    methods:
    {
        isCheckedAndNotEmpty(path)
        {
            if (path !== "item.variationDimensions")
            {
                const value = get(this.currentVariation, path);

                return value !== "" && value !== 0;
            }
            else
            {
                return ["variation.lengthMM", "variation.widthMM", "variation.heightMM"]
                    .some(element =>
                    {
                        const value = this.getFieldValue(element);

                        return !isNullOrUndefined(value) && value !== 0;
                    });
            }
        },

        getTranslation(path)
        {
            return TranslationService.translate(
                `Ceres::Template.${this.translationMap[path]}`
            );
        },

        getFieldValue(path)
        {
            let value;

            if (path !== "item.variationDimensions")
            {
                value = get(this.currentVariation, path);
            }
            else
            {
                value = `${ get(this.currentVariation, "variation.lengthMM") }×${ get(this.currentVariation, "variation.widthMM") }×${ get(this.currentVariation, "variation.heightMM") } mm`;
            }

            return this.formatFieldData(value, path);
        },

        formatFieldData(value, path)
        {
            const format = this.formatMap[path];

            if (isDefined(format))
            {
                switch (format.type)
                {
                case "text":
                    return value + format.value;
                case "filter":
                    var filterMethod = get(this.$options.filters, format.value);

                    return isDefined(filterMethod) ? filterMethod(value) : value;
                }
            }

            return value;
        }
    }
});
