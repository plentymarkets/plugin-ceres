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
            bundleSetting: null,
            showItemBundleItems: false
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

            this.showItemBundleItems = (this.bundleSetting !== "1" && this.bundleType === "bundle");
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
