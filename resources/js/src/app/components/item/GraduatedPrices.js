Vue.component("graduated-prices", {
    props: [
        "template"
    ],

    data()
    {
        return {
            test: 0
        };
    },

    computed:
    {
        graduatedPrices()
        {
            const prices = this.$store.state.item.variation.documents[0].data.calculatedPrices.graduatedPrices;

            return [...prices].sort((priceA, priceB) =>
            {
                if (priceA.minimumOrderQuantity > priceB.minimumOrderQuantity)
                {
                    return 1;
                }
                if (priceA.minimumOrderQuantity < priceB.minimumOrderQuantity)
                {
                    return -1;
                }

                return 0;
            });
        }
    },

    created()
    {
        this.$options.template = this.template;
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.initializeEvents();
        });
    },

    methods:
    {
        initializeEvents()
        {
            this.initQuantityPriceWatcher();
        },

        initQuantityPriceWatcher()
        {
            // TODO replace this after vuex change and single item component change

            document.addEventListener("itemGraduatedPriceChanged", event =>
            {
                for (const price of this.graduatedPrices)
                {
                    // unmark other selections
                    document.getElementById(price.minimumOrderQuantity + "_qty").style.opacity = 0;

                    // get correct price to mark
                    if (event.detail >= price.minimumOrderQuantity)
                    {
                        priceToMark = price.minimumOrderQuantity;
                    }
                }

                // mark new selection
                if (priceToMark != 0)
                {
                    document.getElementById(priceToMark + "_qty").style.opacity = 1;
                }
            });
        }
    }
});
