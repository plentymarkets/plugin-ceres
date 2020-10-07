<template>
    <table class="table table-striped table-hover table-sm">
        <tbody>
        <template v-for="itemDataAccessor in itemInformation">
            <tr v-if="isCheckedAndNotEmpty(itemDataAccessor)">
                <td :class="paddingClasses" :style="paddingInlineStyles">
                    {{ getTranslation(itemDataAccessor) }}
                </td>

                <td :class="paddingClasses" :style="paddingInlineStyles">
                    {{ getFieldValue(itemDataAccessor) }}
                </td>
            </tr>
        </template>
        </tbody>
    </table>
</template>

<script>
import get from "lodash/get";
import { isNullOrUndefined, isDefined } from "../../helper/utils";

export default {

    name: "item-data-table",

    props: {
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

    inject: {
        itemId: {
            default: null
        }
    },

    computed:
    {
        currentVariation() {
            return this.$store.getters[`${this.itemId}/currentItemVariation`]
        }
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
                "variation.customsTariffNumber"   : "singleItemCustomsTariffNumber"
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
            if (path === "item.ageRestriction")
            {
                // remove check for the age restriction to be greater than zero (0 means 'No age restriction')
                return true;
            }
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
            return this.$translate(
                "Ceres::Template." + this.translationMap[path]
            );
        },

        getFieldValue(path)
        {
            let value;

            if (path === "item.variationDimensions")
            {
                value = get(this.currentVariation, "variation.lengthMM") + "×"
                    + get(this.currentVariation, "variation.widthMM") + "×"
                    + get(this.currentVariation, "variation.heightMM") + "mm";
            }
            else if (path === "unit.names.name")
            {
                value = get(this.currentVariation, "unit.content") + " " + get(this.currentVariation, "unit.names.name");
            }
            else
            {
                value = get(this.currentVariation, path);
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
                        const filterMethod = get(this.$options.filters, format.value);

                        return isDefined(filterMethod) ? filterMethod(value) : value;
                }
            }

            return value;
        }
    }
}
</script>
