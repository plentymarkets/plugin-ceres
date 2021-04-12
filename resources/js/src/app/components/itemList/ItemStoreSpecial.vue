<template>
    <div v-if="hasLabel || isBundle || isSet" class="special-tags p-2">
        
        <span v-if="hasLabel" class="badge" :class="tagClass">
            {{ label }}
        </span>

        <span v-else-if="isBundle" :class="tagClasses.itemBundle">
            {{ $translate("Ceres::Template.itemBundle") }}
        </span>

        <span v-else-if="isSet" :class="tagClasses.itemSet">
            {{ $translate("Ceres::Template.itemSet") }}
        </span>

    </div>
</template>

<script>
import { isNullOrUndefined, isDefined } from "../../helper/utils";

export default {

    name: "item-store-special",

    props: [
        "storeSpecial",
        "recommendedRetailPrice",
        "variationRetailPrice",
        "specialOfferPrice",
        "decimalCount",
        "bundleType",
        "itemType"
    ],

    data()
    {
        return {
            tagClass: "",
            label: "",
            tagClasses:
            {
                1: "badge-offer badge-danger",
                2: "badge-new badge-primary",
                3: "badge-top badge-success",
                default: "badge-success",
                itemBundle: "badge badge-bundle bg-info",
                itemSet: "badge badge-dark"
            },
            labels:
            {
                1: this.$translate("Ceres::Template.storeSpecialOffer"),
                2: this.$translate("Ceres::Template.storeSpecialNew"),
                3: this.$translate("Ceres::Template.storeSpecialTop")
            }
        };
    },

    computed:
    {
        hasLabel() {
            return this.label && this.label !== "";
        },

        isBundle() {
            return this.bundleType === "bundle";
        },

        isSet() {
            return this.itemType === "set";
        }
    },

    created()
    {
        this.initializeStoreSpecial();
    },

    methods:
    {
        initializeStoreSpecial()
        {
            if (!isNullOrUndefined(this.storeSpecial))
            {
                this.tagClass = this.tagClasses[this.storeSpecial.id] || this.tagClasses.default;
            }
            else
            {
                this.tagClass = this.tagClasses.default;
            }

            this.label = this.getLabel();
        },

        getLabel()
        {
            if (!isNullOrUndefined(this.storeSpecial) && this.storeSpecial.id === 1 && !isNullOrUndefined(this.recommendedRetailPrice))
            {
                return this.getPercentageSale();
            }

            if (isNullOrUndefined(this.storeSpecial))
            {
                return "";
            }

            return this.labels[this.storeSpecial.id] || this.storeSpecial.names.name;
        },

        getPercentageSale()
        {
            let percent;

            if (isDefined(this.specialOfferPrice))
            {
                percent = (1 - this.specialOfferPrice.unitPrice.value / this.variationRetailPrice.unitPrice.value ) * -100;
            }
            else
            {
                percent = (1 - this.variationRetailPrice.unitPrice.value / this.recommendedRetailPrice.unitPrice.value ) * -100;
            }

            if (percent < 0)
            {
                return percent.toFixed(this.decimalCount).replace(".", App.decimalSeparator) + "%";
            }

            return "";
        }
    },

    watch:
    {
        storeSpecial()
        {
            this.initializeStoreSpecial();
        }
    }
}
</script>
