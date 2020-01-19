import TranslationService from "../services/TranslationService";
import Vue from "vue";

Vue.filter("itemBundleName", item =>
{
    let prefixName;

    if (item.bundleType === "bundle")
    {
        prefixName = item.orderItemName.replace("[BUNDLE]", "").trim();

        prefixName = TranslationService.translate("Ceres::Template.itemBundleName", { itemName: prefixName });
    }
    else if (item.bundleType == "bundle_item")
    {
        prefixName = item.orderItemName.replace("[-]", "").trim();
    }
    else
    {
        prefixName = item.orderItemName;
    }

    return prefixName;
});
