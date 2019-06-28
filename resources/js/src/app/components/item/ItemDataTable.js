import { get } from "lodash";
import { isNullOrUndefined } from "../../helper/utils";
import TranslationService from "services/TranslationService";

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
        ...Vuex.mapState({
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

            filterMap: {
                "item.ageRestriction": "ageRestriction"
            }
        };
    },

    methods:
    {
        isCheckedAndNotEmpty(path)
        {
            if (path !== "item.variationDimensions")
            {
                return get(this.currentVariation, path) !== "";
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

            return this.filterFieldData(value, path);
        },

        filterFieldData(value, path)
        {
            if (this.filterMap.hasOwnProperty(path))
            {
                const filterMethod = get(this.$options.filters, this.filterMap[path]);

                if (filterMethod)
                {
                    return filterMethod(value);
                }
            }

            return value;
        }
    }
});
