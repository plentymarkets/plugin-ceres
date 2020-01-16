import Vue from "vue";

export default Vue.component("item-bundle", {

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
        bundleComponents: Array,
        showBundleItems: Boolean
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
