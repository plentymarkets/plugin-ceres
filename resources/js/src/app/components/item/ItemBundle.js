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

    computed:
    {
        showItemBundleItems()
		{
            return this.bundleSetting !== "1" && this.bundleType === "bundle";
        }
    },

    created()
    {
        this.$options.template = this.template;
    },

    mounted()
    {
        this.$nextTick(() =>
        {
            if (this.$refs.bundleSetting)
            {
                this.bundleSetting = this.$refs.bundleSetting.innerText;
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
