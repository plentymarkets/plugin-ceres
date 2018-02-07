Vue.filter("itemName", ({texts:{name1, name2, name3}, variation:{name}}, selectedName = App.config.itemName, itemDisplayName = App.config.itemDisplayName) =>
{
    if (itemDisplayName === "variationName" && name && name.length)
    {
        return name;
    }

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

    return itemName;
});
