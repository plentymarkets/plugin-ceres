<template>
    <div>
        <slot
            v-if="variation && !isLoading"
            :itemId="itemId"
            :variationId="variationId"
            :variation="variation">
        </slot>

        <div v-else class="prop-3-1 loading">
            <div class="loading-animation-frame col-12 col-lg-12" style="position: absolute; top: 50%; transform: translateY(-50%);">
                <div class="loading-animation">
                    <div class="rect1 bg-appearance"></div>
                    <div class="rect2 bg-appearance"></div>
                    <div class="rect3 bg-appearance"></div>
                    <div class="rect4 bg-appearance"></div>
                    <div class="rect5 bg-appearance"></div>
                </div>
            </div>
        </div>

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
