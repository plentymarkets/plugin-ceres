<template>
    <div v-if="matchingBasketItems.length" class="form-check" :class="{ 'error': showError }">


        <!-- <div v-for="item in matchingBasketItems" :key="item.id">
            {{ item.variation.data.texts.name1 }}
        </div> -->


        <input class="form-check-input" type="checkbox" :id="'basket-item-consent' + _uid" @change="value = $event.target.checked" data-testing="basket-item-consent-check">
        <label class="form-check-label" :for="'basket-item-consent' + _uid">
            <span>{{ $translate("Ceres::Template.checkoutBasketItemConsent", {"items": matchingItemNames }) }}</span><!--
            --><sup>*</sup>
        </label>
    </div>
</template>

<script>
import NotificationService from "../../services/NotificationService";
import TranslationService from "../../services/TranslationService";

export default {
    props: {
        propertyIdToConsent: Number
    },

    data() {
        return {
            value: false
        };
    },

    computed: {
        showError() {
            if (this.$store.state.checkout.validation[this.storeAccessor])
            {
                return this.$store.state.checkout.validation[this.storeAccessor].showError;
            }

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
            return this.matchingBasketItems.map(item =>
            {
                return item.variation.data.texts.name1;
            }).join(", ");
        },

        storeAccessor() {
            return `basketItemConsentCheck_uid_${this._uid}_propertyId_${this.propertyIdToConsent}`;
        }
    },

    created() {
        this.$store.commit("addDynamicCheckoutValidator",
        {
            name: this.storeAccessor,
            validator: this.validate
        });
    },

    methods: {
        validate() {
            const showError = !this.value;

            this.$store.commit("setDynamicCheckoutShowError", { name: this.storeAccessor, showError });

            if (showError)
            {
                NotificationService.error(
                    TranslationService.translate("Ceres::Template.checkoutCheckBasketItemConsent", { items: this.matchingItemNames })
                );
            }
        }
    }
}
</script>
