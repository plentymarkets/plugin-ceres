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

        this.initializeEvents();
    },

    methods:
    {
        initializeEvents()
        {
            this.initCurrentWatcher();
            this.initQuantityPriceWatcher();
        },

        initCurrentWatcher()
        {
            ResourceService.watch("currentVariation", (newValue, oldValue) =>
            {
                this.currentVariation = newValue;
            });
        },

        initQuantityPriceWatcher()
        {
            // TODO replace this after vuex change and single item component change

            document.addEventListener("itemGraduatedPriceChanged", event =>
            {
                let graduatedPrices = this.currentVariation.documents[0].data.calculatedPrices.graduatedPrices;

                graduatedPrices = graduatedPrices.sort((firstValue, secondValue) =>
                {
                    return firstValue.minimumOrderQuantity - secondValue.minimumOrderQuantity;
                });

                let priceToMark = 0;

                for (const price of graduatedPrices)
                {
                    if (price.minimumOrderQuantity > 1)
                    {
                        // unmark other selections
                        document.getElementById(price.minimumOrderQuantity + "_qty").style.opacity = 0;

                        // get correct price to mark
                        if (event.detail >= price.minimumOrderQuantity)
                        {
                            priceToMark = price.minimumOrderQuantity;
                        }
                    }
                }

                // mark new selection
                if (priceToMark != 0)
                {
                    document.getElementById(priceToMark + "_qty").style.opacity = 1;
                }
            });
        }
    },

    computed:
    {
        graduatedPrices()
        {
            if (this.currentVariation)
            {
                const prices = this.currentVariation.documents[0].data.calculatedPrices.graduatedPrices;

                return prices.filter(price => price.minimumOrderQuantity > 1);
            }

            return [];
        }
    }
});
