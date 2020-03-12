<template>
    <div>
        <slot
            v-if="variation && !isLoading"
            :itemId="itemId"
            :variationId="variationId"
            :variation="variation">
        </slot>

        <loading-animation v-else class="prop-3-1"></loading-animation>
    </div>
</template>

<script>
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
        }, 5 * 1000);
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
    }
}
</script>
