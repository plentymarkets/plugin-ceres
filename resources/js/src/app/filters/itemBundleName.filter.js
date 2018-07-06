import TranslationService from "services/TranslationService";

Vue.filter("itemBundleName", item =>
{
    let prefixName;

	if(item.bundleType === "bundle")
	{
		prefixName = item.orderItemName.replace("[BUNDLE]", "");

		prefixName = TranslationService.translate("Ceres::Template.itemBundleName", {itemName: prefixName});
	}
	else if(item.bundleType == "bundle_item")
	{
		prefixName = item.orderItemName.replace("[-]", "");
	}
	else
	{
		prefixName = item.orderItemName;
	}
	
	return prefixName;
});
