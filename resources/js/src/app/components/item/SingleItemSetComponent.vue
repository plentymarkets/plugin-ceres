<template>
    <div>

        <slot
            v-if="!isSetLoading && variation || $ceres.isShopBuilder"
            :itemId="itemId"
            :variationId="variationId"
            :variation="variation"
            :getDataField="getDataField"
            :getFilteredDataField="getFilteredDataField">
        </slot>

        <loading-animation v-else-if="isSetLoading" class="prop-3-1"></loading-animation>
    </div>
</template>

<script>
import { get } from "../../helper/get";
import { isNullOrUndefined } from "../../helper/utils";
export default {
    name: "single-item-set-component",

    props:
    {
        itemId:
        {
            type: Number,
            required: !App.isShopBuilder
        },
        initialVariationId: Number,
        attributes: Array,
        variations: Array,
        afterKey: Object
    },

    provide()
    {
        return {
            itemId: App.isShopBuilder ? this.previewItemId : this.itemId
        }
    },

    computed:
    {
        variationId()
        {
            return this.variation && this.variation.variation.id;
        },

        variation()
        {
            const itemModule = this.$store.state.items[this.itemId];

            if (itemModule)
            {
                this.ready();
            }

            return itemModule && itemModule.variation.documents[0].data;
        },

        isSetLoading()
        {
            return this.$store.state.items.isSetLoading;
        },

        previewItemId()
        {
            return this.$store.state.items.previewItemId;
        }
    },

    methods:
    {
        ready()
        {
            this.$store.dispatch(`${this.itemId}/variationSelect/setVariationSelect`, {
                itemId:             this.itemId,
                attributes:         this.attributes,
                variations:         this.variations,
                initialVariationId: this.initialVariationId,
                isPleaseSelectOption: true,
                afterKey:           this.afterKey
            });

            // function should only be executed once
            this.ready = () => {};
        },

        getDataField(field)
        {
            return get(this.variation, field);
        },

        getFilteredDataField(field, filter)
        {
            if (!isNullOrUndefined(this.$options.filters[filter]))
            {
                return this.$options.filters[filter](this.getDataField(field));
            }

            return this.getDataField(field);
        }
    }
}
</script>
