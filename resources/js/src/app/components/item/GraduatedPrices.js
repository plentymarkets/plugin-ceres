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
    },

    computed:
    {
        graduatedPrices()
        {
            if (!this.currentVariation)
            {
                return [];
            }

            const prices = this.currentVariation.documents[0].data.salesPrices.filter(price =>
            {
                return price.type === "default" && parseInt(price.minimumOrderQuantity) > 1;
            });

            const priceList = [];

            for (const price of prices)
            {
                priceList.push(
                    {
                        position: parseInt(price.position),
                        price: parseFloat(price.price),
                        minimumOrderQuantity: parseInt(price.minimumOrderQuantity)
                    });
            }

            return priceList;
        }
    }
});
