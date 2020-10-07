<template>
    <item-bundle
        :bundle-type="bundleType"
        :bundle-components="bundleComponents"
        :padding-classes="paddingClasses"
        :padding-inline-styles="paddingInlineStyles">
        <div class="widget-placeholder p-0" v-if="isPreview">
            <div>
                <p class="title mb-0">{{ $translate("Ceres::Widget.itemBundlePlaceholderTitle") }}</p>
                <p class="description mt-3">{{ $translate("Ceres::Widget.itemBundlePlaceholderDescription") }}</p>
            </div>
        </div>
    </item-bundle>
</template>

<script>
import ItemBundle from "./ItemBundle.vue";

export default {

    name: "single-item-bundle",

    components: {
        ItemBundle
    },

    props:{
        isPreview: Boolean,
        paddingClasses: {
            type: String,
            default: null
        },
        paddingInlineStyles: {
            type: String,
            default: null
        },
    },

    inject: {
        itemId: {
            default: null
        }
    },

    computed: {
        bundleType() {
            return this.isPreview ? 'bundle' : this.$store.getters[`${this.itemId}/currentItemVariation`].variation.bundleType
        },

        bundleComponents () {
            return this.$store.getters[`${this.itemId}/currentItemVariation`].bundleComponents;
        }
    }
}
</script>
