var accounting = require("accounting");

Vue.component("item-store-special", {

    delimiters: ["${", "}"],

    template: "#vue-item-store-special",

    props: [
        "storeSpecial",
        "recommendedRetailPrice",
        "variationRetailPrice",
        "decimalCount"
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
        this.tagClass = this.tagClasses[this.storeSpecial.id] || this.tagClasses.default;
        this.label = this.getLabel();
    },

    methods: {
        getLabel()
        {
            if (this.storeSpecial.id === 1 && this.recommendedRetailPrice)
            {
                const percent = this.getPercentageSale();

                if (parseInt(percent) < 0)
                {
                    return percent + "%";
                }
            }

            return this.storeSpecial.names.name;
        },

        getPercentageSale()
        {
            // eslint-disable-next-line
            let percent = (1 - this.variationRetailPrice.unitPrice.value / this.recommendedRetailPrice.price.value ) * -100;

            return accounting.formatNumber(percent, this.decimalCount, "");
        }
    }
});
