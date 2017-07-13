var ResourceService = require("services/ResourceService");
var accounting = require("accounting");

Vue.component("item-store-special", {

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
            localization  : {},
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
        ResourceService.bind("localization", this);

        this.tagClass = this.tagClasses[this.storeSpecial.id] || this.tagClasses.default;
        this.label = this.getLabel();
    },

    methods: {
        getLabel()
        {
            if (this.storeSpecial.id === 1)
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
            const percent = (1 - this.variationRetailPrice / this.recommendedRetailPrice) * -100;

            return accounting.formatNumber(percent, this.decimalCount, "");
        }
    }
});
