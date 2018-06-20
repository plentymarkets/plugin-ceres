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
            if (this.bundleSetting === "2" && this.bundleType)
            {
                return true;
            }

            return false;
        },

        getBundleInnerText(item)
		{
            item.variation.bundleType = null;

            return item;
        }
    }
});
