Vue.component("item-bundle", {

    props:
    {
        template:
        {
            type: String,
            default: "#vue-item-bundle"
        },
        bundleType: String,
        bundleComponents: Array
    },

    data()
    {
        return {
            bundleSetting: null
        };
    },

    created()
    {
        this.$options.template = this.template;
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            this.bundleSetting = this.$refs.bundleSetting.innerText;
        });
    },

    methods:
    {
        showItemBundleItems()
		{
            return this.bundleSetting === "2" && this.bundleType === "bundle";
        },

        getBundleInnerText(item)
		{
            item.variation.bundleType = null;

            return item;
        }
    }
});
