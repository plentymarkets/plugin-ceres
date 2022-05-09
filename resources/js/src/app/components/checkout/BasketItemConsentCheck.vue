<template>
    <div v-if="matchingBasketItems.length" class="form-check" :class="{ 'error': showError }">


        <!-- <div v-for="item in matchingBasketItems" :key="item.id">
            {{ item.variation.data.texts.name1 }}
        </div> -->


        <input class="form-check-input" type="checkbox" :id="'basket-item-consent' + _uid" @change="onValueChanged($event.target.checked)" data-testing="basket-item-consent-check">
        <label class="form-check-label" :for="'basket-item-consent' + _uid">
            <span>{{ $translate("Ceres::Template.checkoutBasketItemConsent", {"items": matchingItemNames }) }}</span><!--
            --><sup>*</sup>
        </label>
    </div>
</template>

<script>
export default {
    props: {
        propertyIdToConsent: Number
    },

    computed: {
        showError() {
            return false;
        },

        basketItems()
        {
            return this.$store.state.basket.items || [];
        },

        // filter the basket items for owning the property id, matching with propertyIdToConsent
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

        matchingItemNames() {
            this.matchingBasketItems.map(item =>
            {
                return item.variation.data.texts.name1;
            }).join(", ");
        }
    },

    methods: {
        onValueChanged(value) {
            console.log("value changed", value);
        }
    }
}
</script>
