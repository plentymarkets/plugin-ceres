import TranslationService from "services/TranslationService";

Vue.filter("itemName", ({texts:{name1, name2, name3}, variation:{name}, bundleComponents}, selectedName = App.config.item.itemName, itemDisplayName = App.config.item.displayName) =>
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

    if(bundleComponents)
    {
        itemName = TranslationService.translate("Ceres::Template.singleItemBundleName", {itemName});
    }

    return itemName;
});
