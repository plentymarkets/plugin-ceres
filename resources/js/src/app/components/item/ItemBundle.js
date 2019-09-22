import Vue from "vue";

Vue.component("item-bundle", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-item-bundle"
        },
        paddingClasses:
        {
            type: String,
            default: null
        },
        paddingInlineStyles:
        {
            type: String,
            default: null
        },
        bundleType: String,
        bundleComponents: Array
    },

    data()
    {
        return {
            bundleSetting: null,
            showItemBundleItems: true
        };
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            if (this.$refs.bundleSetting)
            {
                this.bundleSetting = this.$refs.bundleSetting.innerText;
                this.showItemBundleItems = (this.bundleSetting !== "1" && this.bundleType === "bundle");
            }
        });
    },

    methods:
    {
        getBundleInnerText(item)
        {
            item.variation.bundleType = null;

            return item;
        }
    }
});
