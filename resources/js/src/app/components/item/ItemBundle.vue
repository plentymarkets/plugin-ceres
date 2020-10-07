<template>
    <div>
        <div class="small font-weight-bold mb-3" v-if="showItemBundleItems">
            <strong>{{ $translate("Ceres::Template.itemBundleContent") }}</strong>
            <div v-for="item in bundleComponents" :class="paddingClasses" :style="paddingInlineStyles">
                <span class="text-muted">{{ item.quantity }} x</span>
                <a class="text-appearance" :href="item.data | itemURL"> {{ getBundleInnerText(item.data) | itemName }} </a>
            </div>
        </div>
        <div v-else><slot></slot></div>
    </div>
</template>

<script>
export default {

    name: "item-bundle",

    props: {
        paddingClasses: {
            type: String,
            default: null
        },
        paddingInlineStyles: {
            type: String,
            default: null
        },
        bundleType: String,
        bundleComponents: Array
    },
    
    computed:
    {
        showItemBundleItems()
        {
            return App.bundleSetting !== 1 && this.bundleType === "bundle";
        }
    },

    methods:
    {
        getBundleInnerText(item)
        {
            item.variation.bundleType = null;

            return item;
        }
    }
}
</script>
