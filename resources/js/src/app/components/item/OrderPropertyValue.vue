<template>
    <span v-if="property.type === 'file'">
        <a :href="property.value | fileUploadPath" target="_blank">
            <i class="fa fa-external-link" aria-hidden="true"></i>
            {{ property.value | fileName }}
        </a>
    </span>
    <span v-else>{{ valueLabel }}</span>
</template>

<script>
import { isDefined } from "../../helper/utils";
import { mapState } from "vuex";

export default {
    props:
    {
        property:
        {
            type: Object,
            required: true
        }
    },

    computed:
    {
        valueLabel()
        {
            if (this.property.type === "selection")
            {
                const propertyId = parseInt(this.property.propertyId);
                // TODO: pass as property
                const basketItemId = parseInt(this.property.basketItemId);
                let basketItem = this.basketItems.find(basketItem => basketItem.id === basketItemId);

                if (isDefined(basketItem))
                {
                    let properties = basketItem.variation.data.properties;
                    let property = properties.find(property => property.property.id === propertyId);

                    if (isDefined(property))
                    {
                        return property.property.selectionValues[this.property.value].name;
                    }
                }
                else
                {
                    basketItem = this.basketItems.find(basketItem => basketItem.basketItemOrderParams.find(orderParam => parseInt(orderParam.basketItemId) === basketItemId));
                    if (isDefined(basketItem))
                    {
                        let properties = basketItem.variation.data.properties;
                        let property = properties.find(property => property.property.id === propertyId);

                        if (isDefined(property))
                        {
                            return property.property.selectionValues.find(sv => parseInt(sv.id) === parseInt(this.property.value)).name;
                        }
                    }
                }

                return "";
            }
            // exclude properties of type 'none' (checkboxes)
            else if (isDefined(this.property.type) && this.property.type.length)
            {
                return this.property.value;
            }

            return null;
        },

        ...mapState({
            basketItems: state => state.basket.items
        })
    }
}
</script>
