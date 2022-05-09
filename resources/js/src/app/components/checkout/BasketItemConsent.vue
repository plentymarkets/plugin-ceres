<template>
    <div>
        <p>filteredData:</p>

        <div>{{ filteredData }}</div>
    </div>
</template>

<script>
export default {
    props: {
        propertyIdToConsent: Number
    },

    computed: {
        filteredData() {
            return this.basketItems.filter(item => {
                const variationPropertyGroups = item.variation.data.variationProperties;

                for (const variationPropertyGroup of variationPropertyGroups)
                {
                    for (const variationProperty of variationPropertyGroup.properties)
                    {
                        if (variationProperty.id === this.propertyIdToConsent)
                        {
                            return true;
                        }
                    }
                }
            });
        },

        basketItems() {
            return this.$store.state.basket.items;
        }
    }    
}
</script>
