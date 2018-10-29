import {isNullOrUndefined}from "../../helper/utils";

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
                1: "bg-danger",
                2: "bg-primary",
                default: "bg-success"
            }
        };
    },

    created()
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

    methods: {
        getLabel()
        {
            if (isNullOrUndefined(this.storeSpecial))
            {
                if (isNullOrUndefined(this.recommendedRetailPrice))
                {
                    return "";
                }

                return this.getPercentageSale();

            }

            if (this.storeSpecial.id === 1 && !isNullOrUndefined(this.recommendedRetailPrice))
            {
                return this.getPercentageSale();
            }

            return this.storeSpecial.names.name;
        },

        getPercentageSale()
        {
            // eslint-disable-next-line
            let percent = (1 - this.variationRetailPrice.unitPrice.value / this.recommendedRetailPrice.price.value ) * -100;

            if (percent < 0)
            {
                return percent.toFixed(this.decimalCount).replace(".", App.decimalSeparator) + "%";
            }

            return "";
        }
    }
});
