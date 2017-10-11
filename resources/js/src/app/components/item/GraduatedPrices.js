const ResourceService = require("services/ResourceService");

Vue.component("graduated-prices", {
    props: [
        "template"
    ],

    data()
    {
        return {
            currentVariation: null,
            actualItemCount: 0
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

        // TODO replace this after vuex change and single item component change

        const _this = this;

        document.addEventListener("itemGraduatedPriceChanged", event =>
        {
            _this.actualItemCount = event.detail;
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
