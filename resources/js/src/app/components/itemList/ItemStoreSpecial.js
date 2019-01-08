import {isNullOrUndefined}from "../../helper/utils";
import TranslationService from "../../services/TranslationService";

Vue.component("item-store-special", {

    delimiters: ["${", "}"],

    template: "#vue-item-store-special",

    props: [
        "storeSpecial",
        "recommendedRetailPrice",
        "variationRetailPrice",
        "decimalCount",
        "bundleType"
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
                default: "badge-success"
            },
            labels:
            {
                1: TranslationService.translate("Ceres::Template.storeSpecialOffer"),
                2: TranslationService.translate("Ceres::Template.storeSpecialNew"),
                3: TranslationService.translate("Ceres::Template.storeSpecialTop")
            }
        };
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
            if (
                (isNullOrUndefined(this.storeSpecial) || this.storeSpecial.id === 1) &&
                !isNullOrUndefined(this.recommendedRetailPrice)
            )
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
            // eslint-disable-next-line
            let percent = (1 - this.variationRetailPrice.unitPrice.value / this.recommendedRetailPrice.unitPrice.value ) * -100;

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
});
