Vue.component("graduated-prices", {
    props: [
        "template"
    ],

    computed:
    {
        graduatedPrices()
        {
            let prices = this.$store.state.item.variation.documents[0].data.calculatedPrices.graduatedPrices;
            const minQuantity = this.$store.state.item.variation.documents[0].data.variation.minimumOrderQuantity;

            prices = prices.filter(price => price.minimumOrderQuantity > minQuantity);

            return [...prices].sort((priceA, priceB) =>
            {
                return priceA.minimumOrderQuantity - priceB.minimumOrderQuantity;
                /*
                if (priceA.minimumOrderQuantity > priceB.minimumOrderQuantity)
                {
                    return 1;
                }
                if (priceA.minimumOrderQuantity < priceB.minimumOrderQuantity)
                {
                    return -1;
                }

                return 0;
                */
            });
        },

        activeGraduationIndex()
        {
            const prices = this.graduatedPrices.filter(price => this.variationOrderQuantity >= price.minimumOrderQuantity);

            if (!prices.length)
            {
                return -1;
            }

            const price = prices.reduce((prev, current) => (prev.minimumOrderQuantity > current.minimumOrderQuantity) ? prev : current);

            return this.graduatedPrices.indexOf(price);
        },

        ...Vuex.mapState({
            variationOrderQuantity: state => state.item.variationOrderQuantity
        })
    },

    created()
    {
        this.$options.template = this.template;
    }
});
