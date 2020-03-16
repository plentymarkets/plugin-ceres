<template>
    <div>
        <slot
            v-if="variation && !isLoading || $ceres.isShopBuilder"
            :itemId="itemId"
            :variationId="variationId"
            :variation="variation"
            :getDataField="getDataField"
            :getFilteredDataField="getFilteredDataField">
        </slot>

        <loading-animation v-else class="prop-3-1"></loading-animation>
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
            required: true
        }
    },

    provide()
    {
        return {
            itemId: this.itemId
        }
    },

    data()
    {
        return {
            isLoading: true
        }
    },

    created()
    {
        // this timeout represents the time while data is loading
        setTimeout(() =>
        {
            this.isLoading = false;
        }, 0 * 1000);
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
            }
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
