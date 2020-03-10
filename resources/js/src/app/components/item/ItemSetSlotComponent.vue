<template>
    <div>
        <slot
            v-if="variation"
            :itemId="itemId"
            :variationId="variationId"
            :variation="variation">
        </slot>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "item-set-slot-component",
    props:
    {
        itemId:
        {
            type: Number,
            required: true
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
            }
        })
    }
}
</script>
