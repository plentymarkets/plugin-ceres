import TranslationService from "../services/TranslationService";
import Vue from "vue";

Vue.filter("itemName", ({ texts:{ name1, name2, name3 }, variation:{ name, bundleType } }, selectedName = App.config.item.itemName, itemDisplayName = App.config.item.displayName) =>
{
    let itemName = "";

    if (selectedName === 1 && name2 !== "")
    {
        itemName = name2;
    }
    else if (selectedName === 2 && name3 !== "")
    {
        itemName = name3;
    }
    else
    {
        itemName = name1;
    }

    if (itemDisplayName === "itemNameVariationName" && name && name.length)
    {
        itemName = `${itemName} ${name}`;
    }

    if (itemDisplayName === "variationName" && name && name.length)
    {
        itemName = name;
    }

    if (bundleType === "bundle")
    {
        itemName = TranslationService.translate("Ceres::Template.itemBundleName", { itemName });
    }

    return itemName;
});
