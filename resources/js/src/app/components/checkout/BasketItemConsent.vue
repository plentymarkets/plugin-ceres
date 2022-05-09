<template>
    <div>
        <p>filteredData:</p>

        <div v-for="item in matchingBasketItems" :key="item.id">
            {{ item.variation.data.texts.name1 }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        propertyIdToConsent: Number
    },

    computed: {
        matchingBasketItems() {
            return this.basketItems.filter(item =>
            {
                const variationPropertyGroups = item.variation.data.variationProperties || [];

                for (const group of variationPropertyGroups)
                {
                    for (const property of group.properties)
                    {
                        if (property.id === this.propertyIdToConsent)
                        {
                            return true;
                        }
                    }
                }
            });
        },

        basketItems()
        {
            return this.$store.state.basket.items || [];
        }
    }    
}
</script>
