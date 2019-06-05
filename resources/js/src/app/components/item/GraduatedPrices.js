Vue.component("graduated-prices", {
    props:
    {
        template:
        {
            type: String,
            default: "#vue-graduated-prices"
        },
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        }
    },
    computed:
    {
        graduatedPrices()
        {
            let prices = this.$store.state.item.variation.documents[0].data.prices.graduatedPrices;
            const minQuantity = this.$store.state.item.variation.documents[0].data.variation.minimumOrderQuantity;

            prices = prices.filter(price => price.minimumOrderQuantity > minQuantity);

            return [...prices].sort((priceA, priceB) =>
            {
                return priceA.minimumOrderQuantity - priceB.minimumOrderQuantity;
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
    }
});
