<template>
    <div class="small" v-if="shownProperties && shownProperties.length">
        <div class="font-weight-bold my-1">{{ $translate('Ceres::Template.basketAdditionalCosts') }}:</div>
        <ul class="ml-1 pl-3" data-testing="order-property-list">
            <order-property-value-list-item v-for="property in shownProperties" :key="property.propertyId" :property="property"></order-property-value-list-item>
        </ul>
    </div>
</template>

<script>
import { isDefined } from '../../helper/utils';
import OrderPropertyValueListItem from './OrderPropertyValueListItem.vue';

export default {
    name: "order-property-value-list",

    components:
    {
        OrderPropertyValueListItem
    },

    props:
    {
        basketItem:
        {
            required: true,
            type: Object
        }
    },

    computed:
    {
        shownProperties()
        {
            const shownProperties = [];

            this.basketItem.variation.data.properties.forEach(property =>
            {
                const filledProperty = this.basketItem.basketItemOrderParams.find(prop =>
                {
                    return parseInt(prop.propertyId) === property.propertyId;
                });

                if (isDefined(filledProperty))
                {
                    if (filledProperty.type === "selection")
                    {
                        property.property.value = property.property.selectionValues[filledProperty.value].name;
                    }
                    else
                    {
                        property.property.value = filledProperty.value;
                    }
                }

                if(isDefined(filledProperty) || this.isPropertyWithAdditionalCosts(property))
                {
                    shownProperties.push(property);
                }
            });

            return shownProperties;
        }
    },

    methods:
    {
        isPropertyWithAdditionalCosts(property)
        {
            return property.property &&
                property.property.isShownAtCheckout &&
                property.property.isShownAsAdditionalCosts &&
                !property.property.isOderProperty
        }
    }
}
</script>
