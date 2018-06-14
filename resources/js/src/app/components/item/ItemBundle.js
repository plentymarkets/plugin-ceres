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

    created()
    {
        this.$options.template = this.template;
    },

    methods:
    {
        showItemBundleItems()
		{
			// TODO check if bundle type ist set and config value from the split settings is set on NO SPLIT
            return true;
        },

        getBundleInnerText(item)
		{
            item.variation.bundleType = null;

            return item;
        }
    }
});
