Vue.component("order-property-value", {
    props:
    {
        template:
        {
            type: String,
            default: "#vue-order-property-value"
        },
        property:
        {
            type: Object,
            required: true
        }
    },

    computed:
    {
        selectionValue()
        {
            if (this.property.type === "selection")
            {
                // const basketItem = this.$store.basket.items.find(basketItem => basketItem.id === parseInt(this.property.basketItemId));

                // basketItem.variation.data.variationProperties
                // {"basketItemId":"113","propertyId":"1","type":"selection","name":"Select (Webshop)","value":"2"}
            }

            return null;
        }
    },

    methods:
    {
        getSelectionValue()
        {

        }
    }
});

