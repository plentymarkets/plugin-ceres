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
import { mapState } from 'vuex'
export default {
    name: "item-set-component",

    props:
    {
        itemId:
        {
            type: Number,
            required: !App.isShopBuilder
        }
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

        ...mapState({
            variation(state)
            {
                const itemModule = state.items[this.itemId];

                return itemModule && itemModule.variation.documents[0].data;
            },
            isSetLoading: state => state.items.isSetLoading,
            previewItemId : state => state.items.previewItemId
        })
    },

    methods:
    {
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
