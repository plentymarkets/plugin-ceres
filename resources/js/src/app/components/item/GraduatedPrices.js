const ResourceService = require("services/ResourceService");

Vue.component("graduated-prices", {
    props: [
        "template"
    ],

    data()
    {
        return {
            currentVariation: null
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    ready()
    {
        this.currentVariation = ResourceService.getResource("currentVariation").val();

        ResourceService.watch("currentVariation", (newValue, oldValue) =>
        {
            this.currentVariation = newValue;
        });
    },

    computed:
    {
        graduatedPrices()
        {
            if (this.currentVariation)
            {
                return this.currentVariation.documents[0].data.calculatedPrices.graduatedPrices;
            }

            return [];
        }
    }
});
